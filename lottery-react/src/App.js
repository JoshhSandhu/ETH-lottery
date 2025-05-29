import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {

  state = {
    manager: '',
    players: [],
    balance: '',
    value:'',
    message:''
  };
  
  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({manager, players, balance});
  }

 onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({message:'wating on transaction success...'});

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    })

    this.setState({message:'You have been entered in the pool'});
 };

 onClick = async (event) => {
  event.preventDefault();

  const accounts = await web3.eth.getAccounts();

  this.setState({message: 'picking the winner from the pool'});

  await lottery.methods.pickWinner().send({
    from: accounts[0]
  });

  this.setState({message: 'the winner has been picked!!!'});
 };


  render() {
    return (
      <div>
        <h2> lottery contract </h2>
        <p> this contract is managed by {this.state.manager} 
        </p>
        <p>there are currently {this.state.players.length} players competing
        </p>
        <p>to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>

        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>
            want to try your luck?
          </h4>
          <div> 
            <label>Amount of ether to enter</label>
            <input 
              value={this.state.value}
              onChange={event => this.setState({value: event.target.value})}           
            />
          </div>
          <div>
            <button>Enter</button>
          </div>
        </form>
        <hr />
        <h2>{this.state.message}</h2>
        <hr />
        <h4> Ready t o pick a winner? </h4>
        <button onClick={this.onClick}>Pick a Winner!</button>
        <hr />
      </div>
    );
  }
}
export default App;
