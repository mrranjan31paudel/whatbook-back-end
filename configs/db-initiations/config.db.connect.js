const CONNECTION = require('mysql').createConnection({
    host: "localhost",
    user: "root",
    password: "ranjanpaudel",
    database: "userbase"
});

CONNECTION.connect(function(err){
    if(err) throw err;
    console.log('Database Connected.');
});


module.exports = CONNECTION;