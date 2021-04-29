import React, { Component } from 'react';
import Web3 from 'web3'
import logo from '../logo.png';
import './App.css';

class App extends React.Component {

  componentDidMount = async () => {
    await this.loadWeb3()
    await this.loadBlockchain()
  }

   loadWeb3 = async () => {
    if (window.ethereum) { //check if Metamask is installed
          try {
              const address = await window.ethereum.enable(); //connect Metamask
              const obj = {
                      connectedStatus: true,
                      status: "",
                      address: address
                  }
                  return obj;
               
          } catch (error) {
              return {
                  connectedStatus: false,
                  status: "🦊 Connect to Metamask using the button on the top right."
              }
          }
          
    } else {
          return {
              connectedStatus: false,
              status: "🦊 You must install Metamask into your browser: https://metamask.io/download.html"
          }
        }
    } 
  

  loadBlockchain = async () => {
    //const web3 = window.web3
    //const account = await web3.eth.getAccounts()
    //console.log(account)
  }



  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dapp University
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <h1>Dapp University Starter Kit</h1>
                <p>
                  Edit <code>src/components/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LEARN BLOCKCHAIN <u><b>NOW! </b></u>
                </a>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
