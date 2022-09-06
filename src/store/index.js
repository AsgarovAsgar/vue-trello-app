import { createStore } from 'vuex'
import defaultBoard from './defaultBoard'
import { saveStatePlugin, uuid } from '../utils'

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export const store = createStore({
  plugins: [saveStatePlugin],
  state () {
    return {
      board
    }
  },
  mutations: {
    CREATE_TASK(state, {tasks, name}) {
      tasks.push({
        id: uuid(),
        name,
        description: 'test'
      })
    },
    CREATE_COLUMN(state, { name }) {
      state.board.columns.push({
        name,
        tasks: []
      })
    },
    UPDATE_TASK(state, { task, key, value}) {
       task[key] = value
    },
    MOVE_TASK(state, { fromColumnName, toColumnName, toColumnTasks, taskId }) {
      const fromColumn = state.board.columns.find(column => column.name === fromColumnName)
      const takenTask = fromColumn.tasks.find(task => task.id === taskId)
      // console.log('takenTask', takenTask);

      if (fromColumnName !== toColumnName) {
        fromColumn.tasks.splice(fromColumn.tasks.findIndex(task => task.id === taskId), 1)
        toColumnTasks.push(takenTask)
      } else {
        // console.log('The column is the same');
      }
    },
    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex}) {
      const columnList = state.board.columns
      const takenColumn = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, takenColumn)
    },
    MOVE_TASK_WITHIN_COLUMN(state, {tasks, fromTaskIndex, toTaskIndex}) {
      const takenTask = tasks.splice(fromTaskIndex, 1)[0]
      tasks.splice(toTaskIndex, 0, takenTask)
    }
  },
  getters: {
    getTask: (state) => (id) => {
      // console.log('id', id);
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
    }
  }
})