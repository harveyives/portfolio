import { combineReducers } from 'redux';
import musicHistoryReducer from 'features/musicHistory/musicHistorySlice';

export default combineReducers({
    musicHistory: musicHistoryReducer,
});
