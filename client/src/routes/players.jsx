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

    const submitPlayer = () => {
      Axios.post('http://localhost:3001/')
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
            <Dropdown options={teamOptions} value={teamOptions[0]} placeholder="Select an option" onChange={(e)=>{
              setPlayerTeamName(e.target.value)
            }}/>
          </Grid>
          <Grid item xs={1}>
            <Dropdown options={positionOptions} value={positionOptions[0]} placeholder="Select an option" onChange={(e)=>{
              setPlayerPosition(e.target.value)
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
      </main>
    );
}