function compose(...funcs) {
	return function (...args) {
    console.log('compose', args)
		let result
		let i = funcs.length - 1
		while (i >= 0) {
			let func = funcs[i]
			result = func(i == funcs.length - 1 ? args : result)
      console.log(result)
			i--
		}
		return result
	}
}
//let result = compose(add1, add2, add3)('str');
//console.log(result);// 123str
function compose1(...funcs) {
	return funcs.reduce(
		(a, b) =>
			(...args) =>
				a(b(...args))
	)
}

export default compose