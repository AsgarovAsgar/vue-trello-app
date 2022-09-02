<template>
  <div class="bg-green-500 h-screen">
    <!-- {{board}} -->
    <div class="flex flex-row gap-8 p-4">
      <div class="p-4 border flex flex-col gap-2 rounded-md max-w-lg flex-1 bg-white/80 shadow-lg" v-for="column in board.columns" :key="column.name">
        <h2 class="font-bold text-lg">
          {{column.name}}
        </h2>
        <div class="flex flex-col space-y-2">
          <div
            class="rounded-md p-2 bg-white/50 shadow-md"
            v-for="task in column.tasks"
            :key="task.id"
            @click="goToTask(task)"
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
    }
  }
}
</script>

<style>

</style>