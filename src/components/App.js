import React, { Component } from 'react';
import Web3 from 'web3'
import Market from '../abis/Market.json'
import './App.css';
import Nav from './nav'
import Main from './main'


class App extends React.Component {

  componentDidMount = async () => {
    await this.loadBlockchain()
  }

  loadBlockchain = async () => {
     if(typeof window.ethereum !== 'undefined') {
          const web3 = new Web3(window.ethereum);
          window.ethereum.enable()
          const netId = await web3.eth.net.getId()
          console.log(netId)
          const account = await web3.eth.getAccounts()
          this.setState({account: account[0]})
          console.log(account[0])
          if(Market.networks[netId]) {
            const market = await web3.eth.Contract(Market.abi, Market.networks[netId].address)
            this.setState({market})
            const count = await market.methods.productCount().call()
            this.setState({productCount: count.toNumber()})
            console.log(this.state.productCount)
            for(var i=0; i<=count; i++){
              const product = await market.methods.products(i).call()
              this.setState({products: [...this.state.products,product]})
              console.log(this.state.products)
            }
          } else {
            alert('connect to a different Blockchain')
          }
          
          this.setState({loading: false})
      } else {
        window.alert('Please install metamask :)')
      }
}

constructor(props){
  super(props) 
    this.state = {
      account: '',
      loading: true,
      productCount: 0,
      products: ''
    }
}



createProduct = (name, price) => {
  //this.setState({loading: false})
  this.state.market.methods.listProduct(name, price).send({from: this.state.account })
  //.once('receipt', (receipt) => {
  //  this.setState({loading: true})
  //})
}

buyProduct = (id, price) => {
  this.state.market.methods.buyProduct(id).send({from: this.state.account, value: price})
  //.then('receipt', function(receipt){
  //  // receipt example
  //  console.log(receipt)
  //})
}




  render() {
    return (
      <div>
        <Nav account = {this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              {
                this.state.loading 
                ? <div id = "loader"><p>Loading....</p></div> 
                : <Main 
                  createProduct = {this.createProduct}
                  products ={this.state.products}
                  buyProduct={this.buyProduct}/>
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
