import {
  FETCH_VALID_DATE_RANGE,
  LOGOUT,
  REDIRECT,
  SET_DASHBOARD_DATA,
  SET_DATE_RANGE,
  SET_LOADING_DATA,
  SET_LOADING_DATE
} from '../Actions/ActionTypes';

const initialState = {
  dateRange: [],
  minDate: null,
  maxDate: null,
  loadingDate: false,
  tableData: [],
  barData: [],
  pieData: [],
  loadingData: false,
  redirectTo: ''
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE_RANGE:
      return {
        ...state,
        dateRange: action.payload
      };
    case FETCH_VALID_DATE_RANGE:
      return {
        ...state,
        loadingDate: false,
        minDate: action.payload.startDate,
        maxDate: action.payload.endDate
      };
    case SET_LOADING_DATE:
      return {
        ...state,
        loadingDate: true
      };
    case SET_LOADING_DATA:
      return {
        ...state,
        loadingData: true
      };
    case SET_DASHBOARD_DATA:
      return {
        ...state,
        loadingData: false,
        tableData: action.payload[0].data.result.data,
        barData: action.payload[1].data.result.data,
        pieData: action.payload[2].data.result.data
      };
    case REDIRECT:
      return {
        ...state,
        redirectTo: action.payload
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default dashboardReducer;
