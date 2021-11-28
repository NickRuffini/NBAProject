# NBAProject

The database is stored on the KSU Computer Science server. We utilized Microsoft SQL Server Management Studio to interact with our database and make changes 
throughout the duration of the project. Almost the entirety of our application was created using React.js, both on the client and server side of our project.  

The IDE we utilized during development was Visual Studio Code. 

The construction of our application was split into two parts; we had the client side, which managed the front-facing side of our project, and the server side, which acted as 
the local API and talked between the front end and the SQL server. On the server side, we used the Express library, which allowed our local server to respond to HTTP requests. 
These HTTP requests were sent from the front end and made possible by the Axios library. 

For the front end, we used a variety of libraries in order to assist the creation of what the user will see. 
We have the basic imports native to react such as useState and useEffect, which are essential for using Axios and loading/storing elements from the API. 
For basic layout of the front end, libraries such as Grid from material-ui, along with react-dropdown helped to layout/handle input. 

Finally, for the home page, we decided we wanted a variety of graphs and the like to display some interesting report queries. 
These were created using the chart.js library, which ended up really sprucing everything up.

For the related SQL and other Data files necessary for submission, we stored them in the "Data" folder in our project, which can be found on the same level as our Client and 
Server folders.
