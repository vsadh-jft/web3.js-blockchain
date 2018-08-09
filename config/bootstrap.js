/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

//  web3js = new Web3(new Web3.providers.HttpProvider('wss://127.0.0.1:8545/ws'));
  web3.eth.defaultAccount = web3.eth.accounts[0];
  var contractInfo = JSON.parse('{"contract_name": "FileDetail","abi":[{"constant":false,"inputs":[{"name":"uuid","type":"string"},{"name":"fName","type":"string"},{"name":"fileHash","type":"string"}],"name":"setFile","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"fileName","type":"string"},{"indexed":false,"name":"fileHash","type":"string"}],"name":"Uploaded","type":"event"},{"constant":true,"inputs":[{"name":"uuid","type":"string"}],"name":"getFile","outputs":[{"name":"fileName","type":"string"},{"name":"fileHash","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]  }');
  var CoursetroContract = web3.eth.contract(contractInfo.abi)
  var Coursetro = CoursetroContract.at('0x3958c21a7037d4a53c2990834c59ca3dcb00d988');

  var event = Coursetro.Uploaded();
  event.watch((err, res) => {
    console.log(res); // event response
    console.log("event response.."); // event response
    // Do something on event;
  });



  cb();
};
