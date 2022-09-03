export function uuid () {
  return Math.random().toString(16).slice(2)
}

export function saveStatePlugin(store) {
  // console.log('bax')
  store.subscribe((mutation, state) => {
      // console.log('state', state, mutation.type);
      // localStorage.setItem('board', JSON.stringify(state.board))
    }
  )
}