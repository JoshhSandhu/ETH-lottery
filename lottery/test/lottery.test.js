const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());

const {abi , evm} = require("../compile");

let lottery;
let accounts;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  lottery = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,  
    })
    .send({ from: accounts[0], gas: '1000000' });
});

describe ("lottery contract", () =>{
    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('allows one person to enter', async ()=>{
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02','ether')
        });
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it('allows multiple people to enter', async ()=>{
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02','ether')
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02','ether')
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02','ether')
        });
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });

    it('broke bois cant enter the campaign', async () =>{
        try{
            await lottery.methods.enter().send({
                from:accounts[0],
                value: '200'
            })
            assert(false);
        }
        catch (err) {
            assert(err);
        }
    });

    it('only the OG can pick the winner', async ()=>{
        try{
            await lottery.methods.pickWinner().send({
                from:accounts[1]
            })
            assert(false);
        }
        catch(err){
            assert(err);
        }
    });

    it('tests the whole contract sends money and resets the array', async ()=>{
        await lottery.methods.enter().send({
            from : accounts[0],
            value : web3.utils.toWei('2', 'ether')
        })

        const initbalance = await web3.eth.getBalance(accounts[0]);

        await lottery.methods.pickWinner().send({
            from : accounts[0]
        })

        //test to verify that the pick winner function is running
        const finalbalance = await web3.eth.getBalance(accounts[0]);
        const diffbalance  = finalbalance - initbalance;
        console.log(finalbalance - initbalance);
        assert(diffbalance > web3.utils.toWei('1.8', 'ether'));

        //test to verify the players array has been reset
        const players = await lottery.methods.getPlayers().call();
        assert.strictEqual(players.length, 0);

        //test to verify that the balance has been reset to 0
        const contractbalance = await web3.eth.getBalance(lottery.options.address);
        assert.strictEqual(contractbalance.toString(), '0');
    })
});