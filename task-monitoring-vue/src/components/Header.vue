
<template>
  <div class="header">
    <h1>Task Monitoring</h1>
    <div class="theme-switcher"
    @change="changeTheme">
      <label class="switcher">
        <input type="checkbox" id="theme-switcher">
        <span class="slider round"></span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: ['dataTheme'],
  methods: {
    changeTheme() {
      this.$emit('changeTheme');
    },
  },
};
</script>
