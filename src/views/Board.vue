<template>
  <div class="relative">
    <div class="min-h-screen">
      <!-- {{board}} -->
      <header class="px-4 py-2 bg-blue-400 w-full flex items-center justify-between">
        <div class="flex gap-1 items-center">
          <a href="#" class="p-2 rounded hover:bg-white/50 backdrop-blur-sm transition duration-300">
            <img class="h-5 flex-shrink-0 w-auto text-white" src="../assets/logo.png" alt="">
          </a>
          <nav class="flex text-sm gap-1">
            <ul v-for="button in navButtons" :key="button.title">
              <li>
                <button class="flex items-center gap-1 p-2 rounded hover:bg-white/50 backdrop-blur-sm transition duration-300">
                  <span>{{button.title}}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
          <button class="ml-3 text-sm py-2 px-4 bg-white/30 rounded hover:bg-white/50 backdrop-blur-sm transition duration-300">
            <span>Create</span>
          </button>
        </div>
        <div></div>
      </header>
      <div class="flex flex-row flex-grow overflow-auto gap-8 p-4">
        <BoardColumn
          class="p-4 flex-shrink-0 border flex flex-col gap-2 rounded-md max-w-lg flex-1 bg-white/80 backdrop-blur-sm shadow-lg"
          v-for="(column, index) in board.columns"
          :key="column.name"
          :column="column"
          :columnIndex="index"
        />
        <div id="newColumn" class="flex-shrink-0">
          <input 
            type="text"
            class="p-2 bg-white/60 hover:bg-white/80 flex-grow w-full rounded-md text-white placeholder-gray-700 backdrop-blur-sm cursor-pointer transition duration-300"
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
    <img class="-z-10 absolute top-0 left-0 h-screen w-full object-cover" src="../assets/base-bg.jpeg" alt="">

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
      newColumnName: '',
      navButtons: [
        {
          title: 'Workspaces'
        },
        {
          title: 'Recent'
        },
        {
          title: 'Starred'
        },
        {
          title: 'Templates'
        }
      ]
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