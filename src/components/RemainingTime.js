import React from 'react';
import Typography from '@material-ui/core/Typography';

const pad = (num, size) => {
  var s = '000000000' + num;
  return s.substr(s.length-size);
}

const RemainingTime = props => {
  return (
      <div className="App">
      <br/>
      <Typography variant="h6" color="inherit" noWrap align="center">
      Internet Access Token
      </Typography>
      <br/>
      <div>
      <Typography variant="h4" align="center">
      Remaining connection time ...
      </Typography>
      <br/>
      <Typography variant="h2" color="textSecondary" align="center">
      {pad(props.hours, 2)}:{pad(props.minutes, 2)}:{pad(props.seconds, 2)}
      </Typography>
      </div>
      </div>
  )
}

export default RemainingTime;
