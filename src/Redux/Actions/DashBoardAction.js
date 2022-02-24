import { displayError } from "../../helper";
import {
  FETCH_VALID_DATE_RANGE,
  LOGOUT,
  SET_DASHBOARD_DATA,
  SET_DATE_RANGE,
  SET_LOADING_DATA,
  SET_LOADING_DATE,
} from "./ActionTypes";
import CustomAxios from "./ApiService";
import { payloadTable, payloadBar, payloadPie } from "../payload";

export const setDateRange = (dates) => {
  return (dispatch) => {
    dispatch({ type: SET_DATE_RANGE, payload: dates });
  };
};

export const fetchValidDateRange = () => {
  return (dispatch) => {
    dispatch({ type: SET_LOADING_DATE });
    CustomAxios.post("/getDateRange", {
      organization: "DemoTest",
      view: "Auction",
    })
      .then((response) => {
        dispatch({
          type: FETCH_VALID_DATE_RANGE,
          payload: response.data.result,
        });
      })
      .catch((error) => {
        if (error?.response?.status == 401) {
          dispatch({ type: LOGOUT });
          dispatch({ type: "REDIRECT" , payload: "/"})
          displayError("Something Went Wrong! Login Again", "danger");
        } else {
          console.log("error", error);
        }
      });
  };
};

export const fetchDashboardData = (startDate, endDate) => {
  return (dispatch) => {
    dispatch({ type: SET_LOADING_DATA });
    let tablePayload = {
      ...payloadTable,
      chartObject: {
        ...payloadTable.chartObject,
        dateRange: {
          startDate,
          endDate,
        },
      },
    };
    let barPayload = {
      ...payloadBar,
      chartObject: {
        ...payloadBar.chartObject,
        dateRange: {
          startDate,
          endDate,
        },
      },
    };
    let piePayload = {
      ...payloadPie,
      chartObject: {
        ...payloadPie.chartObject,
        dateRange: {
          startDate,
          endDate,
        },
      },
    };
    let table = CustomAxios.post("/getData", tablePayload);
    let bar = CustomAxios.post("/getData", barPayload);
    let pie = CustomAxios.post("/getData", piePayload);
    Promise.all([table, bar, pie])
      .then((response) => {
        console.log("final Data", response);
        dispatch({ type: SET_DASHBOARD_DATA, payload: response });
      })
      .catch((error) => {
        if (error?.response?.status == 401) {
          dispatch({ type: LOGOUT });
          displayError("Something Went Wrong! Login Again", "danger");
        } else {
          console.log("error", error);
        }
      });
  };
};
