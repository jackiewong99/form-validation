<template>
  <div class="home">
    <h1>Form Validation</h1>
    <Form id="form" />
  </div>
</template>

<script>
import Form from '../components/Form';

export default {
  name: 'Home',
  components: {
    Form
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#form {
  width: 55%;
}
</style>
