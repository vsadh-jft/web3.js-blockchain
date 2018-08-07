/**
 * UploadController
 *
 * @description :: Server-side logic for managing uploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    uploadFile: function (req, res) {
      console.log("upload file........");
    if(typeof web3 !== 'undefined'){
      // Use injected web3
      web3js = new Web3(web3.currentProvider);
    } else {
      /* Fallback to local node or remote node
         by default local HTTP-RPC server exposes port 8545.
         you can use Infura Node Urls also
         'https://ropsten.infura.io/<API KEy>'*/

      web3js = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    }

    web3.eth.defaultAccount = web3.eth.accounts[0];
    var contractInfo = JSON.parse('{"contract_name": "FileDetail","abi":[{"constant":false,"inputs":[{"name":"fName","type":"string"},{"name":"fileHash","type":"string"}],"name":"setFile","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getFile","outputs":[{"name":"fileName","type":"string"},{"name":"fileHash","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]  }');
    var CoursetroContract = web3.eth.contract(contractInfo.abi)
    var Coursetro = CoursetroContract.at('0x5c21d6021aaee409901461ad2230db16b663182b');
    var fileName = "vivek.pdf";

    Coursetro.setFile(fileName,"test hash",function(error, result){
      if(!error)
      {
        console.log("Transaction submitted");
      }
      else{
        console.log("Error");
      }
    });
  },

  listenEvent: function (req, res) {
      /* Fallback to local node or remote node
         by default local HTTP-RPC server exposes port 8545.
         you can use Infura Node Urls also
         'https://ropsten.infura.io/<API KEy>'*/

      web3js = new Web3(new Web3.providers.HttpProvider('wss://127.0.0.1:8545/ws'));
    web3.eth.defaultAccount = web3.eth.accounts[0];
    var contractInfo = JSON.parse('{"contract_name": "FileDetail","abi":[{"constant":false,"inputs":[{"name":"fName","type":"string"},{"name":"fileHash","type":"string"}],"name":"setFile","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getFile","outputs":[{"name":"fileName","type":"string"},{"name":"fileHash","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]  }');
    var CoursetroContract = web3.eth.contract(contractInfo.abi)
    var Coursetro = CoursetroContract.at('0x5c21d6021aaee409901461ad2230db16b663182b');

  },
};

