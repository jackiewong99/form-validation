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
  },
  data() {
    return {
      finish: false
    };
  }

  // Create an event to show the successful/fail sign up message
  // after the Form component.

  // Create a new component called SignUpMsg
  // This component will show the user if
  // the sign up was a success or fail
  // Pass data into this component to determine
  // whether to show success or fail message
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
  width: 30%;
}
</style>
