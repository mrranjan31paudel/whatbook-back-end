const DB_CONNECTION = require('./config.db.connect');

function createTable() {
    let count = 0;
    DB_CONNECTION.query('CREATE TABLE IF NOT EXISTS users (id int primary key AUTO_INCREMENT, name VARCHAR(255), dob DATE, email VARCHAR(255) unique, password VARCHAR(255), refreshtoken VARCHAR(255))', function (err, result) {
        if (err) throw err; //use alternative for this throw
    });

    DB_CONNECTION.query('CREATE TABLE IF NOT EXISTS user_refresh_tokens (id INT AUTO_INCREMENT, userid INT, refreshtoken VARCHAR(255), PRIMARY KEY (id), FOREIGN KEY (userid) REFERENCES users(id))', function (err, result) {
        if (err) throw err;
    });

    DB_CONNECTION.query('CREATE TABLE IF NOT EXISTS user_posts (id INT AUTO_INCREMENT, userid INT, content VARCHAR(255), date_time DATETIME, PRIMARY KEY (id), FOREIGN KEY (userid) REFERENCES users(id) )', function (err, result) {
        if (err) throw err;
    })
}

module.exports = { createTable };