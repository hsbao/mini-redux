import { createStore } from '../redux'

let initialState = {
  num: 0,
}
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD':
      return { num: state.num + 1 }
    case 'MINUS':
      return { num: state.num - 1 }
    default:
      return state
  }
}

const store = createStore(reducer)
export default store