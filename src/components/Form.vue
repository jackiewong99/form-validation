<template>
  <div class="form-container">
    <form class="form">
      <h2>Create Account</h2>
      <div class="input-item">
        <label class="input-label" for="username">Username: </label>
        <input
          class="input-box"
          type="text"
          name="username"
          placeholder="Username"
          required
        />
      </div>
      <div class="input-item">
        <label class="input-label" for="password">Password: </label>
        <input
          class="input-box"
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
        <label class="input-label" for="email">Email: </label>
        <input
          class="input-box"
          type="text"
          name="email"
          placeholder="Email"
          v-model="email"
          v-on:keyup="validateEmail"
          required
        />
      </div>
      <div class="input-item">
        <label class="input-label" for="credit-card">Credit Card: </label>
        <input
          class="input-box"
          type="text"
          name="credit-card"
          placeholder="Credit Card Number"
          required
        />
      </div>
      <div class="input-item">
        <input type="submit" value="Submit" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Form',
  data() {
    return {
      password: '',
      email: '',
      validPassword: false,
      validEmail: false
    };
  },
  methods: {
    validatePassword() {
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
    },
    validateEmail() {
      // Character pattern of email: <emailName>@<websiteName>.<top-level domain suffix (com, org, edu, gov)>
      return this.validEmail;
    }
  }
};
</script>

<style scoped>
.form-container {
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
</style>
