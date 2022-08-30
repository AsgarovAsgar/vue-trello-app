<template>
  <div class="bg-green-500 h-screen">
    <!-- {{board}} -->
    <div class="flex flex-row gap-8 p-4">
      <div class="p-4 border flex flex-col gap-2 rounded-md max-w-lg flex-1 bg-white/80 shadow-lg" v-for="column in board.columns" :key="column.name">
        <h2 class="font-bold text-lg">
          {{column.name}}
        </h2>
        <div class="flex flex-col space-y-2">
          <div class="rounded-md p-2 bg-white/50 shadow-md" v-for="task in column.tasks" :key="task.id">
            <p class="font-semibold">
              {{task.name}}
            </p>
            <p class="text-sm">
              {{task.description}}
            </p> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['board'])
    // board() {
    //   return mapState
    // }
  }
}
</script>

<style>

</style>