import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Axios from 'axios';

const stadiumOptions = ['State Farm Arena', 'TD Garden', 'Barclays Center', 'Spectrum Center', 'United Center',
    'Rocket Mortgage Fieldhouse', 'American Airlines Center', 'Pepsi Center', 'Little Caesars Arena', 
    'Chase Center', 'Toyota Center', 'Bankers Life Fieldhouse', 'Staples Center', 'Staples Center',
    'FedEx Forum', 'American Airlines Arena', 'Fiserv Forum', 'Target Center', 'Smoothie King Center',
    'Madison Square Garden', 'Chesapeake Energy Arena', 'Amway Center', 'Wells Fargo Center',
    'Talking Stick Resort Arena', 'Moda Center', 
    'Golden 1 Center', 'AT&T Center', 'Scotiabank Arena', 'Vivint Smart Home Arena', 'Capital One Arena'];

export default function Teams() {

    const[teamName, setTeamName] = useState('')
    const[teamStadiumName, setTeamStadiumName] = useState('')
    const[teamWins, setTeamWins] = useState('')

    const[teamList, setTeamList] = useState([])

    useEffect(() => {
      Axios.get('http://localhost:3001/api/get/teams').then((response) => {
        setTeamList(response.data.recordset)
      })
    }, [])

    const submitTeam = () => {
      Axios.post('http://localhost:3001/api/insert/teams', {TeamName: teamName, StadiumName: teamStadiumName, 
                                                            Wins: teamWins}).then(() => {
                    console.log('successful insert!');
                  })
    }

    const updateTeam = (teamName) => {
      Axios.put(`http://localhost:3001/api/update/teams/${teamName}}`, {TeamName: teamName, StadiumName: teamStadiumName, 
                                                                        Wins: teamWins}).then(() => {
                      console.log('successful update!');
                    })
    }

    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Teams</h2>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={2}>
            <label>Name: </label>
            <input type='text' name='teamName' onChange={(e)=>{
              setTeamName(e.target.value)
            }}/>
          </Grid>
          <Grid item xs={2}>
            <Dropdown options={stadiumOptions} placeholder="Stadium" onChange={(e)=>{
              setTeamStadiumName(e.value)
            }}/>
          </Grid>
          <Grid item xs={2}>
            <label>Wins: </label>
            <input type='text' name='teamWins' onChange={(e)=>{
              setTeamWins(e.target.value)
            }}/>
          </Grid>
          <Grid item xs={1}>
            <button onClick={submitTeam}>Add Team</button>
          </Grid>
        </Grid>
        <Grid container spacing={0} alignItems="center" justifyContent="center">
              <Grid item xs={4} className='tableHeader'>
                <h1>Name</h1>
              </Grid>
              <Grid item xs={4} className='tableHeader'>
                <h1>Stadium</h1>
              </Grid>
              <Grid item xs={2} className='tableHeader'>
                <h1>Wins</h1>
              </Grid>
              <Grid item xs={2} className='tableHeader'>
                <h1>Other</h1>
              </Grid>
        </Grid>
        
        {teamList.map((val) => {
          return (
            <Grid container spacing={0} alignItems="center" justifyContent="center">
              <Grid item xs={4} className='tableBox'>
                <div>{val.TeamName}</div>
              </Grid>
              <Grid item xs={4} className='tableBox'>
                <div>{val.StadiumName}</div>
              </Grid>
              <Grid item xs={2} className='tableBox'>
                <div>{val.Wins}</div>
              </Grid>
              <Grid item xs={2} className='tableBox'>
                <button onClick={() => {updateTeam(val.TeamName)}}>
                  Update
                </button>
              </Grid>
            </Grid>
          );
        })}
      </main>
    );
}