const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
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
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/users.model.js") (sequelize, Sequelize);
db.books = require("../models/books.model.js") (sequelize, Sequelize);
db.tokens_blacklist = require("../models/tokensblacklist.model.js") (sequelize, Sequelize);

module.exports = db;