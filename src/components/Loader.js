import { makeStyles } from '@mui/styles';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles(() => ({
  loader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

function Loader({ text }) {
  const classes = useStyles();
  return (
    <div className={classes.loader}>
      <h3>{text}</h3>
      <CircularProgress disableShrink />
    </div>
  );
}

export default Loader;
