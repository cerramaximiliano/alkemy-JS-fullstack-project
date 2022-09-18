const mysql = require('mysql2');

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
});
connection.getConnection(function(err){
    if(err){
        console.log(err)
        return false
    }
});

module.exports = connection.promise();