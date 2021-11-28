/*
Calculate top 10 players in the league with the highest PAR rating (created from their points, assists, rebounds) along with their points, 
assists and rebounds independently, returning the sorted players by PAR rating. 
*/

--Query for calculating highest PAR rating 
--45% PPG, 30% Rebounds, 25% Assists
CREATE PROCEDURE CalculatePAR
AS
SELECT P.FullName, P.Position, 
    ((.45 * P.PointsPerGame) + (.30 * P.ReboundsPerGame) + (.25 * P.AssistsPerGame)) AS PlayerEfficiencyRating
FROM dbo.Player P
ORDER BY PlayerEfficiencyRating DESC
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;
GO

/*
Calculate the leaders in points/assists/rebounds in the league, and return these stats along with their teams
*/

--Query for highest average for points 
DECLARE 
	@Page INT = 2,
	@ResultSize INT = 10;

SELECT P.FullName, P.Position, P.PointsPerGame
FROM dbo.Player P
GROUP BY P.Position, P.FullName, P.PointsPerGame
ORDER BY P.PointsPerGame DESC
OFFSET (@Page - 1) * @ResultSize ROWS FETCH NEXT @ResultSize ROWS ONLY;


--Query for highest average for assists
SELECT P.FullName, P.Position, P.AssistsPerGame
FROM dbo.Player P
GROUP BY P.Position, P.FullName, P.AssistsPerGame
ORDER BY P.AssistsPerGame DESC
OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;

--Query for highest average for rebounds
SELECT P.FullName, P.Position, P.ReboundsPerGame
FROM dbo.Player P
GROUP BY P.Position, P.FullName, P.ReboundsPerGame
ORDER BY P.ReboundsPerGame DESC
OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;

/*
Calculate league average in points per game, and return those players who surpass that average.
*/

--Calculate average points per game for all players and return those who surpass league average 
CREATE PROCEDURE PlayersAbovePPGAvg
AS
SELECT P.FullName, P.Position, P.PointsPerGame, 
    (ROUND((P.PointsPerGame / 8.44110091743119), 2) - 1) * 100 AS PercentageAboveLeagueAverage
FROM dbo.Player P
WHERE P.PointsPerGame > 
    (
        SELECT (SUM(P.PointsPerGame) / COUNT(P.PlayerID)) AS AveragePoints
        FROM dbo.Player P
    )
GROUP BY P.FullName, P.Position, P.PointsPerGame
ORDER BY P.PointsPerGame DESC, PercentageAboveLeagueAverage DESC;
GO

EXEC PlayersAbovePPGAvg;

/*
Create a score that represents the highest possibility to go to the 2021 Playoffs based on last season’s 
number of wins for each team and the number of championships the head coach has. 
*/

--Query to compare team wins and their coach's number of championships to predict making the 2021 playoffs
CREATE PROCEDURE [2021PlayoffProbability]
AS
SELECT 
    C.FirstName + ' ' + C.LastName AS Coach, 
    C.NumberOfChampionships, C.TeamName, T.Wins, 
    (.65 * T.Wins + .35 * C.NumberOfChampionships) AS [2021ChanceToMakePlayoffs]
FROM dbo.Coach C
    JOIN dbo.Team T ON T.TeamName = C.TeamName
ORDER BY [2021ChanceToMakePlayoffs] DESC;
GO 

EXEC [2021PlayoffProbability];

/* Gets all players that haven't been removed */

SELECT * FROM dbo.Player WHERE IsRemoved = 'No'

SELECT * FROM dbo.Coach WHERE IsRemoved = 'No'

/* Gets all the games, along with the teams that participated in the TeamGame table */

SELECT G.GameID, G.[Date], HT.TeamName AS HomeTeam, [AT].TeamName AS AwayTeam, HT.Score 
FROM dbo.Game G 
	JOIN dbo.TeamGame HT ON HT.GameID = G.GameID 
	JOIN dbo.TeamGame [AT] ON [AT].GameID = G.GameID 
WHERE HT.TeamTypeID = 1 AND [AT].TeamTypeID = 2 
ORDER BY G.GameID

SELECT * FROM dbo.Team

/* Average points per game for league */

SELECT (SUM(P.PointsPerGame) / COUNT(P.PlayerID)) AS AveragePoints FROM dbo.Player P

/* Simulates deleting a player by changing their IsRemoved Property */

UPDATE dbo.Player SET IsRemoved = 'Yes' WHERE PlayerID = 'PlayerID'

UPDATE dbo.Coach SET IsRemoved = 'Yes' WHERE CoachId = 'CoachID'

/* Used to update a Player's information using parameters gotten from the front end input */

UPDATE dbo.Player SET FullName = '" + FullName + "', TeamName = '" + TeamName + "', Position = '"
                            + Position + "', PointsPerGame = " + PointsPerGame + ", ReboundsPerGame = " + ReboundsPerGame
                            + ", AssistsPerGame = " + AssistsPerGame + " WHERE PlayerID = " + playerID;

