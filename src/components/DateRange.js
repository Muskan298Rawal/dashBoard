import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { setDateRange } from '../Redux/Actions/DashBoardAction';

export default function BasicDateRangePicker() {
  const [value, setValue] = React.useState([null, null]);

  const { minDate, maxDate } = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (minDate) {
      setValue([new Date(parseInt(minDate)), new Date(parseInt(maxDate))]);
    }
  }, [minDate]);

  const handleChange = (newValue) => {
    console.log('range', newValue);
    if (newValue[0] === null && newValue[1] === null) {
      setValue([new Date(parseInt(minDate)), new Date(parseInt(maxDate))]);
      dispatch(setDateRange([new Date(parseInt(minDate)), new Date(parseInt(maxDate))]));
    } else {
      setValue(newValue);
      dispatch(setDateRange(newValue));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Start-date"
        endText="End-date"
        value={value}
        minDate={new Date(parseInt(minDate))}
        maxDate={new Date(parseInt(maxDate))}
        onChange={(newValue) => handleChange(newValue)}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </>
        )}
      />
    </LocalizationProvider>
  );
}
