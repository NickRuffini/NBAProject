import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Axios from 'axios';
import moment from 'moment';

const teamOptions = ['Atl','Bos','Bro','Cha','Chi','Cle','Dal','Den','Det','Gsw','Hou','Ind','Lac','Lal','Mem','Mia'
                      ,'Mil','Min','Nop','Nyk','Okc','Orl','Phi','Pho','Por','Sac','Sas','Tor','Uta','Was'];

export default function Games() {

    const[gameDate, setGameDate] = useState('')
    const[gameTime, setGameTime] = useState('')
    const[gameHomeTeam, setGameHomeTeam] = useState('')
    const[gameAwayTeam, setGameAwayTeam] = useState('')
    const[gameScore, setGameScore] = useState('')

    const[gameList, setGameList] = useState([])

    useEffect(() => {
      Axios.get('http://localhost:3001/api/get/games').then((response) => {
        setGameList(response.data.recordset)
      })
    }, [])

    const submitGame = () => {
      const gameDateTime = gameDate + " " + gameTime
      const gameID = (gameList.at(-1))['GameID'];
      Axios.post('http://localhost:3001/api/insert/games', {GameID: gameID, Date: gameDateTime, HomeTeam: gameHomeTeam, 
                                                            AwayTeam: gameAwayTeam, Score: gameScore}).then(() => {
                    console.log('successful insert!');
                  })
    }

    const updateGame = (gameID) => {
      const gameDateTime = gameDate + " " + gameTime
      Axios.put(`http://localhost:3001/api/update/games/${gameID}`, {Date: gameDateTime, HomeTeam: gameHomeTeam, 
                    AwayTeam: gameAwayTeam, Score: gameScore}).then(() => {
                      console.log('successful update!');
                    })
    }

    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Games</h2>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={3}>
            <label>Date (YYYY-MM-DD): </label>
            <input type='text' name='gameDate' onChange={(e)=>{
              setGameDate(e.target.value)
            }}/>
          </Grid>
          <Grid item xs={4}>
            <label>Time (HH:MM:SS Military Time): </label>
            <input type='text' name='gameTime' onChange={(e)=>{
              setGameTime(e.target.value)
            }}/>
          </Grid>
          <Grid item xs={1}>
            <Dropdown options={teamOptions} placeholder="HomeTeam" onChange={(e)=>{
              setGameHomeTeam(e.value)
            }}/>
          </Grid>
          <Grid item xs={1}>
            <Dropdown options={teamOptions} placeholder="AwayTeam" onChange={(e)=>{
              setGameAwayTeam(e.value)
            }}/>
          </Grid>
          <Grid item xs={2}>
            <label>Score: </label>
            <input type='text' name='gameScore' onChange={(e)=>{
              setGameScore(e.target.value)
            }}/>
          </Grid>
          <Grid item xs={1}>
            <button onClick={submitGame}>Add Game</button>
          </Grid>
        </Grid>
        <Grid container spacing={0} alignItems="center" justifyContent="center">
              <Grid item xs={2} className='tableHeader'>
                <h1>ID</h1>
              </Grid>
              <Grid item xs={3} className='tableHeader'>
                <h1>Date</h1>
              </Grid>
              <Grid item xs={2} className='tableHeader'>
                <h1>Home</h1>
              </Grid>
              <Grid item xs={2} className='tableHeader'>
                <h1>Away</h1>
              </Grid>
              <Grid item xs={2} className='tableHeader'>
                <h1>Score</h1>
              </Grid>
              <Grid item xs={1} className='tableHeader'>
                <h1>Other</h1>
              </Grid>
        </Grid>
        
        {gameList.map((val) => {
          return (
            <Grid container spacing={0} alignItems="center" justifyContent="center">
              <Grid item xs={2} className='tableBox'>
                <div>{val.GameID}</div>
              </Grid>
              <Grid item xs={3} className='tableBox'>
                <div>{moment(val.Date).format("MMMM D, YYYY HH:mm:ss Z")}</div>
              </Grid>
              <Grid item xs={2} className='tableBox'>
                <div>{val.HomeTeam}</div>
              </Grid>
              <Grid item xs={2} className='tableBox'>
                <div>{val.AwayTeam}</div>
              </Grid>
              <Grid item xs={2} className='tableBox'>
                <div>{val.Score}</div>
              </Grid>
              <Grid item xs={1} className='tableBox'>
                <button onClick={() => {updateGame(val.GameID)}}>
                  Update
                </button>
              </Grid>
            </Grid>
          );
        })}
      </main>
    );
}