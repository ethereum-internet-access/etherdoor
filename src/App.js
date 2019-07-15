import React from 'react';
import './App.css';
import Pricing from './containers/Pricing.js'
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.freePass = this.freePass.bind(this)
  }

  async freePass() {
    let response = await axios.post('/api/mac', { "timeLeft": 300, "txId": null })
    console.log(response)
  }

  render() {
    return (
	<div className="App">
	<Pricing freePass={this.freePass}/>
	</div>
    );
  }
}

export default App;
