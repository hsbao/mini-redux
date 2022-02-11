import React from 'react'
import ReactReduxContext from './ReactReduxContext'

/**
 * react-redux提供的Provider组件：基于react context实现
 * @param {*} props react-redux使用的时候，Provider会接收一个store，也就是redux的store
 * @returns 
 */
function Provider(props) {
  return (
    <ReactReduxContext.Provider value={{ store: props.store }}>
      { props.children }
    </ReactReduxContext.Provider>
  )
}

export default Provider