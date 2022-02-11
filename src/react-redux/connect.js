import React, { useContext, useLayoutEffect, useReducer } from 'react'
import { bindActionCreators } from '../redux'
import ReactReduxContext from './ReactReduxContext'

/**
 * 基于HOC来实现
 * 使用：connect(mapStateToProps, mapDispatchToProps)(OldComponent)
 * @param {*} mapStateToProps (state) => state.num1，把redux仓库中的状态映射为当前组件的属性
 * @param {*} mapDispatchToProps 把派发动作的方法映射为当前组件的属性  dispatch --> props
 * @returns 
 */
function connect(mapStateToProps, mapDispatchToProps) { // 函数组件的实现
	return function(OldComponent) {
		return function(props) {
			const value = useContext(ReactReduxContext) // useContext接收一个ReactContext，会返回Provider接收的value
			const { getState, dispatch, subscribe } = value.store
			const prevState = getState()

			// 1. 拿到仓库中的状态
			const stateProps = mapStateToProps(prevState)

			// 2. 获取派发动作的方法，也就是处理dispatch
			let dispatchProps
			if (typeof mapDispatchToProps === 'function') {
				dispatchProps = mapDispatchToProps(dispatch)
			} else if (typeof mapDispatchToProps === 'object') {
				dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
			} else {
				dispatchProps = { dispatch }
			}

			// 4. 监听数据变化，刷新组件
			const [, forceUpdate] = useReducer(x => x + 1, 0)
			useLayoutEffect(() => {
				return subscribe(forceUpdate)
			}, [subscribe])

			// 3. 映射为组件的属性
			return <OldComponent {...props} {...stateProps} {...dispatchProps} />
		}
	}
}

export default connect