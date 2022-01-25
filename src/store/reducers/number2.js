let initialState = {
  num: 0,
}
function number2Reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD2':
      return { num: state.num + 1 }
    case 'MINUS2':
      return { num: state.num - 1 }
    default:
      return state
  }
}

export default number2Reducer
