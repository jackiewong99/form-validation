<template>
  <div class="form">
    <form class="form-container">
      <Inputs />
    </form>
  </div>
</template>

<script>
import Inputs from './Inputs';
export default {
  name: 'Form',
  components: {
    Inputs
  }
};
</script>

<style scoped>
.form {
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
</style>
