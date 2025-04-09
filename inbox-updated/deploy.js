const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { interface , bytecode } = require('./compile');
//updated web3 and hdwallet-provider imports added for convenience

const provider = new HDWalletProvider(
    "path bronze virus spice alter liquid float own chef oppose party meat",
    "https://sepolia.infura.io/v3/a783691c9e0449b697d5236a80763666"
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('attempting to deploy accounts' , accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data:bytecode, arguments: ["hi there!"]})
    .send({ gas : "1000000" , from : accounts[0]});

    console.log("contract deployed to", result.options.address);
    provider.engine.stop();
};
deploy();
//the hd wallet provider helps us unlock an account that we want to use in our project
//path bronze virus spice alter liquid float own chef oppose party meat
// deploy code will go here
