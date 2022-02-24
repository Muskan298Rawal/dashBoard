import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchDashboardData,
  fetchValidDateRange,
} from "../Redux/Actions/DashBoardAction";
import BarData from "./BarData";
import BasicDateRangePicker from "./DateRange";
import PieData from "./PieData";
import TableData from "./TableData";

const useStyles = makeStyles(() => ({
  btn: {
    background: "blue",
    color: "white",
    marginTop: "1em",
  },
  datePicker: {
    margin: "3em",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  },
}));

function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const {
    dateRange,
    loadingDate,
    loadingData,
    tableData,
    barData,
    pieData,
    redirectTo
  } = useSelector((state) => state.dashboard);

  const { userData } = useSelector((state) => state.user);


  useEffect(() => {
      if(userData){
        dispatch(fetchValidDateRange());
      }
    
  }, []);

  useEffect(() => {
      navigate(redirectTo)
  }, [redirectTo])

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const handleData = () => {
    let startDate = ""+ dateRange[0].valueOf();
    let endDate = ""+ dateRange[1].valueOf();
    dispatch(fetchDashboardData(startDate, endDate));
  };

  return (
    <>
      {loadingDate && !dateRange.length ? (
        <span> LOADING DASHBOARD</span>
      ) : (
        <div>
          <Button
            variant="contained"
            onClick={handleLogout}
            className={classes.btn}
          >
            Logout
          </Button>
          <div className={classes.datePicker}>
            <BasicDateRangePicker />
            <br />
            <Button
              className={classes.btn}
              variant="contained"
              onClick={handleData}
            >
              SHOW DATA
            </Button>
          </div>
          {loadingData ? (
            <span>...LOADING DATA</span>
          ) : (
            <>
              { tableData.length > 0 && <TableData tableData={tableData} />}
              {pieData.length > 0 && <PieData pieData={pieData} />}
              { barData.length > 0 && <BarData barData={barData} />}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Dashboard;
