import { createStore } from 'vuex'
import defaultBoard from './defaultBoard'
import { saveStatePlugin } from '../utils'

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export const store = createStore({
  plugins: [saveStatePlugin],
  state () {
    return {
      board
    }
  },
  getters: {
    getTask: (state) => (id) => {
      let task
      console.log('id', id);
      for (let column of state.board.columns) {
        // return id
        // return column.tasks.find(task => task.id === id)
        // console.log('column', column);
        for (let task of column.tasks) {
          // console.log('task', task.id, id);
          if (task.id == id) {
            // console.log('taskss', task.id);
            return task
          }
        }
      }
      return task
    }
  }
})