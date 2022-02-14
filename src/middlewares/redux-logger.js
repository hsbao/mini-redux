/**
 * redux中间件的固定写法
 * @param {*} middlewareApi { getState, dispatch }，这里的dispatch是改造后的
 * @returns
 */
function logger(middlewareApi) {
	const { getState } = middlewareApi
	return function (next) { // 为了实现中间件的级联，next表示下一个中间件
		return function (action) { //这里的是改造后的dispatch
      console.log('logger')
			console.log('老状态1', getState())
			next(action)
			console.log('新状态1', getState())
		}
	}
}

export default logger
