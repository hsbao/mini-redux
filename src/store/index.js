import { createStore, combineReducers } from '../redux'
import numberReducer from './reducers/number'
import number2Reducer from './reducers/number2'

const redecers = {
  num1: numberReducer,
  num2: number2Reducer
}

const combineReducer = combineReducers(redecers)
const store = createStore(combineReducer) // { numberReducer: {num: 0}, number2Reducer: {num: 0} }  
export default store