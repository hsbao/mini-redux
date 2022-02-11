import React, { Component } from 'react'

import Count from './components/Count'
// import { bindActionCreators } from './redux'
// import store from './store'
import { connect } from './react-redux'

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

// const boundActions = bindActionCreators(actions, store.dispatch)
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 0,
      num2: 0,
    }
  }

  // componentDidMount() {
  //   this.unsubscribe = store.subscribe(() => {
  //     this.setState({
  //       num: store.gettState().num1.num,
  //       num2: store.gettState().num2.num,
  //     })
  //   })
  // }

  // componentWillUnmount() {
  //   this.unsubscribe()
  // }

  render() {
    return (
      <div className="App">
        <Count name="Count" />
        <p>{this.props.num1.num}</p>
        <button onClick={() => this.props.add()} style={{marginRight: '20px'}}>加1</button>
        <button onClick={() => this.props.minus()}>减1</button>

        <p>{this.props.num2.num}</p>
        <button onClick={() => this.props.add2()} style={{marginRight: '20px'}}>加1</button>
        <button onClick={() => this.props.minus2()}>减1</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => state

// const mapDispatchToProps = (dispatch) => ({
//   add() {
//     dispatch({ type: 'ADD' })
//   }
// })
const mapDispatchToProps = actions

export default connect(mapStateToProps, mapDispatchToProps)(App)
