import React from 'react';

import Pricing from './containers/Pricing.js'
import axios from 'axios';
import Countdown from 'react-countdown-now'
import getWeb3 from './utils/getWeb3';
import contractAbi from "./contracts/abi";
import { trackPromise } from 'react-promise-tracker'

import './App.css';
import LoadingIndicator from './components/LoadingIndicator'

const CONTRACT_ADDRESS = '0x41B301c0b0AbbFEef99803c23A281712e29B6EF1'

/* global BigInt */

class App extends React.Component {

  constructor(props) {
    super(props)
    this.threeMinutesPass = this.threeMinutesPass.bind(this)
    this.renderer = this.renderer.bind(this)
    this.startChannel = this.startChannel.bind(this)
    this.signMicroPayment = this.signMicroPayment.bind(this)
    this.state = {
      connected: false,
      timeLeft: 0,
      depositAmount: 0,
      channelId: undefined,
      ephemeral: undefined,
      contract: undefined,
      web3: undefined,
      interval: undefined
    }
  }

  async signMicroPayment() {
    if(!this.state.channelId) {
      return
    }
    const elapsedTime = (Date.now() - this.state.start)/1000
    const ratio = Math.round(100.0 * elapsedTime/this.state.timeLeft)
    let amount = BigInt(ratio) * BigInt(this.state.depositAmount) / BigInt(100)
    if (BigInt(this.state.depositAmount) - BigInt(amount) < 0) {
      clearInterval(this.state.interval)
      console.log('Clearing micropayment interval, reached ' +
                  BigInt(this.state.depositAmount) / BigInt(1000000000000) + ' μETH')
      amount = this.state.depositAmount
    }
    console.log('Generating payment of ' + BigInt(amount) / BigInt(1000000000000) + ' μETH')
    console.log('channelId = ' + this.state.channelId)
    const hash = this.state.web3.utils.soliditySha3(
      { t: 'address', v: CONTRACT_ADDRESS },
      { t: 'uint256', v: amount.toString() },
      { t: 'uint256', v: this.state.channelId })
    console.log(this.state.ephemeral)
    const signature = await this.state.web3.eth.accounts.sign(hash, this.state.ephemeral.privateKey)
    console.log('Signature')
    console.log(signature)
    await axios.post('/api/payment', { signature: signature,
                                       address: CONTRACT_ADDRESS,
                                       amount: amount.toString(),
                                       channelId: this.state.channelId })
  }

  startChannel(receipt) {
    try {
      this.setState({ channelId: receipt.events.ChannelOpened.returnValues.channelId,
                      depositAmount: receipt.events.ChannelOpened.returnValues.depositAmount })
    } catch(error) {
      console.log(error)
    }
  }

  async threeMinutesPass() {
    const amount = '3000000000000000'
    // await axios.post('/api/mac', { "timeLeft": 60, "txId": null })
    console.log(this.state.contract)
    trackPromise(
      this.state.contract.methods.openChannel(this.state.ephemeral.address).send(
        { from: this.state.accounts[0], value: amount, gas: '1000000' }).then(
            this.setState({ connected: true, timeLeft: 600, start: Date.now() })
        ).catch(
          () => this.setState({ connected: false, timeLeft: 0, start: Date.now() }))).then(
            this.startChannel
          )
  }

  async componentDidMount() {
    const web3 = await getWeb3()
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(
      contractAbi,
      CONTRACT_ADDRESS
    )
    console.log(contract)
    let response = await axios.get('api/mac')
    const ephemeral = web3.eth.accounts.create()
    if (response.status === 204) {
      this.setState({ connected: false, timeLeft: 0, contract: contract, web3: web3, accounts: accounts, ephemeral: ephemeral })
    } else {
      let now = Date.now()
      let timeLeft = response.data.timeLeft - (now - response.data.now) / 1000
      this.setState({ connected: true, start: now, timeLeft: timeLeft, contract: contract,
                      web3: web3, accounts: accounts, ephemeral: ephemeral })
    }
    const interval = setInterval(() => this.signMicroPayment(), 10000)
    this.setState({ interval: interval })
  }

  renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
          <div className="App">
          <Pricing threeMinutesPass={this.threeMinutesPass}/>
          </div>
      )
    } else {
      return (
        <div>
          <LoadingIndicator hours={hours} minutes={minutes} seconds={seconds}/>
        </div>
      )
    }
  }

  render() {
    let pricingMenu = (
        <div className="App">
        <Pricing threeMinutesPass={ this.threeMinutesPass }/>
        </div>
    )
    if (!this.state.connected) {
      return pricingMenu
    }
    return (
        <Countdown date={ Date.now() + this.state.timeLeft * 1000 }
         renderer={ this.renderer }/>
    )
  }
}

export default App;
