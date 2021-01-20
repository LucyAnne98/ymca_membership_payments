<template>
  <b-form
      @submit.prevent="loginUser"
  >
    <h2>
      Login
    </h2>
    <b-alert
        variant="danger"
        v-model="isLoginError"
        dismissible
    >
      {{ loginErrorText }}
    </b-alert>

    <b-form-group
        id="user-name-login"
        class="rounded-pill"
        label="Username"
    >
      <b-form-input
          v-model="login"
          required
          placeholder="your@email.com"
          class="rounded-pill"
      >
      </b-form-input>
    </b-form-group>
    <b-form-group
        id="password-login"
        label="Password"
        label-for="user-email"
    >
      <b-form-input
          id="password-login"
          type="password"
          v-model="password"
          placeholder="•••••••••••"
          class="rounded-pill"
          required
      />
    </b-form-group>

    <b-button
        type="submit"
        variant="ymca-fe"
        class="rounded-pill"
    >
      Log in
    </b-button>
  </b-form>
</template>

<script>
export default {
name: "Login",
  data(){
  return {
    isLoginError: false,
    login: "",
    password: "",

  }
  },
  methods: {
    loginErrorText() {
      return this.$store.state.loginErrorText;
    },
    loginUser() {
        let self = this;

        this.$store.dispatch('userLogin', {
          username: self.login,
          password: self.password,
          remember: false,
        });
        this.$emit('close');
    }
  }
}
</script>

<style scoped>

</style>