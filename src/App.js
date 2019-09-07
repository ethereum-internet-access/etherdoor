import React from 'react';
import './App.css';
import Pricing from './containers/Pricing.js'
import axios from 'axios';
import Countdown from 'react-countdown-now'
import Typography from '@material-ui/core/Typography';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.freePass = this.freePass.bind(this)
    this.renderer = this.renderer.bind(this)
    this.pad = this.pad.bind(this)
    this.state = {
      connected: false,
      timeLeft: 0
    }
  }

  async freePass() {
    // let response = await axios.post('/api/mac', { "timeLeft": 300, "txId": null })
    console.log(axios)
    this.setState({ connected: true, timeLeft: 30, start: Date.now() })
    // console.log(response)
  }

  pad(num, size) {
    var s = '000000000' + num;
    return s.substr(s.length-size);
  }

  // TODO: componentDidMount handling connection state

  renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
          <div className="App">
          <Pricing freePass={this.freePass}/>
          </div>
      )
    } else {
      return (
          <div className="App">
          <br/>
          <Typography variant="h6" color="inherit" noWrap align="center">
          Internet Access Token
          </Typography>
          <br/>
          <Typography variant="h4" align="center">
          Remaining connection time ...
          </Typography>
          <br/>
          <Typography variant="h2" color="textSecondary" align="center">
          { this.pad(hours, 2)}:{this.pad(minutes, 2)}:{this.pad(seconds, 2) }
          </Typography>
          </div>
      )
    }
  }

  render() {
    let pricingMenu = (
        <div className="App">
        <Pricing freePass={ this.freePass }/>
        </div>
    )
    if (!this.state.connected) {
      return pricingMenu
    }
    console.log('Returning!')
    console.log(this.state.timeLeft)
    return (
        <Countdown date={ Date.now() + this.state.timeLeft * 1000 }
         renderer={ this.renderer }/>
    )
  }
}

export default App;
