const DB_CONNECTION = require('./config.db.connect');

function createTable(){
    DB_CONNECTION.query('CREATE TABLE IF NOT EXISTS users (id int primary key AUTO_INCREMENT, name VARCHAR(255), dob DATE, email VARCHAR(255) unique, password VARCHAR(255), refreshtoken VARCHAR(255))', function(err, result){
        if(err) throw err;
        console.log('Table created.');
    });
    
}

module.exports = {createTable};