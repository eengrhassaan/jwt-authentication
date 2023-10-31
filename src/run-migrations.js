
const Sequelize = require("sequelize");

const path = require('path');
const fs = require('fs');


try {
    var sql_data = JSON.parse(fs.readFileSync('./migrations/_current.json'));
    delete sql_data['ALTER TABLE']['tmp_model']
    delete sql_data['CREATE TABLE']['tmp_model']

    raw_sql = ' '


    // ALTER TABLE RAW SQL
    if(Object.keys(sql_data['ALTER TABLE']).length){
        for (var key in sql_data['ALTER TABLE']){
            raw_sql = raw_sql + 'ALTER TABLE `' + key + '` '
            temp_fields = sql_data['ALTER TABLE'][key]

            temp_fields.forEach(element => {
                if (element['primaryKey']){
                    field_name = 'PRIMARY KEY (' + element['name'] + ')'
                } else {
                    field_name = element['name']
                }

                not_null = ''
                if (element['allowNull']){
                    not_null = ' NOT NULL'
                }
                raw_sql = raw_sql + element['operation'] + ' COLUMN `' + field_name + '` ' + (element['dType']?element['dType']:'') + not_null
            });
            raw_sql = raw_sql + ";"
        }
        
    }

    // Create Tables RAW SQL
    if(Object.keys(sql_data['CREATE TABLE']).length){
        for (var key in sql_data['CREATE TABLE']){
            raw_sql = raw_sql + 'CREATE TABLE `' + key + '` ('
            temp_fields = sql_data['CREATE TABLE'][key]

            temp_fields.forEach(element => {
                if (element['primaryKey']){
                    field_name = '`PRIMARY KEY (' + element['name'] + ')` int(11) unsigned'
                } else {
                    field_name = '`' + element['name'] + '` ' +element['dType']
                }
                raw_sql = raw_sql + ' ' + field_name + ','
            })
            raw_sql = raw_sql.replace(/,*$/, '') + ");"
        }
    }

    if(Object.keys(sql_data['DROP TABLE']).length){
        drop_tables = sql_data['DROP TABLE']
        drop_tables.forEach(element => {
            raw_sql = raw_sql + ' DROP TABLE IF EXISTS `' + element + "`;"    
        })
    }

    console.log(raw_sql)

    fs.writeFile('./migrations/migration_sql.sql', raw_sql, function(err, result) {
        if(err) console.log('error', err);
    })
} catch(error) {
    console.log(error)
}


