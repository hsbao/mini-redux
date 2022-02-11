// 对标替代的是mapStateToProps
import React from 'react'
import ReactReduxContext from '../ReactReduxContext'

function useSelectorWithStore(selector, store) {
  const { subscribe, getState } = store
  const state = getState()
  let selectedState = selector(state) // 跟mapStateToProps一样

  const [, forceUpdate] = React.useReducer((x) => x + 1, 0)
  React.useLayoutEffect(() => {
		// 监听数据变化，刷新组件
    return subscribe(forceUpdate)
  }, [subscribe])

  return selectedState
}

/**
 * 使用：useSelector((state) => state.user)
 * @param {*} selector
 * @returns
 */
function useSelector(selector) {
  const { store } = React.useContext(ReactReduxContext) // useContext接收一个ReactContext，会返回Provider接收的value
  const selectedState = useSelectorWithStore(selector, store)
  return selectedState
}

export default useSelector
