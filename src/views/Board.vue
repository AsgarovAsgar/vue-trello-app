<template>
  <div class="bg-green-500 min-h-screen">
    <!-- {{board}} -->
    <h1 class="px-4 pt-4 text-xl font-bold">My Notion App</h1>
    <div class="flex flex-row flex-grow overflow-auto gap-8 p-4">
      <div 
        class="p-4 flex-shrink-0 border flex flex-col gap-2 rounded-md max-w-lg flex-1 bg-white/80 shadow-lg"
        v-for="(column, index) in board.columns"
        :key="column.name"
        @drop="moveTaskOrColumn($event, column.name, column.tasks, index)"
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
            v-for="(task, index) in column.tasks"
            :key="task.id"
            @click="goToTask(task)"
            draggable="true"
            @dragstart="pickupTask($event, task.id, column.name, index)"

            @dragover.prevent
            @dragenter.prevent
            @drop="moveTaskWithinColumn($event, column.tasks, index)"
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
            placeholder="+ Add new task"
            class="p-2 bg-transparent border rounded-md border-white"
            @keyup.enter="createTask($event, column.tasks)"
          >
        </div>
      </div>
      <div id="newColumn" class="flex-shrink-0">
        <input 
          type="text"
          class="p-2 flex-grow w-full rounded-md"
          placeholder="+ Enter column name"
          v-model="newColumnName"
          @keyup.enter="createColumn()"
        >
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
  data() {
    return {
      newColumnName: ''
    }
  },
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
    createColumn() {
      this.$store.commit('CREATE_COLUMN', {
        name: this.newColumnName
      })
      this.newColumnName = ''
    },
    pickupTask(e, taskId, columnName, index) {
      // console.log('pickupTask', e, taskId, columnName);
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'

      e.dataTransfer.setData('task-id', taskId)
      e.dataTransfer.setData('column-name', columnName)
      // for identifing is it column or task
      e.dataTransfer.setData('type', 'task')

      e.dataTransfer.setData('from-task-index', index)
    },
    pickupColumn(e, fromColumnIndex) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'

      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')

      // first of all I should define what I want to drag. Is it task or column
    },
    moveTaskOrColumn(e, toColumnName, toColumnTasks, toColumnIndex) {
      const type  = e.dataTransfer.getData('type')
      console.log('type', type);

      if(type === 'task') {
        const fromColumnName = e.dataTransfer.getData('column-name')
        const taskId = e.dataTransfer.getData('task-id')

        this.$store.commit('MOVE_TASK', {
          fromColumnName,
          toColumnName,
          toColumnTasks,
          taskId,
          toColumnIndex
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
    },
    moveTaskWithinColumn(e, tasks, toTaskIndex) {
      const fromTaskIndex = e.dataTransfer.getData('from-task-index')

      this.$store.commit('MOVE_TASK_WITHIN_COLUMN', {
        tasks,
        fromTaskIndex,
        toTaskIndex
      })
    }
  }
}
</script>

<style>

</style>