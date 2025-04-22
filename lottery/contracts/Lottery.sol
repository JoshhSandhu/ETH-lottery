pragma solidity >=0.5.0 <0.9.0;

contract Lottery {

    address public manager;
    address[] public players;
    constructor () public{
        manager = msg.sender;
    }

    function enter() public payable {
        //we use the "payable" tag whenever we want someone to send in some money or transfer eth
        
        //require function this takes in a bool argument
        require(msg.value > 0.01 ether);

        players.push(msg.sender);
    }

    function random() private view returns (uint){
        return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public restricted{
        

        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[] (0);
    }


    //these are custom modifyiers that you can use 
    //anywhere and on a contract to reduce 
    //the amount of code that u have to write
    modifier restricted() {  
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[]){
        return players;
    }

}