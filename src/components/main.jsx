import React from 'react'
import Web3 from 'web3'
import './App.css'

const Main = ({createProduct, products, buyProduct}) => {

    const web3 = new Web3(window.ethereum)
    let productName, productPrice
    
    return (
        <div id= 'content' className ='conten-align-center'>
                <h1>Welcome to Block Market</h1>
                <h3>Add the product you want to sell</h3>
                <form onSubmit = {e => {
                    e.preventDefault()
                    const web3 = new Web3(window.ethereum);
                    const name = productName.value
                    const price = web3.utils.toWei(productPrice.value.toString(), 'Ether')
                    createProduct(name, price)
                    }}>
                    <div className="form-group mr-sm-2">
                        <input 
                            id = "productName"
                            type="text" 
                            ref = {(input) => {productName = input}}
                            className="form-control" 
                            placeholder="Product name"
                            required/>
                    </div>
                    <div className="form-group mr-sm-2">
                        <input 
                            id="productPrice" 
                            type="text" 
                            ref = {(input) => {productPrice = input}}
                            className="form-control" 
                            placeholder="Product price"
                            required/>
                    </div >
                    <button type= 'submit' className="btn btn-primary">Add</button>
                </form>
                <h3>Buy products</h3>
                <table className= 'table'>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Owner</th>
                            <th scope="col">Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, key) => {
                            return (
                                <tr key ={key}>
                                    <th scope="col">{product.id.toString()}</th>
                                    <th scope="col">{product.name}</th>
                                    <th scope="col">{web3.utils.fromWei(product.price.toString(), 'ether') + ' ETH'}</th>
                                    <th scope="col">{product.owner}</th>
                                    <th scope="col">
                                        <button className ='btn btn-success'
                                        onClick = {e => {
                                            const id = product.id
                                            const price = product.price.toString()
                                            buyProduct(id, price)}}>
                                            Buy
                                        </button>
                                        </th>
                                </tr>
                            )})}
                    </tbody>
                </table>

        </div>
    )

}


export default Main