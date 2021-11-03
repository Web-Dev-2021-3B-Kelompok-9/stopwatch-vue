<template>
    <div id="add-task" class="add-task">
        <button id="add-task-button" title="Add task"
        @click="openAddTaskModul">
            <font-awesome-icon icon="plus-circle" size="3x"/>
        </button>
    </div>
</template>

<script>
export default {
  props: ['dataTheme'],
  methods: {
    openAddTaskModul() {
      this.$emit('openAddTaskModul');
    },
  },
};
</script>
