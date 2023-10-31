// Author: AishCo
// Dated: 24th Oct, 2023

const Sequelize = require("sequelize");

const path = require('path');
const fs = require('fs');

//joining path of directory 
const directoryPath = path.join(__dirname, 'models');

models_list = {}
models_name = []

datatypes_enums = {
    'STRING': 'varchar',
    'INTEGER': 'int' 
}

// passing directoryPath and callback function
model_filenames = fs.readdirSync(directoryPath);

model_filenames.forEach(function (file) {
    // Do whatever you want to do with the file
    if (!file.includes('index.js')){
        
        // Get Model Name from files
        model_name = file.split(".")[0]

        // Push it to models list array
        models_name.push(model_name)
        
        // Load model and getAttributes and store it in models_list
        model_temp = eval('require("./models")'+"."+file.split(".")[0])

        models_list[model_name] = model_temp.getAttributes()
    }
});

migration_JSON = {
    'ALTER TABLE': '',
    'CREATE TABLE': '',
    'DROP TABLE': ''
}
temp_table_fields = []

dropped_tables_list = []

function createJSONMigrationFile(){
    dropped_tables_list = tables_name.filter(table_name => !models_name.includes(table_name));
    
    models_name.forEach(model => {
        if (tables_name.includes(model)){
            // console.log("ALTER TABLE: " +model)
            temp_table_fields = tables_list[model][0]
            var table_fields_list = temp_table_fields.map(function (el) { return el.Field; });
            
            // console.log(table_fields_list)
            for (var key in models_list[model]){
                if (key === 'createdAt' || key === 'updatedAt' )
                    continue
                
                model_dType = models_list[model][key]['type'].toString().toLowerCase()
                model_allowNull = models_list[model][key]['allowNull']
                model_primaryKey = models_list[model][key]['primaryKey']?models_list[model][key]['primaryKey']:0

                if (table_fields_list.includes(key)) {
                    // console.log(models_list[model][key])
                    col_details = temp_table_fields.find(field=>field.Field===key)
                    // console.log(col_details)
                    
                    isNullAllowed = col_details.Null
                    dType = col_details.Type
                    isKey = col_details.Key
                    defaultValue = col_details.Default                    

                    // console.log(models_list[model][key]['type'])
                    if (model_dType.includes('integer')){
                        model_dType = model_dType.replace('eger','')
                    }
                    
                    update_col = false
                    
                    field_details = {}
                    // Match Each Column details
                    if (model_dType != dType) {
                        field_details['dType'] = model_dType
                        update_col = true
                    }
                    if (model_allowNull != isNullAllowed) {
                        field_details['allowNull'] = model_allowNull
                        update_col = true
                    }
                    if (model_primaryKey != isKey) {
                        field_details['primaryKey'] = model_primaryKey
                        update_col = true
                    }

                    if (update_col) {
                        intermediate_model = {}
                        migration_JSON['ALTER TABLE'] = {
                            "tmp_model": []
                        }
                        intermediate_model[model] = []
                        field_details['name'] = key
                        field_details['operation'] = 'MODIFY'
                        intermediate_model[model].push(field_details)
                        migration_JSON['ALTER TABLE'][model] = intermediate_model[model]
                        // console.log(migration_JSON)
                    }
                } else {
                    // console.log(models_list[model][key])
                    // console.log("ADD COLUMN " + key)
                    field_details = {}
                    field_details['name'] = key
                    field_details['dType'] = model_dType
                    field_details['primaryKey'] = model_primaryKey
                    field_details['operation'] = 'ADD'

                    migration_JSON['ALTER TABLE'] = {
                        "tmp_model": []
                    }
                    intermediate_model[model] = []
                    intermediate_model[model].push(field_details)
                    migration_JSON['ALTER TABLE'][model] = intermediate_model[model]
                }
            }
        } else {
            intermediate_model[model] = []
            for (var key in models_list[model]){
                console.log("CREATE TABLE: " +model)
                migration_JSON['CREATE TABLE'] = {
                    "tmp_model": []
                }

                model_dType = models_list[model][key]['type'].toString().toLowerCase()
                model_allowNull = models_list[model][key]['allowNull']
                model_primaryKey = models_list[model][key]['primaryKey']?models_list[model][key]['primaryKey']:0

                field_details = {}
                field_details['name'] = key
                field_details['dType'] = model_dType
                field_details['primaryKey'] = model_primaryKey

                migration_JSON['ALTER TABLE'] = {
                    "tmp_model": []
                }
                intermediate_model[model].push(field_details)
            }
            
            migration_JSON['CREATE TABLE'][model] = intermediate_model[model]

        }
    })

    migration_JSON['DROP TABLE'] = dropped_tables_list
    migration_JSON = JSON.stringify(migration_JSON,  undefined, 4);
    fs.writeFile("./migrations/migration-" + Date.now() + ".json", migration_JSON, function(err, result) {
        if(err) console.log('error', err);
    });
} 

tables_list = {}
tables_name = []

const sequelize = new Sequelize(
	'auth-prototype', 
	'root',
    '', 
	{
	    host: 'localhost',
	    dialect: 'mysql',
	    operationsAliases: false,
	    pool: {
	        max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
	    }
    });

var tables;


async function getTablesFromDB(){
    await sequelize
    .query('SHOW Tables', {
      type: sequelize.QueryTypes.SHOWTABLES
    })
    .then(result => {
        result.forEach(element => {
            tables_name.push(element)
        });
        // console.log(tables_name)
    })

    tables_name.forEach(table=>{

        processed_table = 1
        sequelize
        .query('SHOW FULL columns FROM ' + table)
        .then (cols => {
            tables_list[table] = cols
            processed_table += 1
            
            if (processed_table > tables_name.length){
                console.log("PROCESSING DONE")
                createJSONMigrationFile()
            }
        })
    })
}
      
getTablesFromDB()
