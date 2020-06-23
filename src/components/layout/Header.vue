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
.header {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

#nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.route {
  text-decoration: none;
  margin-right: 3rem;
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
