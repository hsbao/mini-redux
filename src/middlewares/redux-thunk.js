function createThunkMiddleware(args) {
  return function({ dispatch, getState }) {
    return function(next) {
      return function(action) {
        console.log('thunk')
        if(typeof action === 'function'){
          return action(dispatch, getState, args)
        } else {
          next(action)
        }
      }
    }
  }
}
const thunk = createThunkMiddleware()
thunk.withExtraArgument = createThunkMiddleware
export default thunk