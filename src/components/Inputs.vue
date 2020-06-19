<template>
  <div class="inputs">
    <h2>Create Account</h2>
    <div class="input-item">
      <label for="username">Username: </label>
      <input type="text" name="username" placeholder="Username" required />
    </div>
    <div class="input-item">
      <label for="password">Password: </label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        v-model="password"
        v-on:keyup="validatePassword"
        required
      />
      <!-- Temporary validation notification for building purposes -->
      <span v-if="validPassword">Valid Password</span>
      <span v-else>Invalid Password</span>
    </div>
    <div class="input-item">
      <label for="email">Email: </label>
      <input
        type="text"
        name="email"
        placeholder="Email"
        v-model="email"
        required
      />
    </div>
    <div class="input-item">
      <input type="submit" value="Submit" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Inputs',
  data() {
    return {
      password: '',
      email: '',
      validPassword: false,
      validEmail: false
    };
  },
  methods: {
    validatePassword: function() {
      // Regular expression that matches any uppercase character,
      // lowercase character, digit character, and special character.
      // Quantifier then matches 6 or more of the preceding characters.
      const charRegex = /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}/g;

      // Regular expression that matches any whitespace character
      const whiteSpaceRegex = /\s/g;

      // Test each regular expression:
      const charTest = charRegex.test(this.password);
      const whiteSpaceTest = whiteSpaceRegex.test(this.password);

      if (charTest === true && whiteSpaceTest === false) {
        this.validPassword = true;
      } else {
        this.validPassword = false;
      }

      return this.validPasword;
    }
  }
};
</script>

<style scoped>
/* Inputs */
.input-item {
  margin: 10px 0;
  padding: 10px 0;
}
</style>
