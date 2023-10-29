'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 * createTable "books", deps: []
 * createTable "tokens_blacklist", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2023-10-18T18:10:30.413Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "users",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "books",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "tokens_blacklist",
            {

            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
