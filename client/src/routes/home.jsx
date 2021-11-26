import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import 'react-dropdown/style.css';
import Axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

export default function Home() {

    const[report1Data, setReport1Data] = useState([])
    const[report2Data, setReport2Data] = useState([])
    const[report3Data, setReport3Data] = useState([])
    const[reportAvgData, setReportAvgData] = useState([])
    const[report4Data, setReport4Data] = useState([])


    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      BarElement,
      ArcElement,
      Title,
      Tooltip,
      Legend
    );

    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'League PPG Leaders',
        },
      },
    };

    const report2ReducedNames = [];
    for (let i = 0; i < report2Data.length; i++) {
      report2ReducedNames[i] = report2Data.at(i)['FullName'] 
    }

    const report2ReducedPPG = [];
    for (let i = 0; i < report2Data.length; i++) {
      report2ReducedPPG[i] = report2Data.at(i)['PointsPerGame']
    }

    const report2Chart = {
        labels: report2ReducedNames,
        datasets: [{
          label: 'Points Per Game',
          data: report2ReducedPPG,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }]
    }

    const options3 = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Percentage Above Average PPG',
        },
      },
    };

    const report3ReducedNames = [];
    for (let i = 0; i < report3Data.length; i++) {
      report3ReducedNames[i] = report3Data.at(i)['FullName'] 
    }

    const report3ReducedPercentage = [];
    for (let i = 0; i < report3Data.length; i++) {
      report3ReducedPercentage[i] = report3Data.at(i)['PercentageAboveLeagueAverage']
    }

    const report3Chart = {
      labels: report3ReducedNames,
      datasets: [{
        label: 'Percentage Above',
        data: report3ReducedPercentage,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }]
    }

    const report4ReducedNames = [];
    for (let i = 0; i < report4Data.length; i++) {
      report4ReducedNames[i] = report4Data.at(i)['TeamName'] 
    }

    const report4ReducedChance = [];
    for (let i = 0; i < report4Data.length; i++) {
      report4ReducedChance[i] = report4Data.at(i)['2021ChanceToMakePlayoffs']
    }

    var rgbList = []
    for(var j = 0; j < 20; j++) {
      var rgb = [];
      for(var i = 0; i < 3; i++) {
        rgb.push(Math.floor(Math.random() * 255));
      }
      rgbList[j] = "rgba(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ", 0.2)"
    }

    const report4Chart = {
      labels: report4ReducedNames,
      datasets: [
        {
          label: '% Chance to Make Playoffs',
          data: report4ReducedChance,
          backgroundColor: rgbList,
          borderColor: rgbList,
          borderWidth: 1,
        },
      ],
    };

    useEffect(() => {
      Axios.get('http://localhost:3001/api/get/report1').then((response) => {
        setReport1Data(response.data.recordset)
      })
    }, [])

    useEffect(() => {
      Axios.get('http://localhost:3001/api/get/report2').then((response) => {
        setReport2Data(response.data.recordset)
      })
    }, [])

    useEffect(() => {
      Axios.get('http://localhost:3001/api/get/report3').then((response) => {
        setReport3Data(response.data.recordset)
      })
    }, [])

    useEffect(() => {
      Axios.get('http://localhost:3001/api/get/reportAvg').then((response) => {
        setReportAvgData(response.data.recordset)
      })
    }, [])

    useEffect(() => {
      Axios.get('http://localhost:3001/api/get/report4').then((response) => {
        setReport4Data(response.data.recordset)
      })
    }, [])

    return (
      <main style={{ padding: "1rem 0" }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={6}>
            <div className='table'>
              <h1 className='tableHeader2'>Top 10 PER</h1>
              <Grid container spacing={0} alignItems="center" justifyContent="center">
                <Grid item xs={6} className='tableHeader'>
                  <h2>Player</h2>
                </Grid>
                <Grid item xs={6} className='tableHeader'>
                  <h2>Player Efficiency Rating</h2>
                </Grid>
              </Grid>
              {report1Data.map((val) => {
                return (
                  <Grid container spacing={0} alignItems="center" justifyContent="center">
                    <Grid item xs={6} className='tableBox'>
                      <div>{val.FullName}</div>
                    </Grid>
                    <Grid item xs={6} className='tableBox'>
                      <div>{val.PlayerEfficiencyRating.toFixed(2)}</div>
                    </Grid>
                  </Grid>
                );
              })}
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className='chart'>
              <Bar data={report2Chart} options={options}/>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className='chart'>
              <Line data={report3Chart} options={options3}/>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className='text'>
              {reportAvgData.map((val) => {
                return (
                  <Grid container spacing={0} alignItems="center" justifyContent="center">
                    <Grid item xs={6} className='tableHeader2'>
                      <div>League Average PPG: </div>
                    </Grid>
                    <Grid item xs={6} className='tableHeader2'>
                      <div>{val.AveragePoints.toFixed(2)}</div>
                    </Grid>
                  </Grid>
                );
              })}
            </div>
          </Grid>
          <Grid item xs={10}>
            <h1 className='tableHeader2'>Chance to Make Playoffs:</h1>
            <div className='chart'>
              <Doughnut data={report4Chart}/>
            </div>
          </Grid>
        </Grid>
      </main>
    );
}