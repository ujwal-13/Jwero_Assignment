const mysql = require('mysql2/promise');
// const fs= require('fs')
require('dotenv').config();
// const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQL_DATABASE}`;
// const pool =mysql.createPool(urlDB);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // TiDB Cloud uses port 4000. If this is missing, it defaults to 3306 and fails.
    port: process.env.DB_PORT || 4000, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        // TiDB Cloud requires at least TLS v1.2
        minVersion: 'TLSv1.2',
        // Node.js includes the necessary CA certs, so we just need to enable verification
        rejectUnauthorized: true 
    }
});

module.exports = pool;

 // ssl:{
    //     ca: fs.readFileSync(process.env.CA)
    // }