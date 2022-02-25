import React from "react";
import { makeStyles } from "@mui/styles";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const useStyles = makeStyles(() => ({
  bar: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    transform: "scale(0.9)",
    "& p": {
      fontSize: "20px",
      fontWeight: "700",
      margin: "3em 0",
    },
  },
}));

function BarData({ barData }) {
  const classes = useStyles();

  let label = [];
  let dataItems = [];

  barData?.forEach((item) => {
    label.push(item.appSiteId);
    dataItems.push(item.impressions_offered);
  });
  const dataBar = {
    labels: label,
    datasets: [
      {
        label: "Bar Chart",
        backgroundColor: "#EC932F",
        borderWidth: 1,
        data: dataItems,
      },
    ],
  };

  return (
    <div className={classes.bar}>
      <p>Bar Chart</p>
      <Bar
        data={dataBar}
        width={100}
        height={50}
        options={{
          title: {
            display: true,
            text: "Bar Chart Details",
            fontSize: 16,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
}

export default BarData;
