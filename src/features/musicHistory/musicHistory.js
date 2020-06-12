import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getMusicHistory} from "./musicHistorySlice";

export const MusicHistory = () => {
  const dispatch = useDispatch()

  const {meta, tracks, loading, error} = useSelector(
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

  console.log(tracks);
  console.log(meta);
  return (
    <div>
      {loading && <div>loading</div>}
      {!loading &&
      <div>done loading
        <ul>
          {tracks.slice(0, 10).map((it, i) => <li key={i}>{it.name}</li>)}
        </ul>
      </div>
      }
    </div>
  )
}
