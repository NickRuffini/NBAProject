/*
Didn't realize we would need to submit all of the SQL statements we used throughout the project, so I tried to recreate a bunch of them
that demonstrates the process we went through to get here.

Also, for the Players table, we used the SQL Server functionality to read in a CSV file and automatically create the table for us, hence why we didn't
need a massive INSERT statement.
*/

ALTER TABLE dbo.Player
ADD CONSTRAINT FK_PlayerTeamName FOREIGN KEY(TeamName) REFERENCES dbo.Team(TeamName);

ALTER TABLE dbo.Player
DROP COLUMN PlayerID;


ALTER TABLE dbo.Player
ADD IsRemoved NVARCHAR(255) NOT NULL DEFAULT 'No';

ALTER TABLE dbo.Player
ADD PlayerID INT Identity(1,1);

CREATE TABLE dbo.TeamGame (
	TeamName INT NOT NULL,
	GameID INT NOT NULL,
	TeamTypeID INT NOT NULL,
	Score NVARCHAR(64) NOT NULL,

	CONSTRAINT pk_TeamGameName PRIMARY KEY (TeamName, GameID),

	FOREIGN KEY(GameID) REFERENCES dbo.Game(GameID),
	FOREIGN KEY(TeamTypeID) REFERENCES dbo.TeamType(TeamTypeID),

	UNIQUE(GameID, TeamTypeID),
);

CREATE TABLE dbo.Stadium (
	StadiumName NVARCHAR(255) NOT NULL PRIMARY KEY,
	City NVARCHAR(255) NOT NULL,
	[State] NVARCHAR(64) NOT NULL,
	Occupancy INT NOT NULL,
	Country NVARCHAR(64) NOT NULL,
);