var Database = require('nedb');
var database = new Database({filename: "database.db", autoload: true} );

module.exports = database;