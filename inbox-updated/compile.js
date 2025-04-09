// compile code will go here

const path = require("path");
const fs = require("fs");
const solc = require("solc");
//const { interface , bytecode } = require('../compile');

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

console.log("Script is running...");
//console.log(solc.compile(source, 1));

const output = solc.compile(source, 1); 
module.exports = solc.compile(source, 1).contracts[':Inbox']
console.log(output);
  