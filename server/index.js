const express = require('express')
const app = express()
const mssql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = {
    user: 'ruffini',
    password: 'ManaphyIsC00l1234!',
    server: 'mssql.cs.ksu.edu',
    database: 'cis560_fall21_team21',
    synchronize: true,
    trustServerCertificate: true,
}

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get', (req, res) => {
    
    const FullName = req.body.FullName
    const TeamName = req.body.TeamName
    const Position = req.body.Position
    const PointsPerGame = req.body.PointsPerGame
    const ReboundsPerGame = req.body.ReboundsPerGame
    const AssistsPerGame = req.body.AssistsPerGame

    mssql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new mssql.Request();
        // query to the database and get the records
        const sqlSelect = "SELECT * FROM dbo.Player";
        //console.log(sqlInsert);
        request.query(sqlSelect, function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            res.send(recordset);
        });
    });

})

app.post('/api/insert', (req, res) => {
    
    const FullName = req.body.FullName
    const TeamName = req.body.TeamName
    const Position = req.body.Position
    const PointsPerGame = req.body.PointsPerGame
    const ReboundsPerGame = req.body.ReboundsPerGame
    const AssistsPerGame = req.body.AssistsPerGame

    mssql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new mssql.Request();
        // query to the database and get the records
        const sqlInsert = "INSERT INTO dbo.Player (FullName, TeamName, Position, PointsPerGame, ReboundsPerGame, AssistsPerGame) VALUES ('"
                            + FullName + "', '" + TeamName + "', '" + Position + "', " + PointsPerGame + ", " + ReboundsPerGame + ", " 
                            + AssistsPerGame + ")";
        //console.log(sqlInsert);
        request.query(sqlInsert, function (err, recordset) {
            if (err) console.log('Please specify each player field.')
            // send records as a response
            res.send('server test2');
        });
    });

})

app.listen(3001, () => {
    console.log('running on port 3001');
})