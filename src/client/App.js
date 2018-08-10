import React, { Component } from 'react';
import fetch from 'node-fetch';

export default class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const body = await fetch('/api/generate/team')
      .then(res => {
        console.log('our res', res);
        return res.json();
      })
      .then(data => {
        console.log('DATA', data);
      });
    // console.log('waht is our response', response);
    // const body = await response.body;
    // console.log('waht is body', body);

    // if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    console.log(this.state.response);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {/* <p className="App-intro">{this.state.response}</p> */}
      </div>
    );
  }
}
