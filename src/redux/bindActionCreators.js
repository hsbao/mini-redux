/**
 * 传入一个老的actionCreator，返回一个新的函数
 * @param {*} actionCreator 
 * @param {*} dispatch 
 */
function bindActionCreator(actionCreator, dispatch) {
	return function (...args) {
		const action = actionCreator.apply(this, args)
		return dispatch(action)
	}
}

/**
 * @param {*} actionCreators action的创建者对象
 * @param {*} dispatch 派发action的方法
 * 
 */
function bindActionCreators(actionCreators, dispatch) {
  const boundActionCreators = {}
	for (let key in actionCreators) {
		const actionCreator = actionCreators[key]
		if (typeof actionCreator === 'function') {
			boundActionCreators[key] = bindActionCreator(actionCreator, dispatch) // 会返回一个函数，调用的时候会生成action，并调动dispatch
		}
	}
	return boundActionCreators
}

export default bindActionCreators

/**
 * 使用：
 * 
 * function add() {
 *   return { type: 'ADD' }
 * }
 * function minus() {
 * 	 return { type: 'MINUS' }
 * }
 * const actions = { add, minus }
 * const boundActions = bindActionCreators(actions, dispatch)
 * 
 * boundActions ---> {
 * 	add: fn,
 *  minus: fn
 * }
 * 
 * boundActions.add() 就会自动生成action，并调用dispatch方法派发action，从而修改state
 */
