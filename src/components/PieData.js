import React from "react";
import { makeStyles } from "@mui/styles";
import { Pie } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const useStyles = makeStyles(() => ({
    pie: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        transform: "scale(0.9)",
        "& p": {
            fontSize: "20px",
            fontWeight: "700",
            margin: "3em 0"
        }
    },
}));

function PieData({ pieData }) {

    const classes = useStyles()

    let labels = [];
    let percent = [];
    let backGroundColor = [];
    pieData?.forEach((el) => {
      labels.push(el.advertiserId);
      percent.push(el.CM001_percent);
      backGroundColor.push(
        "rgb(" +
          Math.floor(Math.random() * 256) +
          "," +
          Math.floor(Math.random() * 256) +
          "," +
          Math.floor(Math.random() * 256) +
          ")"
      );
    });
  
  
    const state = {
      labels,
      datasets: [
        {
          label: "Pie Chart",
          backgroundColor: backGroundColor,
          data: percent,
        },
      ],
    };



  return (
    <div className={classes.pie}>
     <p>Pie Chart</p>
      <Pie
        data={state}
        options={{
          title: {
            display: true,
            text: "Pie Chart",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
            labels: {
              fontSize: 15, 
              fontColor: "#000",
            },
          }
        }}
      />
    </div>
  );
}

export default PieData;
