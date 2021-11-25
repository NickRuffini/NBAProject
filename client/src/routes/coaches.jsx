import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Axios from 'axios';

const teamOptions = ['Atl','Bos','Bro','Cha','Chi','Cle','Dal','Den','Det','Gsw','Hou','Ind','Lac','Lal','Mem','Mia'
                      ,'Mil','Min','Nop','Nyk','Okc','Orl','Phi','Pho','Por','Sac','Sas','Tor','Uta','Was'];

const coachOptions = ['Head', 'Assistant'];

export default function Coaches() {

    const[coachFirstName, setCoachFirstName] = useState('')
    const[coachLastName, setCoachLastName] = useState('')
    const[coachTeamName, setCoachTeamName] = useState('')
    const[coachAge, setCoachAge] = useState('')
    const[coachNumOfChamps, setCoachNumOfChamps] = useState('')
    const[coachType, setCoachType] = useState('')

    const[coachList, setCoachList] = useState([])

    //const[teamOptions, setTeamOptions] = useState([])

    useEffect(() => {
      Axios.get('http://localhost:3001/api/get/coaches').then((response) => {
        setCoachList(response.data.recordset)
      })
    }, [])

    const submitCoach = () => {
      Axios.post('http://localhost:3001/api/insert/coaches', {FirstName: coachFirstName, LastName: coachLastName, 
                      TeamName: coachTeamName, Age: coachAge, NumberOfChampionships: coachNumOfChamps, CoachTypeId: coachType}).then(() => {
                        console.log('successful insert!');
                      })
    }

    const deleteCoach = (coachID) => {
      Axios.put(`http://localhost:3001/api/delete/coaches/${coachID}`)
    }

    const updateCoach = (coachID) => {
      Axios.put(`http://localhost:3001/api/update/coaches/${coachID}`, {FirstName: coachFirstName, LastName: coachLastName, 
                      TeamName: coachTeamName, Age: coachAge, NumberOfChampionships: coachNumOfChamps, CoachTypeId: coachType}).then(() => {
                        console.log('successful insert!');
                      })
    }

    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Coaches</h2>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={2}>
            <label>Name: </label>
            <input type='text' name='coachName' onChange={(e)=>{
              const nameArray = e.target.value.split(" ");
              const firstName = nameArray[0];
              const lastName = nameArray[1];
              setCoachFirstName(firstName);
              setCoachLastName(lastName);
            }}/>
          </Grid>
          <Grid item xs={1}>
            <Dropdown options={teamOptions} placeholder="Team" onChange={(e)=>{
              setCoachTeamName(e.value)
            }}/>
          </Grid>
          <Grid item xs={1}>
            <Dropdown options={coachOptions} placeholder="Type" onChange={(e)=>{
              setCoachType(e.value === 'Head' ? 1 : 2)
            }}/>
          </Grid>
          <Grid item xs={2}>
            <label>Age: </label>
            <input type='text' name='coachAge' onChange={(e)=>{
              setCoachAge(e.target.value)
            }}/>
          </Grid>
          <Grid item xs={3}>
            <label>Number of Championships: </label>
            <input type='text' name='numOfChamps' onChange={(e)=>{
              setCoachNumOfChamps(e.target.value)
            }}/>
          </Grid>
          <Grid item xs={1}>
            <button onClick={submitCoach}>Add Coach</button>
          </Grid>
        </Grid>
        <Grid container spacing={0} alignItems="center" justifyContent="center">
              <Grid item xs={2} className='tableHeader'>
                <h1>ID</h1>
              </Grid>
              <Grid item xs={3} className='tableHeader'>
                <h1>Name</h1>
              </Grid>
              <Grid item xs={1} className='tableHeader'>
                <h1>Team</h1>
              </Grid>
              <Grid item xs={1} className='tableHeader'>
                <h1>Type</h1>
              </Grid>
              <Grid item xs={1} className='tableHeader'>
                <h1>Age</h1>
              </Grid>
              <Grid item xs={2} className='tableHeader'>
                <h1># Rings</h1>
              </Grid>
              <Grid item xs={2} className='tableHeader'>
                <h1>Other</h1>
              </Grid>
        </Grid>
        
        {coachList.map((val) => {
          return (
            <Grid container spacing={0} alignItems="center" justifyContent="center">
              <Grid item xs={2} className='tableBox'>
                <div>{val.CoachId}</div>
              </Grid>
              <Grid item xs={3} className='tableBox'>
                <div>{val.FirstName} {val.LastName}</div>
              </Grid>
              <Grid item xs={1} className='tableBox'>
                <div>{val.TeamName}</div>
              </Grid>
              <Grid item xs={1} className='tableBox'>
                <div>{val.CoachTypeId === 1 ? 'Head' : "Assistant"}</div>
              </Grid>
              <Grid item xs={1} className='tableBox'>
                <div>{val.Age}</div>
              </Grid>
              <Grid item xs={2} className='tableBox'>
                <div>{val.NumberOfChampionships}</div>
              </Grid>
              <Grid item xs={1} className='tableBox'>
                <button onClick={() => {deleteCoach(val.CoachId)}}>
                  Delete
                </button>
              </Grid>
              <Grid item xs={1} className='tableBox'>
                <button onClick={() => {updateCoach(val.CoachId)}}>
                  Update
                </button>
              </Grid>
            </Grid>
          );
        })}
      </main>
    );
}