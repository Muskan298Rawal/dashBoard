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
          dispatch({ type: "REDIRECT", payload: "/" });
          displayError("Something Went Wrong! Login Again", "danger");
        } else {
          console.log("error", error);
        }
      });
  };
};

export const fetchDashboardData = (startDate, endDate) => {
  return (dispatch) => {
    let dateRange = {
      startDate,
      endDate,
    };
    dispatch({ type: SET_LOADING_DATA });
    let tablePayload = {
      ...payloadTable,
      chartObject: {
        ...payloadTable.chartObject,
        requestParam: {
          ...payloadTable.chartObject.requestParam,
          dateRange,
        },
      },
    };
    let barPayload = {
      ...payloadBar,
      chartObject: {
        ...payloadBar.chartObject,
        requestParam: {
          ...payloadBar.chartObject.requestParam,
          dateRange,
        },
      },
    };
    let piePayload = {
      ...payloadPie,
      chartObject: {
        ...payloadPie.chartObject,
        requestParam: {
          ...payloadPie.chartObject.requestParam,
          dateRange,
        },
      },
    };
    let table = CustomAxios.post("/getData", tablePayload);
    let bar = CustomAxios.post("/getData", barPayload);
    let pie = CustomAxios.post("/getData", piePayload);
    Promise.all([table, bar, pie])
      .then((response) => {
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
