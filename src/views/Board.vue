<template>
  <div class="bg-green-500 min-h-screen">
    <!-- {{board}} -->
    <h1 class="px-4 pt-4 text-xl font-bold">My Notion App</h1>
    <div class="flex flex-row flex-grow overflow-auto gap-8 p-4">
      <BoardColumn
        class="p-4 flex-shrink-0 border flex flex-col gap-2 rounded-md max-w-lg flex-1 bg-white/80 shadow-lg"
        v-for="(column, index) in board.columns"
        :key="column.name"
        :column="column"
        :columnIndex="index"
      />
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
import BoardColumn from '../components/BoardColumn.vue'

export default {
  components: {
    // BoardColumn: () => import('../components/BoardColumn.vue')
    BoardColumn
  },
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
    close() {
      this.$router.push({ name: 'board' })
    },
    createColumn() {
      this.$store.commit('CREATE_COLUMN', {
        name: this.newColumnName
      })
      this.newColumnName = ''
    },
  }
}
</script>

<style>

</style>