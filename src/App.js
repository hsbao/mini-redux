import React from 'react'
import store from './store'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 0
    }
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({ num: store.gettState().num })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleClickAdd = () => {
    store.dispatch({type: 'ADD'})
  }

  handleClickMins = () => {
    store.dispatch({type: 'MINUS'})
  }

  render() {
    return (
      <div className="App">
        <p>{this.state.num}</p>
        <button onClick={this.handleClickAdd} style={{marginRight: '20px'}}>加1</button>
        <button onClick={this.handleClickMins}>减1</button>
      </div>
    )
  }
}

export default App;
