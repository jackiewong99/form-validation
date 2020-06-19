<template>
  <div id="app">
    <Header id="nav" />
    <router-view class="view"></router-view>
  </div>
</template>

<script>
import Header from './components/layout/Header';

export default {
  name: 'App',
  components: {
    Header
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
  width: 100%;
  height: 100%;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-auto-rows: 62px;
}

#nav {
  grid-row: 1 / 1;
  align-self: center;
  justify-self: end;
  margin-right: 15%;
}

.view {
  grid-row: 2 / 11;
  justify-self: center;
  width: 50%;
}
</style>
