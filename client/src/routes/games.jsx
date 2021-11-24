import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import 'react-dropdown/style.css';
import Axios from 'axios';

export default function Games() {

    const[gameDate, setGameDate] = useState('')
    const[gameTime, setGameTime] = useState('')

    const[gameList, setGameList] = useState([])

    useEffect(() => {
      Axios.get('http://localhost:3001/api/get/games').then((response) => {
        setGameList(response.data.recordset)
      })
    }, [])

    const submitGame = () => {
      const gameDateTime = gameDate + " " + gameTime
      Axios.post('http://localhost:3001/api/insert/games', {Date: gameDateTime}).then(() => {
                    console.log('successful insert!');
                  })
    }

    const updateGame = (gameID) => {
      const gameDateTime = gameDate + " " + gameTime
      Axios.put(`http://localhost:3001/api/update/games/${gameID}`, {Date: gameDateTime}).then(() => {
                      console.log('successful update!');
                    })
    }

    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Games</h2>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={2}>
            <label>Date (YYYY-MM-DD): </label>
            <input type='text' name='gameDate' onChange={(e)=>{
              setGameDate(e.target.value)
            }}/>
          </Grid>
          <Grid item xs={2}>
            <label>Time: (HH:MM:SS Military Time)</label>
            <input type='text' name='gameTime' onChange={(e)=>{
              setGameTime(e.target.value)
            }}/>
          </Grid>
          <Grid item xs={2}>
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
                <div>{val.Date}</div>
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