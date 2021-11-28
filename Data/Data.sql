/*
Didn't realize we would need to submit all of the SQL statements we used throughout the project, so I tried to recreate a bunch of them
that demonstrates the process we went through to get here.

Also, for the Players table, we used the SQL Server functionality to read in a CSV file and automatically create the table for us, hence why we didn't
need a massive INSERT statement.
*/

INSERT dbo.Stadium(StadiumName, City, [State], Occupancy, Country)
VALUES
	 (N'State Farm Arena', N'Atlanta', N'Georgia',18118, N'United States'),
 (N'TD Garden', N'Boston', N'Massachusetts',18624, N'United States'),
 (N'Barclays Center', N'Brooklyn', N'New York',17732, N'United States'),
 (N'Spectrum Center', N'Charlotte', N'North Carolina',19077, N'United States'),
 (N'United Center', N'Chicago', N'Illinois',20917, N'United States'),
 (N'Rocket Mortgage Fieldhouse', N'Cleveland', N'Ohio',19432, N'United States'),
 (N'American Airlines Center', N'Dallas', N'Texas',19200, N'United States'),
 (N'Pepsi Center', N'Denver', N'Colorado',19520, N'United States'),
 (N'Little Caesars Arena', N'Detroit', N'Michigan',20491, N'United States'),
 (N'Chase Center', N'San Francisco', N'California',18064, N'United States'),
 (N'Toyota Center', N'Houston', N'Texas',18055, N'United States'),
 (N'Bankers Life Fieldhouse', N'Indianapolis', N'Indiana',17923, N'United States'),
 (N'Staples Center', N'Los Angeles', N'California',19068, N'United States'),
 (N'FedEx Forum', N'Memphis', N'Tennessee',17794, N'United States'),
 (N'American Airlines Arena', N'Miami', N'Florida',19600, N'United States'),
 (N'Fiserv Forum', N'Milwaukee', N'Wisconsin',17500, N'United States'),
 (N'Target Center', N'Minneapolis', N'Minnesota',18978, N'United States'),
 (N'Smoothie King Center', N'New Orleans', N'Louisiana',16867, N'United States'),
 (N'Madison Square Garden', N'New York City', N'New York',19812, N'United States'),
 (N'Chesapeake Energy Arena', N'Oklahoma City', N'Oklahoma',18203, N'United States'),
 (N'Amway Center', N'Orlando', N'Florida',18846, N'United States'),
 (N'Wells Fargo Center', N'Philadelphia', N'Pennsylvania',20478, N'United States'),
 (N'Talking Stick Resort Arena', N'Phoenix', N'Arizona',18055, N'United States'),
 (N'Moda Center', N'Portland', N'Oregon',19441, N'United States'),
 (N'Golden 1 Center', N'Sacramento', N'California',17583, N'United States'),
 (N'AT&T Center', N'San Antonio', N'Texas',18418, N'United States'),
 (N'Scotiabank Arena', N'Toronto', N'',19800, N'Canada'),
 (N'Vivint Smart Home Arena', N'Salt Lake City', N'Utah',18306, N'United States'),
 (N'Capital One Arena', N'Washington, D.C.', N'',20356, N'United States');

INSERT INTO dbo.Game (Date) VALUES ('2020-02-02 2:00:00');

INSERT INTO dbo.TeamGame (TeamName, GameID, TeamTypeID, Score)
VALUES ('Lac', 10, 2, '120-65'), ('Lal', 10, 1, '120-65');*/