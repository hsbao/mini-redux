import React from 'react'
import { useSelector, useDispatch } from '../react-redux'

function Count(props) {
	const num1 = useSelector((state) => state.num1)
	const dispatch = useDispatch()

	const handleAdd = () => {
		dispatch({ type: 'ADD' })
	}

  return (
		<div onClick={handleAdd}>
			{props.name}：{num1.num}
		</div>
	)
}

export default Count