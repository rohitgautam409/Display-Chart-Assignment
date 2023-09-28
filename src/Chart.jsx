import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  TimeScale,
  PointElement,
  Colors
} from 'chart.js'
ChartJS.register(
  Colors,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  TimeScale,
  PointElement
)
import moment from 'moment';
 

const Chart =()=>{
    const [data, setData] = useState([]);
    

  useEffect(()=>{
    fetch("https://api.llama.fi/summary/fees/lyra?dataType=dailyFees")
    .then(response =>response.json())
    .then((data)=>{
        let chartData = data.totalDataChart.map((item)=>({
            x : moment.unix(item[0]).format('MM/DD h:mm'),
            y: item[1],
        }))
        setData(chartData)
        
    })
  },[])
  
  
    return (
      <div>
        <h1 >Generate Chart using Api Data</h1>
        <div className="chart-container">
          <Line 
            data={{
              
              labels: data.map((item) => item.x),
              datasets: [
                {
                  data: data.map((item) => item.y),
                  borderColor: 'rgb(75, 192, 192)',
                  backgroundColor: 'rgb(121,47,47)',
                },
              ],
            }}
          />
        </div>
      </div>
    );
}
export default Chart;