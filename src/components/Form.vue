<template>
  <div class="form-container">
    <form @submit.prevent="validateForm">
      <h2>Create Account</h2>
      <p class="disclaimer">
        <em>
          Do not enter your personal information. However, an active email
          account is required for the verification to work.
        </em>
      </p>
      <div class="input-item">
        <div class="col-left">
          <label for="first-name" class="input-label">First Name </label>
        </div>
        <div class="col-right">
          <input
            type="text"
            name="first-name"
            class="input-box"
            v-model="firstName"
            v-on:keyup="validateFirstName(firstName)"
            required
          />
          <span v-if="valid['firstName']">Valid</span>
          <span v-else>Invalid</span>
        </div>
      </div>
      <div class="input-item">
        <div class="col-left">
          <label for="last-name" class="input-label">Last Name </label>
        </div>
        <div class="col-right">
          <input
            type="text"
            name="last-name"
            class="input-box"
            v-model="lastName"
            v-on:keyup="validateLastName(lastName)"
            required
          />
          <span v-if="valid['lastName']">Valid</span>
          <span v-else>Invalid</span>
        </div>
      </div>
      <div class="input-item">
        <div class="col-left">
          <label class="input-label" for="username">Username </label>
        </div>
        <div class="col-right">
          <input
            class="input-box"
            type="text"
            name="username"
            v-model="username"
            required
          />
        </div>
      </div>
      <div class="input-item">
        <div class="col-left">
          <label class="input-label" for="password">Password </label>
        </div>
        <div class="col-right">
          <input
            class="input-box"
            type="password"
            name="password"
            v-model="password"
            v-on:keyup="debouncePasswordValidation"
            required
          />
          <!-- Temporary validation notification for building purposes -->
          <span v-if="valid['password']">Valid Password</span>
          <span v-else>Invalid Password</span>
        </div>
      </div>
      <div class="input-item">
        <div class="col-left">
          <label class="input-label" for="email">Email </label>
        </div>
        <div class="col-right">
          <input
            class="input-box"
            type="text"
            name="email"
            v-model="email"
            required
          />
        </div>
      </div>
      <div class="input-item">
        <input class="submit-btn" type="submit" value="Sign Up" />
      </div>
    </form>
  </div>
</template>

<script>
import { debounce } from 'debounce';
import { auth } from '@/firebase';

export default {
  name: 'Form',
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
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
    validateFirstName(name) {
      // Regular expression that matches the pattern of
      // exactly 1 uppercase character at the beginning and
      // at least 1 lowercase character following the first character.
      // This expression also matches names with two parts.
      const charRegex = /^([A-Z]{1})([a-z]{1,})[ -]?([A-Z]{1})?([a-z]{1,})?$/g;
      const charTest = charRegex.test(name);

      if (charTest === true) {
        this.valid['firstName'] = true;
      } else {
        this.valid['firstName'] = false;
      }

      return this.valid['firstName'];
    },
    validateLastName(name) {
      // Regular expression that matches the pattern of
      // exactly 1 uppercase character at the beginning and
      // at least 1 lowercase character following the first character.
      // This expression also matches names with two parts (only allowing a hyphen).
      const charRegex = /^([A-Z]{1})([a-z]{1,})[-]?([A-Z]{1})?([a-z]{1,})?$/g;
      const charTest = charRegex.test(name);

      if (charTest === true) {
        this.valid['lastName'] = true;
      } else {
        this.valid['lastName'] = false;
      }

      return this.valid['lastName'];
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
    debouncePasswordValidation: debounce(function() {
      this.validatePassword();
    }, 750),
    async validateForm() {
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(account => {
          alert(`Account created for ${account.user.email}`);
          const user = auth.currentUser;
          console.log(user);
          user
            .sendEmailVerification()
            .then(() => {
              alert(`Email has been sent to ${account.user.email}`);
              // On successful send, push to the '/success' route
              this.$router.push({ path: 'success' });
            })
            .catch(error => {
              alert(error.message);
            });
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }
};
</script>

<style scoped>
.form-container {
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
}

.disclaimer {
  margin: 0 1rem;
}

.col-left {
  float: left;
  margin-top: 6px;
  width: 25%;
}

.col-right {
  float: left;
  margin-top: 6px;
  width: 75%;
}

.input-label {
  display: inline-block;
}

.input-box {
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
}

input[type='submit'] {
  background-color: rgb(64, 172, 255);
  border: none;
  border-radius: 5px;
  color: rgb(250, 250, 250);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  height: 3rem;
  margin: 1rem 0;
  outline: none;
  padding: 0;
  transition: ease-out 0.4s;
  width: 7rem;
}

input[type='submit']:hover {
  background-color: rgba(64, 172, 255, 0.8);
}

input[type='submit']:active {
  background-color: rgba(64, 172, 255, 0.4);
  transform: translateY(3px);
}

span {
  padding-left: 30px;
}
</style>
