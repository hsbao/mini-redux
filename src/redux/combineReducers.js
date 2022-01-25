/**
 * combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数
 * 然后就可以对这个 reducer 调用 createStore 方法
 * 
 * combineReducers() 返回的 state 对象，会将传入的每个 reducer 返回的 state 按其传递给 combineReducers() 时对应的 key 进行命名
 * @param {*} reducers 
 * @returns 
 */
function combineReducers(reducers) {
	return function (state = {}, action) {
		let nextState = {}
		for (let key in reducers) {
			nextState[key] = reducers[key](state[key], action)
		}
		return nextState
	}
}

export default combineReducers


/**
 * 示例：
 * rootReducer = combineReducers({ p: potatoReducer, t: tomatoReducer})
 * 
 * rootReducer 将返回如下的 state 对象
 * {
 *   p: {
 *     // ... potatoes, 和一些其他由 potatoReducer 管理的 state 对象 ... 
 *   },
 *   t: {
 *     // ... tomatoes, 和一些其他由 tomatoReducer 管理的 state 对象，比如说 sauce 属性 ...
 *   }
 * }
 * 
 * 取值：store.getState().p.xxx
 */