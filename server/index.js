const express = require('express')
const app = express()
const mssql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = {
    user: 'ruffini',
    password: 'Seel$295',
    server: 'mssql.cs.ksu.edu',
    database: 'cis560_fall21_team21',
    synchronize: true,
    trustServerCertificate: true,
}

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get/players', (req, res) => {
    
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
        const sqlSelect = "SELECT * FROM dbo.Player WHERE IsRemoved = 'No'";
        //console.log(sqlInsert);
        request.query(sqlSelect, function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            res.send(recordset);
        });
    });

})

app.get('/api/get/coaches', (req, res) => {

    mssql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new mssql.Request();
        // query to the database and get the records
        const sqlSelect = "SELECT * FROM dbo.Coach WHERE IsRemoved = 'No'";
        //console.log(sqlInsert);
        request.query(sqlSelect, function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            res.send(recordset);
        });
    });

})

app.get('/api/get/games', (req, res) => {

    mssql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new mssql.Request();
        // query to the database and get the records
        const sqlSelect = "SELECT G.GameID, G.[Date], HT.TeamName AS HomeTeam, [AT].TeamName AS AwayTeam, HT.Score FROM dbo.Game G JOIN dbo.TeamGame HT ON HT.GameID = G.GameID JOIN dbo.TeamGame [AT] ON [AT].GameID = G.GameID WHERE HT.TeamTypeID = 1 AND [AT].TeamTypeID = 2 ORDER BY G.GameID";
        //console.log(sqlInsert);
        request.query(sqlSelect, function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            res.send(recordset);
        });
    });

})

app.get('/api/get/teams', (req, res) => {

    mssql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new mssql.Request();
        // query to the database and get the records
        const sqlSelect = "SELECT * FROM dbo.Team";
        //console.log(sqlInsert);
        request.query(sqlSelect, function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            res.send(recordset);
        });
    });

})

app.post('/api/insert/players', (req, res) => {
    
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

app.post('/api/insert/coaches', (req, res) => {
    
    const FirstName = req.body.FirstName
    const LastName = req.body.LastName
    const TeamName = req.body.TeamName
    const Age = req.body.Age
    const NumberOfChampionships = req.body.NumberOfChampionships
    const CoachTypeId = req.body.CoachTypeId

    mssql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new mssql.Request();
        // query to the database and get the records
        const sqlInsert = "INSERT INTO dbo.Coach (FirstName, LastName, TeamName, Age, NumberOfChampionships, CoachTypeId) VALUES ('"
                            + FirstName + "', '" + LastName + "', '" + TeamName + "', " + Age + ", " + NumberOfChampionships + ", " 
                            + CoachTypeId + ")";
        //console.log(sqlInsert);
        request.query(sqlInsert, function (err, recordset) {
            if (err) console.log('Please specify each player field.')
            // send records as a response
            res.send('server test2');
        });
    });

})

app.post('/api/insert/games', (req, res) => {
    
    const GameID = req.body.GameID
    const GameIDNew = GameID + 1;

    const Date = req.body.Date
    const HomeTeam = req.body.HomeTeam
    const AwayTeam = req.body.AwayTeam
    const Score = req.body.Score

    mssql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new mssql.Request();
        // query to the database and get the records
        const sqlInsert1 = "INSERT INTO dbo.Game (Date) VALUES ('" + Date + "')";
        const sqlInsert2 = "INSERT INTO dbo.TeamGame (TeamName, GameID, TeamTypeID, Score) VALUES ('" + HomeTeam + "', " +
                            GameIDNew + ", 1, '" + Score + "'), ('" + AwayTeam + "', " +
                            GameIDNew + ", 2, '" + Score + "')"
        //console.log(sqlInsert);
        request.query(sqlInsert1, function (err, recordset) {
            if (err) console.log(err);
        });
        request.query(sqlInsert2, function (err, recordset) {
            if (err) console.log(err);
        });

    });

})

