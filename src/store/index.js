import { createStore, combineReducers, applyMiddleware } from '../redux'
import numberReducer from './reducers/number'
import number2Reducer from './reducers/number2'

import logger from '../middlewares/redux-logger'
import thunk from '../middlewares/redux-thunk'
import promise from '../middlewares/redux-promise'

const redecers = {
  num1: numberReducer,
  num2: number2Reducer
}
let thunkwithExtraArgument = thunk.withExtraArgument({ number: 5 })
const combineReducer = combineReducers(redecers)
// const store = createStore(combineReducer) // { numberReducer: {num: 0}, number2Reducer: {num: 0} }

// redux 中间件的核心原理就是重写了dispatch方法，在原始的dispatch方法之前，或是之后加入了一些自定义的逻辑
// 如下：实现一个简版的redux-logger
// let dispatch = store.dispatch
// store.dispatch = function (action) {
//   console.log('prev state', store.getState())
//   dispatch(action)
//   console.log('next state', store.getState())
//   return action
// }

// const store = createStore(combineReducer) // { numberReducer: {num: 0}, number2Reducer: {num: 0} }
const store = applyMiddleware(
  thunkwithExtraArgument,
  promise,
  logger
)(createStore)(combineReducer)
export default store
