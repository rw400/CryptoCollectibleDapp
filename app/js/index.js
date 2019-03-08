const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const ethers = require('ethers');

// const redis = require('./redis.js');
// const Token = require("../../dist/contracts/Token.json")

//Declare Providers
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
console.log(provider);

//List Accounts
provider.listAccounts().then(function (result) {
    // console.log(result);
}, function (error) {
    console.log(error);
});

//Create a Wallet
let phrase = "example exile argue silk regular smile grass bomb merge arm assist farm";
let path = "m/44'/60'/0'/0/";

let firstWallet = ethers.Wallet.fromMnemonic(phrase).connect(provider);
let firstWalletAddress = firstWallet['address0'];
// let amount = ethers.utils.bigNumberify(firstWalletAddress);

let secondWallet = ethers.Wallet.fromMnemonic(phrase, path + "1");
let secondWalletAddress = secondWallet['address1'];

//Contract
// let abi = Token['abiDefinition'];
// let contractAddress = Token['deployedAddress'];

// dist/contracts/yourContractName.json
// const deployedContract = new ethers.Contract(contractAddress, abi, provider).connect(firstWallet)


// server.set('port, 3000');
server.set('port', process.env.PORT || 3000);
server.use(bodyParser.json());

server.get('/', function (request, response, next){

    // response.render('index', { title: 'Owner, token id' + request.params.id })

    response.json({
        'user': 'owner' + firstWalletAddress,
        'bigNumber': 'amount',
        'Token Amount': '0',
        'hash': '_dataBN',
        'hex value': 'colour'
    })

})

server.get('/User', function (request, response, next){
    
    // response.render('index', { title: 'Transfer User: ' + secondWalletAddress })

    response.json({
        'user': 'username',
        'tokenID' : 'hexValue',
        'tokenAmount' : 'amount'
    });
});

server.post('/update', function (request, response, next) {
    console.log(response.params.body);
});

server.listen(3000, () => {
    console.log("Server started")
});

module.exports = server;