app.post('/api/insert/teams', (req, res) => {
    
    const TeamName = req.body.TeamName
    const StadiumName = req.body.StadiumName
    const Wins = req.body.Wins

    mssql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new mssql.Request();
        // query to the database and get the records
        const sqlInsert = "INSERT INTO dbo.Team (TeamName, StadiumName, Wins) VALUES ('"
                            + TeamName + "', '" + StadiumName + "', " + Wins + ")";
        //console.log(sqlInsert);
        request.query(sqlInsert, function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            res.send('server test2');
        });
    });

})

// Delete player
app.put('/api/delete/players/:PlayerID', (req, res) => {
    const playerID = req.params.PlayerID;

    mssql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new mssql.Request();
        // query to the database and get the records
        const sqlDelete = "UPDATE dbo.Player SET IsRemoved = 'Yes' WHERE PlayerID = " + playerID;
        //console.log(sqlInsert);
        request.query(sqlDelete, function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            res.send('server test2');
        });
    });
})

// Delete coach
app.put('/api/delete/coaches/:CoachId', (req, res) => {
    const coachID = req.params.CoachId;

    mssql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new mssql.Request();
        // query to the database and get the records
        const sqlDelete = "UPDATE dbo.Coach SET IsRemoved = 'Yes' WHERE CoachId = " + coachID;
        //console.log(sqlInsert);
        request.query(sqlDelete, function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            res.send('server test2');
        });
    });
})

app.put('/api/update/players/:PlayerID', (req, res) => {
    const playerID = req.params.PlayerID;

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
        const sqlUpdate = "UPDATE dbo.Player SET FullName = '" + FullName + "', TeamName = '" + TeamName + "', Position = '"
                            + Position + "', PointsPerGame = " + PointsPerGame + ", ReboundsPerGame = " + ReboundsPerGame
                            + ", AssistsPerGame = " + AssistsPerGame + " WHERE PlayerID = " + playerID;
        //console.log(sqlInsert);
        request.query(sqlUpdate, function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            res.send('server test2');
        });
    });
})

app.put('/api/update/coaches/:CoachId', (req, res) => {
    const coachID = req.params.CoachId;

    const FirstName = req.body.FirstName
    const LastName = req.body.LastName
    const TeamName = req.body.TeamName
    const Age = req.body.Age
    const NumberOfChampionships = req.body.NumberOfChampionships
    const CoachTypeId = req.body.CoachTypeId

    mssql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new mssql.Request();
        // query to the database and get the records
        const sqlUpdate = "UPDATE dbo.Coach SET FirstName = '" + FirstName + "', LastName = '" + LastName + "', TeamName = '"
                            + TeamName + "', Age = " + Age + ", NumberOfChampionships = " + NumberOfChampionships
                            + ", CoachTypeId = " + CoachTypeId + " WHERE CoachId = " + coachID;
        //console.log(sqlInsert);
        request.query(sqlUpdate, function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            res.send('server test2');
        });
    });
})

app.put('/api/update/games/:GameID', (req, res) => {
    const gameID = req.params.GameID;

    const Date = req.body.Date
    const HomeTeam = req.body.HomeTeam
    const AwayTeam = req.body.AwayTeam
    const Score = req.body.Score

    mssql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new mssql.Request();
        // query to the database and get the records
        const sqlUpdate1 = "UPDATE dbo.Game SET Date = '" + Date + "' WHERE GameID = " + gameID;
        const sqlUpdate2 = "UPDATE dbo.TeamGame SET TeamName = '" + HomeTeam + "', Score = '" + Score + 
                            "' WHERE GameID = " + gameID + " AND TeamTypeID = 1";
        const sqlUpdate3 = "UPDATE dbo.TeamGame SET TeamName = '" + AwayTeam + "', Score = '" + Score + 
                            "' WHERE GameID = " + gameID + " AND TeamTypeID = 2";

        //console.log(sqlInsert);
        request.query(sqlUpdate1, function (err, recordset) {
            if (err) console.log(err)
        });
        request.query(sqlUpdate2, function (err, recordset) {
            if (err) console.log(err)
        });
        request.query(sqlUpdate3, function (err, recordset) {
            if (err) console.log(err)
        });
    });
})

app.listen(3001, () => {
    console.log('running on port 3001');
})