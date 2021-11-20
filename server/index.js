const express = require('express')
const app = express()
const mssql = require('mssql');

const config = {
    user: 'ruffini',
    password: 'ManaphyIsC00l1234!',
    server: 'mssql.cs.ksu.edu',
    database: 'cis560_fall21_team21',
    synchronize: true,
    trustServerCertificate: true,
}

app.get('/', (req, res) => {
    const sqlInsert = "INSERT INTO dbo.Game (Date) VALUES ('2019-01-01 12:00:00')";

    /*db.query(sqlInsert, (error, result) => {
        res.send('server test2');
    })*/

    mssql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new mssql.Request();
        // query to the database and get the records
        request.query(sqlInsert, function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            res.send('server test2');
        });
    });
})

app.listen(3001, () => {
    console.log('running on port 3001');
})