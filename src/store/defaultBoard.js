import { uuid } from '../utils'

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: 'yes',
          name: 'first task',
          id: 'woierhiwehti',
          userAssigned: null
        },
        {
          description: '',
          name: 'second task',
          id: 'woierhiwehtiwt',
          userAssigned: null
        },
        {
          description: '',
          name: 'third task',
          id: 'wofrewierhiwehti',
          userAssigned: null
        }
      ]
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: 'woifweerhiwehti',
          userAssigned: null
        },
        {
          description: '',
          name: 'second task',
          id: 'woifewfrweerhiwehti',
          userAssigned: null
        },
        {
          description: '',
          name: 'third task',
          id: 'woierhiwehtiwet',
          userAssigned: null
        }
      ]
    },
    {
      name: 'done',
      tasks: [
        {
          description: '',
          name: 'first task',
          id: 'wofsierhiwehti',
          userAssigned: null
        },
        {
          description: '',
          name: 'second task',
          id: 'woierhiwehtiwfwet',
          userAssigned: null
        },
        {
          description: '',
          name: 'third task',
          id: 'fswefwefrwerw',
          userAssigned: null
        }
      ]
    }
  ]
}