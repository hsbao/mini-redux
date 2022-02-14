function isPromise(obj) {
	return (
		!!obj &&
		(typeof obj == 'object' || typeof obj == 'function') &&
		typeof obj.then == 'function'
	)
}

/**
 * @param {*} middlewareApi { getState, dispatch }，这里的dispatch是修改过后的
 * @returns
 */
export default function (middlewareApi) {
  const { dispatch } = middlewareApi
	return (next) => (action) => {
    console.log('promise')
		return isPromise(action.payload)
			? action.payload
					.then((result) => {
						dispatch({ ...action, payload: result })
					})
					.catch((error) => {
						dispatch({ ...action, payload: error, error: true })
						return Promise.reject(error)
					})
			: next(action)
	}
}
