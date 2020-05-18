import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import TodoForm from './TodoForm';
import Web3 from 'web3';
import './App.css';
import Tasks from '../abis/Tasks.json'
import TextField from '@material-ui/core/TextField';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Todo from './todo';
import Checkbox from '@material-ui/core/Checkbox';
class App extends Component {
  async componentWillMount() {
    //await this.loadWeb3()
    //await this.loadBlockchainData()
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await new web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await new web3.eth.net.getId()
    const networkData = Tasks.networks[networkId]
    if (networkData) {
      const contract = new web3.eth.Contract(Tasks.abi, networkData.address)
      this.setState({ contract })
      const _task = await this.state.contract.methods.getTasks().call()
      this.setState({
        posts: [...this.state.tasks, _task]
      })
      console.log('tasks array', this.state.tasks)

    }
    else {
      window.alert('Smart contract not deployed to detected network.')
    }
    console.log('current logged in account ', this.state.account)
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: '',
      list: [],
      newItem: ""
    }
  }

  addItem(todoValue) {
    if (todoValue != "") {
      const newItem = {
        id: Date.now(),
        value: todoValue,
        isDone: false
      };
      const list = [...this.state.list]
      list.push(newItem)

      this.setState({
        list: list,
        newItem: ""
      })

    }
  }

  deleteItem(id) {
    const list = [...this.state.list]
    const updatedlist = list.filter(item => item.id !== id);
    this.setState({ list: updatedlist })
  }

  updateInput(input) {
    this.setState({ newItem: input })
  }

  handleChange(inputID) {
    const list = [...this.state.list]

  }
  render() {
    return (

      <div>
        <div className="hero is-info">
          <div className="hero-body has-text-centered">
            <p className="title is-1">Todos</p>
          </div>
        </div>


        <div className="has-text-centered">

          <form className="form">
            <TextField
              className="textField"
              id="outlined-basic" label="Insert Task" variant="outlined"
              onChange={e => this.updateInput(e.target.value)}
              value={this.state.newItem} />

            <button className="button is-black add-button"
              disabled={!this.state.newItem.length}

              onClick={() => {
                console.log("Submit button pressed")
                this.addItem(this.state.newItem)

                console.log('new Item', this.state.newItem)

                // this.state.contract.methods.updateArray().send({ from: this.state.account }).then((r) => {
                //   return this.setState({
                //     inputTask: ''
                //   })
                // })
              }
              }
            > ADD  </button>
          </form>

          <div className="todo-container">
            <ul>
              <li>
                {this.state.list.map(item => {
                  return (
                    <div key={item.id} className="section">
                      <Checkbox
                        onChange={this.handleChange(item.id)}
                        checked={item.id.isDone}
                        type="checkbox" name="isDone"
                      />
                      <p>{item.value}</p>
                      {/* <button className="button is-danger has-text-weight-bold delete-button" onClick={() => this.deleteItem(item.id)}>Delete</button> */}
                      <div className="delButton">
                        <IconButton aria-label="delete" className="" onClick={() => { this.deleteItem(item.id) }}>
                          <DeleteIcon fontSize="large" />
                        </IconButton>
                      </div>
                    </div>
                  )
                })}
              </li>
            </ul>
          </div>  {/* top conatiner */}
        </div> {/*center text*/}
      </div>

    );
  }
}

export default App;
