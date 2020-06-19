<template>
  <div class="header">
    <div id="nav">
      <router-link class="route" :to="{ name: 'home' }">Home</router-link>
      <router-link class="route" :to="{ name: 'about' }">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style scoped>
#nav {
  display: flex;
  flex-direction: row;
}

.route {
  text-decoration: none;
  margin-right: 50%;
}

.route:focus {
  text-decoration: none;
  color: black;
}
.route:hover {
  text-decoration: none;
  color: black;
}

.route:hover,
.route:active {
  text-decoration: none;
  color: black;
}

.route:visited {
  text-decoration: none;
  color: black;
}
</style>
