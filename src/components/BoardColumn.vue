<template>
  <!-- <div>ho</div> -->
  <div
    @drop="moveTaskOrColumn($event, column.name, column.tasks, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    draggable="true"
    @dragstart.self="pickupColumn($event, columnIndex)"
  >
    <h2 class="font-bold text-lg">
      {{ column.name }}
    </h2>
    <div class="flex flex-col space-y-2">
      <ColumnTask
        v-for="(task, index) in column.tasks"
        :key="task.id"
        :column="column"
        :task="task"
        :taskIndex="index"
      />
      <input
        type="text"
        placeholder="+ Add new task"
        class="p-2 bg-transparent border rounded-md border-white"
        @keyup.enter="createTask($event, column.tasks)"
      />
    </div>
  </div>
</template>

<script>
import ColumnTask from "../components/ColumnTask.vue";

export default {
  components: {
    ColumnTask,
  },
  props: {
    column: {
      type: Object,
      required: true,
    },
    columnIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    createTask(e, tasks) {
      this.$store.commit("CREATE_TASK", {
        tasks,
        name: e.target.value,
      });
      e.target.value = "";
    },

    moveTaskOrColumn(e, toColumnName, toColumnTasks, toColumnIndex) {
      const type = e.dataTransfer.getData("type");
      // console.log('type', type);
      if (type === "task") {
        const fromColumnName = e.dataTransfer.getData("column-name");
        const taskId = e.dataTransfer.getData("task-id");
        this.$store.commit("MOVE_TASK", {
          fromColumnName,
          toColumnName,
          toColumnTasks,
          taskId,
          toColumnIndex,
        });
      } else if (type === "column") {
        const fromColumnIndex = e.dataTransfer.getData("from-column-index");
        this.$store.commit("MOVE_COLUMN", {
          fromColumnIndex,
          toColumnIndex,
        });
      }
      // console.log('fromColumnName', fromColumnName);
      // console.log('fromTaskId', fromTaskId);
    },
    pickupColumn(e, fromColumnIndex) {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("from-column-index", fromColumnIndex);
      e.dataTransfer.setData("type", "column");
      // first of all I should define what I want to drag. Is it task or column
    },
  },
  components: { ColumnTask },
};
</script>