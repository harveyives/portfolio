import {createSlice} from '@reduxjs/toolkit'
import {fetchMusicHistory} from "../../api/lastFM";

const musicHistory = createSlice({
  name: 'musicHistory',
  initialState: {data: null, error: null},
  reducers: {
    getMusicHistorySuccess(state, action) {
      state.data = action.payload
      state.error = null
    },
    getMusicHistoryFailed(state, action) {
      state.data = null
      state.error = action.payload
    }
  }
})

export const {
  getMusicHistorySuccess,
  getMusicHistoryFailed
} = musicHistory.actions

export default musicHistory.reducer

export const getMusicHistory = () => async dispatch => {
  await fetchMusicHistory().then(
    // success callback
    musicHistory => dispatch(getMusicHistorySuccess(musicHistory)),
    // error callback
    err => dispatch(getMusicHistoryFailed(err.toString()))
  )
}
