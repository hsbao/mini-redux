import React, { Component } from 'react'
import { bindActionCreators } from './redux'
import store from './store'

function add() {
  return { type: 'ADD' }
}
function minus() {
	return { type: 'MINUS' }
}
function add2() {
  return { type: 'ADD2' }
}
function minus2() {
	return { type: 'MINUS2' }
}
const actions = { add, minus, add2, minus2 }

const boundActions = bindActionCreators(actions, store.dispatch)
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 0,
      num2: 0,
    }
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        num: store.gettState().num1.num,
        num2: store.gettState().num2.num,
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleClickAdd = () => {
    boundActions.add()
  }

  handleClickMinus = () => {
    boundActions.minus()
  }

  render() {
    return (
      <div className="App">
        <p>{this.state.num}</p>
        <button onClick={() => boundActions.add()} style={{marginRight: '20px'}}>加1</button>
        <button onClick={() => boundActions.minus()}>减1</button>

        <p>{this.state.num2}</p>
        <button onClick={() => boundActions.add2()} style={{marginRight: '20px'}}>加1</button>
        <button onClick={() => boundActions.minus2()}>减1</button>
      </div>
    )
  }
}

export default App;
