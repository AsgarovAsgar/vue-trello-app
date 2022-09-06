<template>
  <div>
    <div
      id="task"
      class="rounded-md p-2 bg-white/50 shadow-md"
      @click="goToTask(task)"
      draggable="true"
      @dragstart="pickupTask($event, task.id, column.name, taskIndex)"
      @dragover.prevent
      @dragenter.prevent
      @drop="moveTaskWithinColumn($event, column.tasks, taskIndex)"
    >
      <p class="font-semibold">
        {{ task.name }}
      </p>
      <p class="text-sm">
        {{ task.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    column: {
      type: Object,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
    taskIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: "task", params: { id: task.id } });
    },
    pickupTask(e, taskId, columnName, index) {
      // console.log("pickupTask", taskId);
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("task-id", taskId);
      e.dataTransfer.setData("column-name", columnName);
      // for identifing is it column or task
      e.dataTransfer.setData("type", "task");
      e.dataTransfer.setData("from-task-index", index);
    },

    moveTaskWithinColumn(e, tasks, toTaskIndex) {
      const fromTaskIndex = e.dataTransfer.getData("from-task-index");
      this.$store.commit("MOVE_TASK_WITHIN_COLUMN", {
        tasks,
        fromTaskIndex,
        toTaskIndex,
      });
    },
  },
};
</script>

<style>
</style>