<template>
  <div class="bg-green-500 min-h-screen">
    <!-- {{board}} -->
    <h1 class="px-4 pt-4 text-xl font-bold">My Nation App</h1>
    <div class="flex flex-row gap-8 p-4">
      <div 
        class="p-4 border flex flex-col gap-2 rounded-md max-w-lg flex-1 bg-white/80 shadow-lg"
        v-for="(column, index) in board.columns"
        :key="column.name"
        @drop="moveTaskOrColumn($event, column.name, column.tasks)"
        @dragover.prevent
        @dragenter.prevent

        draggable="true"
        @dragstart.self="pickupColumn($event, index)"
      >
        <h2 class="font-bold text-lg">
          {{column.name}}
        </h2>
        <div class="flex flex-col space-y-2">
          <div
            id="task"
            class="rounded-md p-2 bg-white/50 shadow-md"
            v-for="task in column.tasks"
            :key="task.id"
            @click="goToTask(task)"
            draggable="true"
            @dragstart="pickupTask($event, task.id, column.name)"
          >
            <p class="font-semibold">
              {{task.name}}
            </p>
            <p class="text-sm">
              {{task.description}}
            </p> 
          </div>
          <input 
            type="text"
            placeholder="Add new task"
            class="p-2 bg-transparent border border-white"
            @keyup.enter="createTask($event, column.tasks)"
          >
        </div>
      </div>
    </div>
    <div v-if="isTaskOpen" @click.self="close" class="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-gray-900/40">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['board']),
    isTaskOpen() {
      return this.$route.name === 'task'
    }
    // board() {
    //   return mapState
    // }
  },
  methods: {
    goToTask(task) {
      this.$router.push({name: 'task', params: { id: task.id }})
    },
    close() {
      this.$router.push({ name: 'board' })
    },
    createTask(e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      })
      e.target.value = ''
    },
    pickupTask(e, taskId, columnName) {
      // console.log('pickupTask', e, taskId, columnName);
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'

      e.dataTransfer.setData('task-id', taskId)
      e.dataTransfer.setData('column-name', columnName)
      e.dataTransfer.setData('type', 'task')
    },
    pickupColumn(e, fromColumnIndex) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'

      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')

      // first of all I should define what I want to drag. Is it task or column
    },
    moveTaskOrColumn(e, toColumnName, toColumnTasks, toColumnIndex) {
      console.log('moveTask', e, toColumnName, toColumnTasks);
      const type  = e.dataTransfer.getData('type')
      console.log('type', type);

      if(type === 'task') {
        const fromColumnName = e.dataTransfer.getData('column-name')
        const taskId = e.dataTransfer.getData('task-id')

        this.$store.commit('MOVE_TASK', {
          fromColumnName,
          toColumnName,
          toColumnTasks,
          taskId
        })
      } else if (type === 'column') {
        const fromColumnIndex = e.dataTransfer.getData('from-column-index')

        this.$store.commit('MOVE_COLUMN', {
          fromColumnIndex,
          toColumnIndex
        })
      }
      // console.log('fromColumnName', fromColumnName);
      // console.log('fromTaskId', fromTaskId);
    }
  }
}
</script>

<style>

</style>