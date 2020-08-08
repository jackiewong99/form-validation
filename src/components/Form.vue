<template>
  <div class="form-container">
    <form @submit.prevent="validateForm">
      <h2>Create Account</h2>
      <p class="instructions">
        <em>
          * Do not enter your personal information. However, an active email
          account is required for the verification to work. All fields are
          required.
        </em>
      </p>
      <div class="input-item">
        <div class="col-left">
          <label for="first-name" class="input-label">First Name</label>
        </div>
        <div class="col-right">
          <input
            type="text"
            name="first-name"
            class="input-box"
            v-bind:class="{
              empty: empty['firstName'],
              valid: valid['firstName'] && !empty['firstName'],
              invalid: !valid['firstName'] && !empty['firstName']
            }"
            v-model="firstName"
            v-on:keyup="validateFirstName(firstName)"
            required
          />
        </div>
      </div>
      <div class="input-item">
        <div class="col-left">
          <label for="last-name" class="input-label">Last Name</label>
        </div>
        <div class="col-right">
          <input
            type="text"
            name="last-name"
            class="input-box"
            v-bind:class="{
              empty: empty['lastName'],
              valid: valid['lastName'] && !empty['lastName'],
              invalid: !valid['lastName'] && !empty['lastName']
            }"
            v-model="lastName"
            v-on:keyup="validateLastName(lastName)"
            required
          />
        </div>
      </div>
      <div class="input-item">
        <div class="col-left">
          <label class="input-label" for="username">Username</label>
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
          <label class="input-label" for="password">Password</label>
        </div>
        <div class="col-right">
          <input
            class="input-box"
            type="password"
            name="password"
            v-bind:class="{
              empty: empty['password'],
              valid: valid['password'] && !empty['password'],
              invalid: !valid['password'] && !empty['password']
            }"
            v-model="password"
            v-on:keyup="debouncePasswordValidation"
            required
          />
        </div>
      </div>
      <div class="input-item">
        <div class="col-left">
          <label class="input-label" for="email">Email</label>
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
      <div>
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
      },
      empty: {
        firstName: true,
        lastName: true,
        password: true
      }
    };
  },
  methods: {
    validateFirstName(name) {
      if (name.length === 0) {
        this.empty['firstName'] = true;
      } else {
        // Regular expression that matches the pattern of
        // exactly 1 uppercase character at the beginning and
        // at least 1 lowercase character following the first character.
        // This expression also matches names with two parts.
        const charRegex = /^([A-Z]{1})([a-z]{1,})[ -]?([A-Z]{1})?([a-z]{1,})?$/g;
        const charTest = charRegex.test(name);
        this.empty['firstName'] = false;

        if (charTest === true) {
          this.valid['firstName'] = true;
        } else {
          this.valid['firstName'] = false;
        }
      }
      const validationVars = [this.empty['firstName'], this.valid['firstName']];
      return validationVars;
    },
    validateLastName(name) {
      if (name.length === 0) {
        this.empty['lastName'] = true;
      } else {
        // Regular expression that matches the pattern of
        // exactly 1 uppercase character at the beginning and
        // at least 1 lowercase character following the first character.
        // This expression also matches names with two parts (only allowing a hyphen).
        const charRegex = /^([A-Z]{1})([a-z]{1,})[-]?([A-Z]{1})?([a-z]{1,})?$/g;
        const charTest = charRegex.test(name);
        this.empty['lastName'] = false;

        if (charTest === true) {
          this.valid['lastName'] = true;
        } else {
          this.valid['lastName'] = false;
        }
      }
      const validationVars = [this.empty['lastName'], this.valid['firstName']];

      return validationVars;
    },
    validatePassword() {
      if (this.password.length === 0) {
        this.empty['password'] = true;
      } else {
        // Regular expression that matches any uppercase character,
        // lowercase character, digit character, and special character.
        // Quantifier then matches 6 or more of the preceding characters.
        const charRegex = /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}/g;

        // Regular expression that matches any whitespace character
        const whiteSpaceRegex = /\s/g;

        // Test each regular expression:
        const charTest = charRegex.test(this.password);
        const whiteSpaceTest = whiteSpaceRegex.test(this.password);
        this.empty['password'] = false;

        if (charTest === true && whiteSpaceTest === false) {
          this.valid['password'] = true;
        } else {
          this.valid['password'] = false;
        }
      }
      const validationVars = [this.empty['password'], this.valid['password']];

      return validationVars;
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

.instructions {
  margin: 0 1rem 1rem;
}

.col-left {
  float: left;
  margin-top: 1rem;
  width: 25%;
}

.col-right {
  float: left;
  margin-top: 1rem;
  width: 75%;
}

label {
  display: inline-block;
}

.input-box {
  border-radius: 5px;
  border: 2px solid;
  border-color: rgba(0, 0, 0, 0.5);
  outline: none;
  transition: ease-out 0.5s;
  width: 90%;
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
  transform: translateY(2px);
}

/* Outline for valid and invalid data */
.empty {
  border-color: rgba(0, 0, 0, 0.5);
}

.valid {
  border-color: rgb(92, 201, 91);
}

.invalid {
  border-color: rgb(232, 67, 67);
}

@media screen and (max-width: 730px) {
  .col-left {
    width: 100%;
    float: none;
  }

  .col-right {
    width: 100%;
    float: none;
  }
}
</style>
