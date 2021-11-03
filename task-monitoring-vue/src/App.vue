<template>
  <div id="app" class="app" :data-theme= dataTheme>
  <app-header
  dataTheme
  @changeTheme="dataTheme = getTheme()"/>
  <router-view/>
  <app-footer/>
  </div>
</template>


<script>
import AppHeader from './components/Header.vue';
import AppFooter from './components/Footer.vue';

export default ({
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      dataTheme: 'light',
    };
  },
  methods: {
    getTheme() {
      if (document.querySelector('#theme-switcher').checked) {
        return 'dark';
      }
      return 'light';
    },
  },
  setup() {

  },
});
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
