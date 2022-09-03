<template>
  <div >
    <div class="border border-gray-50 p-4 m-4 max-w-2xl bg-white shadow-lg rounded-lg space-y-2">
      <input 
        type="text"
        class="p-2 text-lg font-bold w-full"
        :value="task.name"
        @change="updateTaskProperty($event, 'name')"
        @keyup.enter="updateTaskProperty($event, 'name')"
      >
      <textarea
        class="p-2 border rounded-md w-full"
        rows="5"
        :value="task.description"
        @change="updateTaskProperty($event, 'description')"  
        @keyup.enter="updateTaskProperty($event, 'description')"  
        ></textarea>
    </div>
  </div>
</template>

<script>
import mapGetters from 'vuex'

export default {
  computed: {
    ...mapGetters['getTask'],
    task() {
      // console.log('bax', this.getTask('59e1a77f6aacf'));
      // console.log('let', this.$store.getters.getTask('59e1a77f6aacf'));
      return this.$store.getters.getTask(this.$route.params.id)
    }
  },
  methods: {
    updateTaskProperty(e, key) {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        key,
        value: e.target.value
      })
    }
  }
}
</script>

<style>

</style>