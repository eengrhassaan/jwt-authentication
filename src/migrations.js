// const {checkModels, downloadModels, uploadModels} = require("sequelizr");
// const config = require("./config/db.config");
// // console.log(config.test)

// checkModels(config.test);


const Sequelize = require("sequelize");
const models = require("./models")
const user = require("./models/users.model.js")

const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, 'models');

// models.forEach(element => {
//     console.log(element)
// });

models_list = []
models_name = []

// passing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        if (!file.includes('index.js')){
            // console.log(file);
            models_list.push(require("./models"))
            models_name.push(file.split(".")[0])
            
            models_list.push(eval('require("./models")'+"."+file.split(".")[0]))
            temp = eval('require("./models")'+"."+file.split(".")[0])
            console.log(file.split(".")[0])
            console.log(temp.getAttributes())
            console.log(temp.getTableName())
        }
    });

    // models_list.forEach(function(model){

    // })
});


// console.log(models)

// const sequelize = new Sequelize(
// 	'auth-prototype', 
// 	'root',
//     '', 
// 	{
// 	    host: 'localhost',
// 	    dialect: 'mysql',
// 	    operationsAliases: false,
// 	    pool: {
// 	        max: 5,
//             min: 0,
//             acquire: 30000,
//             idle: 10000
// 	    }
//     });

// var tables;

// sequelize
//     .query('SHOW Tables', {
//       type: sequelize.QueryTypes.SHOWTABLES
//     })
//     .then(result => {
//       console.log(result)
//       tables = result

//         // result.forEach(element => {
//         //     sequelize
//         //         .query('SHOW columns FROM ' + element)
//         //         .then (cols => {
//         //             console.log(cols)

//         //     })
//         // });
//     })

