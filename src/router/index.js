import {createRouter, createWebHashHistory} from 'vue-router'

import Home from '@/views/Home.vue'
import Board from '@/views/Board.vue'
import Task from '@/views/Task.vue'



const routes = [
  { path: '/', name: 'board', component: Board,
    children: [
      {
        path: 'task/:id',
        name: 'task',
        component: Task
      }
    ]
  },
  // { path: '/about', component: About },
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

export default router