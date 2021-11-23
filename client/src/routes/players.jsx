import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Axios from 'axios';

const teamOptions = ['Atl','Bos','Bro','Cha','Chi','Cle','Dal','Den','Det','Gsw','Hou','Ind','Lac','Lal','Mem','Mia'
                      ,'Mil','Min','Nop','Nyk','Okc','Orl','Phi','Pho','Por','Sac','Sas','Tor','Uta','Was'];

const positionOptions = ['G', 'F', 'C', 'G-F', 'F-C'];

export default function Players() {

    const[playerName, setPlayerName] = useState('')
    const[playerTeamName, setPlayerTeamName] = useState('')
    const[playerPosition, setPlayerPosition] = useState('')
    const[playerPPG, setPlayerPPG] = useState('')
    const[playerRPG, setPlayerRPG] = useState('')
    const[playerAPG, setPlayerAPG] = useState('')

    const[playerList, setPlayerList] = useState([])

    useEffect(() => {
      Axios.get('http://localhost:3001/api/get').then((response) => {
        setPlayerList(response.data.recordset)
      })
    }, [])

    const submitPlayer = () => {
      Axios.post('http://localhost:3001/api/insert', {FullName: playerName, TeamName: playerTeamName, Position: playerPosition, 
                  PointsPerGame: playerPPG, ReboundsPerGame: playerRPG, AssistsPerGame: playerAPG}).then(() => {
                    alert('successful insert!');
                  })
    }

    const deletePlayer = (playerID) => {
      Axios.delete(`http://localhost:3001/api/delete/${playerID}`)
    }

    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Players</h2>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={2}>
            <label>Name: </label>
            <input type='text' name='playerName' onChange={(e)=>{
              setPlayerName(e.target.value)
            }}/>
          </Grid>
          <Grid item xs={1}>
            <Dropdown options={teamOptions} placeholder="Team" onChange={(e)=>{
              setPlayerTeamName(e.value)
            }}/>
          </Grid>
          <Grid item xs={1}>
            <Dropdown options={positionOptions} placeholder="Position" onChange={(e)=>{
              setPlayerPosition(e.value)
            }}/>
          </Grid>
          <Grid item xs={2}>
            <label>PPG: </label>
            <input type='text' name='pointsPerGame' onChange={(e)=>{
              setPlayerPPG(e.target.value)
            }}/>
          </Grid>
          <Grid item xs={2}>
            <label>RPG: </label>
            <input type='text' name='reboundsPerGame' onChange={(e)=>{
              setPlayerRPG(e.target.value)
            }}/>
          </Grid>
          <Grid item xs={2}>
            <label>APG: </label>
            <input type='text' name='assistsPerGame' onChange={(e)=>{
              setPlayerAPG(e.target.value)
            }}/>
          </Grid>
          <Grid item xs={2}>
            <button onClick={submitPlayer}>Add Player</button>
          </Grid>
        </Grid>
        <Grid container spacing={0} alignItems="center" justifyContent="center">
              <Grid item xs={2} className='tableHeader'>
                <h1>ID</h1>
              </Grid>
              <Grid item xs={3} className='tableHeader'>
                <h1>Name</h1>
              </Grid>
              <Grid item xs={2} className='tableHeader'>
                <h1>Position</h1>
              </Grid>
              <Grid item xs={1} className='tableHeader'>
                <h1>PPG</h1>
              </Grid>
              <Grid item xs={1} className='tableHeader'>
                <h1>RPG</h1>
              </Grid>
              <Grid item xs={1} className='tableHeader'>
                <h1>APG</h1>
              </Grid>
              <Grid item xs={2} className='tableHeader'>
                <h1>Other</h1>
              </Grid>
        </Grid>
        
        {playerList.map((val) => {
          return (
            <Grid container spacing={0} alignItems="center" justifyContent="center">
              <Grid item xs={2} className='tableBox'>
                <div>{val.PlayerID}</div>
              </Grid>
              <Grid item xs={3} className='tableBox'>
                <div>{val.FullName}</div>
              </Grid>
              <Grid item xs={2} className='tableBox'>
                <div>{val.Position}</div>
              </Grid>
              <Grid item xs={1} className='tableBox'>
                <div>{val.PointsPerGame}</div>
              </Grid>
              <Grid item xs={1} className='tableBox'>
                <div>{val.ReboundsPerGame}</div>
              </Grid>
              <Grid item xs={1} className='tableBox'>
                <div>{val.AssistsPerGame}</div>
              </Grid>
              <Grid item xs={1} className='tableBox'>
                <button onClick={() => {deletePlayer(val.PlayerID)}}>
                  Delete
                </button>
              </Grid>
              <Grid item xs={1} className='tableBox'>
                <button>
                  Update
                </button>
              </Grid>
            </Grid>
          );
        })}
      </main>
    );
}