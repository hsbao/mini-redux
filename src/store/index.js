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
let thunkwithExtraArgument= thunk.withExtraArgument({number: 5})
const combineReducer = combineReducers(redecers)
// const store = createStore(combineReducer) // { numberReducer: {num: 0}, number2Reducer: {num: 0} }
const store = applyMiddleware(thunkwithExtraArgument, promise, logger)(createStore)(combineReducer);
export default store