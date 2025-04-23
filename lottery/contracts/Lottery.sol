// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

contract Lottery {

    address public manager;
    address[] public players;

    constructor() {  // public is not needed after 0.7
        manager = msg.sender;
    }

    function enter() public payable {
        // we use the "payable" tag whenever we want someone to send in some money or transfer eth
        
        // require function this takes in a bool argument
        require(msg.value > 0.01 ether);

        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.prevrandao, block.timestamp, players))); 
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;
        payable(players[index]).transfer(address(this).balance); // Changed this.balance to address(this).balance
        players = new address payable[](0);// Reset the players array
    }

    // these are custom modifiers that you can use
    // anywhere and on a contract to reduce
    // the amount of code that you have to write
    modifier restricted() {  
        require(msg.sender == manager);
        _; 
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}
