
/**
 * 创建store的方法，返回一个store（JS对象）
 * @param {*} reducer 处理器函数，根据旧的state和action来计算下一个最新的state
 * @returns 
 */
function createStore(reducer) {
  let state
  let listeners = []
  function getState() {
    return state
  }

  /**
	 * 修改state的唯一方法：调用dispatch
	 * @param {*} action 修改state的动作，是一个js对象，必须有type属性 { type: '@@REDUX/INIT' }
	 */
  function dispatch(action) {
    state = reducer(state, action)

		// state更新后，执行所有订阅的回调
		listeners.forEach(listener => listener())
  }

	/**
	 * 订阅
	 * @param {*} listener 回调，在dispatch修改state后，会调用传进来的回调函数
	 * @returns 返回取消订阅的方法，调用后就把当前的订阅删除
	 */
  function subscribe(listener) {
    listeners.push(listener)
		return () => { // 删除对应的订阅
			const index = listeners.indexOf(listener)
			listeners.splice(index, 1)
			// listeners = listeners.filter(l => l !== listener)
		}
  }

	dispatch({ type: '@@REDUX/INIT' }) // 源码里也是这样，初始化的时候会调用一下dispatch

  return {
    getState,
    dispatch,
    subscribe,
  }
}

export default createStore
