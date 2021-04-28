pragma solidity ^0.5.0;

contract Market {
    string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;

    struct Product {
        uint id;
        string name;
        address payable owner;
        uint price;
        bool state;
    }

    event NewProduct (
        uint id,
        string name,
        address payable owner,
        uint price,
        bool state
    );

    event PurchasedProduct (
        uint id,
        string name,
        address payable owner,
        uint price,
        bool state
    );

    constructor() public {
        name = "G-Market";
    }

    function listProduct(string memory _name, uint _price) public {
        require(_price>0);
        require(bytes(_name).length>0);
        productCount++;
        products[productCount] = Product(productCount, _name, msg.sender, _price, false);
        emit NewProduct(productCount, _name, msg.sender, _price, false);
    }

    function buyProduct(uint _id) public payable {
        require(msg.value>0);
        Product memory _product = products[_id];
        address payable _seller = _product.owner;
        require(_seller != msg.sender);
        _product.owner = msg.sender;
        _product.state = true;
        products[_id] = _product;
        address(_seller).transfer(msg.value);
        emit PurchasedProduct(_id, _product.name, msg.sender, msg.value, true);
    }


}