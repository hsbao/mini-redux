// 对标的是mapDispatchToProps
import React from 'react'
import ReactReduxContext from '../ReactReduxContext'

function useDispatch() {
	const { store } = React.useContext(ReactReduxContext)  // useContext接收一个ReactContext，会返回Provider接收的value
	return store.dispatch
}

export default useDispatch