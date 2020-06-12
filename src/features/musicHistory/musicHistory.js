import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getMusicHistory} from "./musicHistorySlice";

export const MusicHistory = () => {
  const dispatch = useDispatch()

  const {data, error} = useSelector(
    (state) => state.musicHistory
  )

  useEffect(() => {
    dispatch(getMusicHistory())
  }, []);

  if (error) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{error}</div>
      </div>
    )
  }

  console.log(data)

  return (
    <div>
      data
    </div>
  )
}
