<template>
  <div>
    <div class="border">
      {{ task }}
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
      console.log('let', this.$store.getters.getTask('59e1a77f6aacf'));
      return this.$store.getters.getTask(this.$route.params.id)
    }
  }
}
</script>

<style>

</style>