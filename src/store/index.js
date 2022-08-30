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
  }
})