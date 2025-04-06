const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());
const assert = require('assert');
const { interface , bytecode } = require('../compile');
// updated ganache and web3 imports added for convenience

// contract test code will go here
// class Car {
//     stop(){
//         return "stopped";
//     }
//     drive(){
//         return "zoooom";
//     }
// }
const message1 = "hi there!";
let accounts;
let inbox;

beforeEach(async ()=>{
    //get a list of all the accounts

    accounts = await web3.eth.getAccounts();  //await can only be used with async functions
    
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: [message1]})
    .send({from: accounts[0], gas:'1000000'});

    // .then(fetchedAccounts => {
    //     console.log(fetchedAccounts);
    // })
    //every function that we call using web3 is ascync in nature
    //use the list to deploy those contracts
});

describe('Inbox', ()=> {
    it('deploys a contract', () =>{
        console.log(inbox);
        assert.ok(inbox.options.address);
    });

    it("has a defalut menssage", async () =>{
        const message = await inbox.methods.message().call();
        assert.equal(message, "hi there");
    });

    it("can change the message", async () =>{
        await inbox.methods.setMessage("bye").send({ from: accounts[0]}); 
        const message = await inbox.methods.message().call();
        assert.equal(message, "bye"); 
    });
});