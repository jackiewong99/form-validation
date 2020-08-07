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
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
}

#nav {
  justify-self: end;
  padding: 5px 0;
  position: relative;
  top: 2rem;
}

.view {
  margin: 5rem 0;
  padding: 5rem 0;
}
</style>
