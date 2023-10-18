const config = require('dotenv').config().parsed

module.exports = {
    // development : {
    //     HOST: config.DB_HOST,
    //     USER: config.DB_USER,
    //     PASSWORD: config.DB_PWD,
    //     DB: config.DB_NAME,
    //     dialect: "mysql",
    //     PORT: config.DB_PORT,
    //     pool: {
    //         max: 5,
    //         min: 0,
    //         acquire: 30000,
    //         idle: 10000
    //     }
    // }
    development : {
        HOST: 'localhost',
        USER: 'root',
        PASSWORD: '',
        DB: 'auth-prototype',
        dialect: "mysql",
        PORT: '3306',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
};