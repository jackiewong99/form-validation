<template>
  <div class="form-container">
    <form class="form" @submit.prevent="">
      <h2>Create Account</h2>
      <div class="input-item">
        <label for="first-name" class="input-label">First Name: </label>
        <input
          type="text"
          name="first-name"
          class="input-box"
          v-model="firstName"
          v-on:keyup="validateName(firstName, 'first')"
          required
        />
        <span v-if="valid['firstName']">Valid</span>
        <span v-else>Invalid</span>
      </div>
      <div class="input-item">
        <label for="last-name" class="input-label">Last Name: </label>
        <input
          type="text"
          name="last-name"
          class="input-box"
          v-model="lastName"
          v-on:keyup="validateName(lastName, 'last')"
          required
        />
        <span v-if="valid['lastName']">Valid</span>
        <span v-else>Invalid</span>
      </div>
      <div class="input-item">
        <label class="input-label" for="username">Username: </label>
        <input class="input-box" type="text" name="username" required />
      </div>
      <div class="input-item">
        <label class="input-label" for="password">Password: </label>
        <input
          class="input-box"
          type="password"
          name="password"
          v-model="password"
          v-on:keyup="debounceValidatePassword"
          required
        />
        <!-- Temporary validation notification for building purposes -->
        <span v-if="valid['password']">Valid Password</span>
        <span v-else>Invalid Password</span>
      </div>
      <div class="input-item">
        <label class="input-label" for="email">Email: </label>
        <input
          class="input-box"
          type="text"
          name="email"
          v-model="email"
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
import { debounce } from 'debounce';

export default {
  name: 'Form',
  data() {
    return {
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      valid: {
        firstName: false,
        lastName: false,
        password: false
      }
    };
  },
  methods: {
    validateName(name, namePart) {
      // Regular expression that matches the pattern of
      // exactly 1 uppercase character at the beginning and
      // at least 1 lowercase character following the first character.
      // This expression also matches names with two parts.
      const charRegex = /^([A-Z]{1})([a-z]{1,})[ -]?([A-Z]{1})?([a-z]{1,})?$/g;
      const charTest = charRegex.test(name);

      if (charTest === true && namePart === 'first') {
        this.valid['firstName'] = true;
      } else {
        this.valid['firstName'] = false;
      }
      if (charTest === true && namePart === 'last') {
        this.valid['lastName'] = true;
      } else {
        this.valid['lastName'] = false;
      }

      switch (namePart) {
        case 'first':
          return this.valid['firstName'];

        case 'last':
          return this.valid['lastName'];
      }
    },
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
        this.valid['password'] = true;
      } else {
        this.valid['password'] = false;
      }

      return this.valid['password'];
    },
    debounceValidatePassword: debounce(function() {
      this.validatePassword();
    }, 1000)
  }
};
</script>

<style scoped>
.form-container {
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.form {
  margin: 0 auto;
  width: 80%;
}

label,
input {
  display: inline-block;
}

label {
  width: 30%;
  text-align: right;
}

label + input {
  width: 30%;
  margin: 0 30% 0 4%;
}

input + input {
  float: right;
}
</style>
