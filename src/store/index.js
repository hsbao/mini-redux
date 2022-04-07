import { createStore, combineReducers } from '../redux'
import numberReducer from './reducers/number'
import number2Reducer from './reducers/number2'

const redecers = {
  num1: numberReducer,
  num2: number2Reducer,
}

const combineReducer = combineReducers(redecers)
const store = createStore(combineReducer) // { numberReducer: {num: 0}, number2Reducer: {num: 0} }

// redux 中间件的核心原理就是重写了dispatch方法，在原始的dispatch方法之前，或是之后加入了一些自定义的逻辑
// 如下：实现一个简版的redux-logger
// let dispatch = store.dispatch
// store.dispatch = function (action) {
//   console.log('prev state', store.getState())
//   dispatch(action)
//   console.log('next state', store.getState())
//   return action
// }

export default store
