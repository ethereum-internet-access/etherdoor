import React from 'react';

import { usePromiseTracker } from "react-promise-tracker"
import Typography from '@material-ui/core/Typography';
import Loader from 'react-loader-spinner';

import RemainingTime from './RemainingTime'

const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker()
  if (promiseInProgress) {
    return (
        <div className="App">
        <div style={{ width: "100%", height: "100", justifyContent: "center", alignItems: "center", display: "block" }}>
        <Typography variant="h6" color="inherit" noWrap align="center">
        Internet Access Token
        </Typography>
        <br/>
        <Typography variant="h4" align="center" style={{ display: "block" }}>
        Waiting for Ethereum transaction ...
        </Typography>
        <br/>
        <Loader id="Loader" type="ThreeDots" color="inherit" style={{ height: '100', width: '100' }} />
        </div>
        </div>)
  }
  return <RemainingTime hours={props.hours} minutes={props.minutes} seconds={props.seconds}/>
}

export default LoadingIndicator
