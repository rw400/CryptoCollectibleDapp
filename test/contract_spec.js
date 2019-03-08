// /*global contract, config, it, assert*/

const Mint = require('Embark/contracts/Mint');

let accounts;

// For documentation please see https://embark.status.im/docs/contracts_testing.html
config({
  deployment: {
    host: "localhost", // Host of the blockchain node
    port: 8545, // Port of the blockchain node
    type: "rpc", // Type of connection (ws or rpc),
    accounts: [ {

    "mnemonic":"example exile argue silk regular smile grass bomb merge arm assist farm",
    "numAddresses" : 10 

    }
   ]
  },
  contracts: {
    "Mint": {
      args: [100]
    }
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts
});

contract("Mint", function () {
  this.timeout(0);

  it("should set constructor value", async function () {
    let result = await Mint.methods.storedData().call();
    assert.strictEqual(parseInt(result, 10), 100);
  });

  it("set storage value", async function () {
    await Mint.methods.set(150).send();
    let result = await Mint.methods.get().call();
    assert.strictEqual(parseInt(result, 10), 150);
  });

  it("should have account with balance", async function() {
    let balance = await web3.eth.getBalance(accounts[0]);
    assert.ok(parseInt(balance, 10) > 0);
  });
});