import { createSlice } from '@reduxjs/toolkit';
import { fetchMusicHistory } from '../../api/musicHistory';

const musicHistory = createSlice({
    name: 'musicHistory',
    initialState: { meta: null, tracks: null, error: null, loading: true },
    reducers: {
        getMusicHistorySuccess(state, action) {
            state.meta = action.payload.recenttracks['@attr'];
            state.tracks = action.payload.recenttracks.track;
            state.error = null;
            state.loading = false;
        },
        getMusicHistoryFailed(state, action) {
            state.meta = null;
            state.tracks = null;
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    getMusicHistorySuccess,
    getMusicHistoryFailed,
} = musicHistory.actions;

// prettier-ignore
export default musicHistory.reducer;

export const getMusicHistory = () => async dispatch => {
    await fetchMusicHistory().then(
        musicHistory => dispatch(getMusicHistorySuccess(musicHistory)),
        err => dispatch(getMusicHistoryFailed(err.toString()))
    );
};
