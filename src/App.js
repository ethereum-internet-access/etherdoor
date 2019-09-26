import React from 'react';
import './App.css';
import Pricing from './containers/Pricing.js'
import axios from 'axios';
import Countdown from 'react-countdown-now'
import Typography from '@material-ui/core/Typography';
import getWeb3 from './utils/getWeb3';
import contractAbi from "./contracts/abi";

const CONTRACT_ADDRESS = '0x41B301c0b0AbbFEef99803c23A281712e29B6EF1'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.freePass = this.freePass.bind(this)
    this.renderer = this.renderer.bind(this)
    this.pad = this.pad.bind(this)
    this.ephemeralKeyPair = undefined
    this.web3 = undefined
    this.contract = undefined
    this.ephemeral_key = undefined
    this.state = {
      connected: false,
      timeLeft: 0
    }
  }

  async freePass() {
    // let response = await axios.post('/api/mac', { "timeLeft": 7200, "txId": null })
    const amount = '3000000000000000'
    const receipt = await this.state.contract.methods.openChannel(this.state.ephemeral.address).send(
      { from: this.state.accounts[0], value: amount, gas: '1000000' })
    console.log(receipt)
    this.setState({ connected: true, timeLeft: 7200, start: Date.now() })
    console.log(this.state.ephemeral)
  }

  pad(num, size) {
    var s = '000000000' + num;
    return s.substr(s.length-size);
  }

  async componentDidMount() {
    const web3 = await getWeb3()
    const accounts = await web3.eth.getAccounts();
    console.log(CONTRACT_ADDRESS)
    const contract = new web3.eth.Contract(
      contractAbi,
      CONTRACT_ADDRESS
    )
    let response = await axios.get('api/mac')
    const ephemeral = web3.eth.accounts.create()
    console.log(ephemeral)
    if (response.status === 204) {
      this.setState({ connected: false, timeLeft: 0, contract: contract, web3: web3, accounts: accounts, ephemeral: ephemeral })
    } else {
      let now = Date.now()
      let timeLeft = response.data.timeLeft - (now - response.data.now) / 1000
      this.setState({ connected: true, start: now, timeLeft: timeLeft, contract: contract,
                      web3: web3, accounts: accounts, ephemeral: ephemeral })
    }
  }

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
    return (
        <Countdown date={ Date.now() + (this.state.timeLeft - 10) * 1000 }
         renderer={ this.renderer }/>
    )
  }
}

export default App;
