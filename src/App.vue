<template>
  <div id="app">
    <Header />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Header from './components/layout/Header';
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    Header,
    HelloWorld
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}
</style>
