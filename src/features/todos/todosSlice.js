import { createSlice } from '@reduxjs/toolkit';

let nextTodoId = 0;
const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: {
      reducer(state, action) {
        const {id, text} = action.payload;
        state.push({id, text, completed: false});
      },
      prepare(text) {
        return {payload: {text, id: nextTodoId++}};
      },
    },
  },
});

export const {addTodo, toggleTodo} = todosSlice.actions;

export default todosSlice.reducer;
