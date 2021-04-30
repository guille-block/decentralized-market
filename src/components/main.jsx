import React from 'react'
import Web3 from 'web3'

const Main = ({createProduct}) => {

    let productName, productPrice
    
    return (
        <div id= 'content'>
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

        </div>
    )

}


export default Main