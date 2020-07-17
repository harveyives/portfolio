import {combineReducers} from 'redux';
import todosReducer from 'features/todos/todosSlice';
import visibilityFilterReducer from 'features/filters/filtersSlice';
import musicHistoryReducer from 'features/musicHistory/musicHistorySlice';

export default combineReducers({
  todos: todosReducer,
  visibilityFilter: visibilityFilterReducer,
  musicHistory: musicHistoryReducer,
});
