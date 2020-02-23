const DB_CONNECTION = require('./config.db.connect');

function createTable() {
    let count = 0;
    DB_CONNECTION.query('CREATE TABLE IF NOT EXISTS users (id int primary key AUTO_INCREMENT, name VARCHAR(255), dob DATE, email VARCHAR(255) unique, password VARCHAR(255))', function (err, result) {
        if (err) throw err; //use alternative for this throw
    });

    DB_CONNECTION.query('CREATE TABLE IF NOT EXISTS user_refresh_tokens (id INT AUTO_INCREMENT, userid INT, refreshtoken VARCHAR(255), PRIMARY KEY (id), FOREIGN KEY (userid) REFERENCES users(id))', function (err, result) {
        if (err) throw err;
    });

    DB_CONNECTION.query('CREATE TABLE IF NOT EXISTS user_posts (id INT AUTO_INCREMENT, userid INT, content VARCHAR(255), date_time DATETIME, PRIMARY KEY (id), FOREIGN KEY (userid) REFERENCES users(id) )', function (err, result) {
        if (err) throw err;
    });

    DB_CONNECTION.query('CREATE TABLE IF NOT EXISTS user_comments (id INT AUTO_INCREMENT, postid INT, userid INT, comment VARCHAR(255), date_time DATETIME, parent_reply_id INT, PRIMARY KEY (id), INDEX (postid), INDEX (userid), FOREIGN KEY (postid) REFERENCES user_posts(id), FOREIGN KEY (userid) REFERENCES users(id) )', function (err, result) {
        if (err) throw err;
    });

    DB_CONNECTION.query('CREATE TABLE IF NOT EXISTS user_friends ( id INT AUTO_INCREMENT, senderid INT NOT NULL, recieverid INT NOT NULL, request_status TINYINT NOT NULL, PRIMARY KEY (id), FOREIGN KEY (senderid) REFERENCES users(id))', function (err, result) {
        if (err) throw err;
    })

    DB_CONNECTION.query('CREATE TABLE IF NOT EXISTS user_notifications (id INT AUTO_INCREMENT, userid INT NOT NULL, issuerid INT NOT NULL, action VARCHAR(255), target VARCHAR(255), targetid INT NOT NULL, post_ownerid INT, date_time DATETIME, status TINYINT DEFAULT 0, PRIMARY KEY (id), FOREIGN KEY (userid) REFERENCES users(id), FOREIGN KEY (issuerid) REFERENCES users(id))', function (err, result) {
        if (err) throw err;
    });
}

module.exports = { createTable };