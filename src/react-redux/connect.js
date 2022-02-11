import React, { useContext, useLayoutEffect, useReducer, useMemo } from 'react'
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
			const stateProps = useMemo(() => mapStateToProps(prevState), [prevState]) // 使用useMemo优化，prevState不变就不重新刷新

			// 2. 获取派发动作的方法，也就是处理dispatch
			const dispatchProps = useMemo(() => {
				let dispatchProps
				if (typeof mapDispatchToProps === 'function') {
					dispatchProps = mapDispatchToProps(dispatch)
				} else if (typeof mapDispatchToProps === 'object') {
					dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
				} else {
					dispatchProps = { dispatch }
				}
				return dispatchProps
			}, [dispatch])

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

// connect 另一种实现
function connect1(mapStateToProps, mapDispatchToProps) {
	return function(OldComponent) {
		return class extends React.Component {
			static contextType = ReactReduxContext

			// 以下逻辑放在constructor是因为值只需要计算一次就可以了，防止在组件刷新的时候多次执行
			constructor(props, context) {
				super(props)
				const { store } = context
				const { getState, subscribe, dispatch } = store

				// 1. 拿到仓库中的状态
				this.state = mapStateToProps(getState())

				// 4. 监听数据变化，刷新组件
				this.unsubscribe = subscribe(() => {
					const prevState = getState()
					this.setState(mapStateToProps(prevState))
				})

				// 2. 获取派发动作的方法，也就是处理dispatch
				let dispatchProps
				if (typeof mapDispatchToProps === 'function') {
					dispatchProps = mapDispatchToProps(dispatch)
				} else if (typeof mapDispatchToProps === 'object') {
					dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
				} else {
					dispatchProps = { dispatch }
				}
				this.dispatchProps = dispatchProps
			}
	
			componentWillUnmount() {
				this.unsubscribe()
			}

			render() {	
				// 3. 映射为组件的属性
				return <OldComponent {...this.props} {...this.state} {...this.dispatchProps} />
			}
		}
	}
}

export default connect