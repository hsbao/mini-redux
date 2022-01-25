let initialState = {
  num: 0,
}
function numberReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD':
      return { num: state.num + 1 }
    case 'MINUS':
      return { num: state.num - 1 }
    default:
      return state
  }
}

export default numberReducer
