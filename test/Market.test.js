const { assert } = require("chai")

const Market = artifacts.require('./Market.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Market', ([deployer, seller, buyer]) => {
    let market 

    before(async () => {
        market = await Market.deployed()
    })

    describe('deployment', async () => {
        it('deploys succesfully', async () => {
            const address = await market.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('Has a name', async () => {
            const name = await market.name()
            assert.equal(name, 'G-Market')
        })
    })

    describe('Products', async () => {
        let count, productNew
        let result

        before(async () => {

            productNew = await market.listProduct('Nokia 1100', web3.utils.toWei('1', 'Ether'), {from: seller})
            count = await market.productCount()
            result = productNew.logs[0].args
        })

        it('Product count Okay', async () => {
            assert.equal(count, 1)
            assert.equal(result.id.toNumber(), count)
        })

        it('Name product', async () => {
            assert.equal(result.name, 'Nokia 1100')
        })

        it('Seller product', async () => {
            assert.equal(result.owner, seller)
        })

        it('Price product', async () => {
            assert.equal(result.price, web3.utils.toWei('1', 'Ether'))
        })

        it('State product', async () => {
            assert.equal(result.state, false)
        })

        it('Product must have a name', async () => {
            assert.equal(result.state, false)
        })

        it('Price must be positive', async () => {
            await market.listProduct('Nokia 1100', web3.utils.toWei('0', 'Ether')).should.be.rejected
        })

        it('Name should exist', async () => {
        await market.listProduct('', web3.utils.toWei('1', 'Ether')).should.be.rejected
        })

    })

    describe('Buying a product', async () => {

        let count, productNew, result

        before(async () => {

            productNew = await market.listProduct('Nokia 1100', web3.utils.toWei('1', 'Ether'), {from: seller})
            count = await market.productCount()
            result = productNew.logs[0].args
        })

        it('Msg sender must not be seller', async () => {
            await market.buyProduct(1, {from: seller, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected
        })

        it('Msg value must be positive', async () => {
            await market.buyProduct(1, {from: buyer, value: web3.utils.toWei('0', 'Ether')}).should.be.rejected
        })

        it('Correct balances', async () => {
            let bought

            let oldBalance = await web3.eth.getBalance(seller)
            oldBalance = new web3.utils.BN(oldBalance)

            bought = await market.buyProduct(1, {from: buyer, value: web3.utils.toWei('1', 'Ether')})
            let newBalance = await web3.eth.getBalance(seller)
            newBalance = new web3.utils.BN(newBalance)
           const price = bought.logs[0].args.price
           assert.equal(price, web3.utils.toWei('1', 'Ether') , 'They are not equal')
            console.log(price.toString())
        })    
    })
})