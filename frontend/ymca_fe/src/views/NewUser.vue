<template>
  <b-form
      @submit.prevent="createUser"
  >
    <h3>
      New user
    </h3>
    <b-alert
      variant="danger"
      v-model="isPasswordMismatch"
      dismissible
    >
      Password mismatch
    </b-alert>

    <b-form-group
      id="new-user-ymca"
      class="rounded-pill"
      label="YMCA"
    >
      <b-form-select
        v-model="ymca"
        :options="mapYMCAs()"
        required
        class="rounded-pill"
      >
      </b-form-select>
    </b-form-group>
    <b-form-group
      id="user-email"
      label="E-mail"
      label-for="user-email"
    >
      <b-form-input
          id="user-email"
          type="email"
          v-model="email"
          placeholder="for@example.com"
          class="rounded-pill"
          required
      />
    </b-form-group>
    <b-form-group
        id="user-password"
        label="Password"
        label-for="user-pasword"
    >
      <b-form-input
          id="user-password"
          type="password"
          v-model="password"
          placeholder="Password"
          class="rounded-pill"
          required
      />
    </b-form-group>
    <b-form-group
        id="user-password-check"
        label="Password check"
        label-for="user-password"
    >
      <b-form-input
          id="user-password-check"
          type="password"
          v-model="passwordCheck"
          placeholder="Password check"
          class="rounded-pill"
          required
      />
    </b-form-group>
    <b-button
        type="submit"
        variant="ymca-fe"
        class="rounded-pill"
    >
      Create
    </b-button>
  </b-form>
</template>

<script>
import axios from "axios";

export default {
  name: "NewUser",
  data() {
    return {
      ymca: -1,
      email: null,
      password: "",
      passwordCheck: "",
      isPasswordMismatch: false,
      YMCAs: [
        {
          name: "DAP",
          id: 0
        },
        {
          name: "Praha",
          id: 1
        }
      ],
    }
  },
  created() {
    axios.get(this.$store.state.apiUrl + `/ymcas`)
        .then(response => {
          this.YMCAs = response.data.ymcas;

        })
        .catch(e => console.log(e))
  },
  methods: {
    mapYMCAs() {
      return this.YMCAs.map(ymca => ({value: ymca.id, text: ymca.name}));
    },
    createUser() {
      this.isPasswordMismatch = this.password !== this.passwordCheck;
      if (!this.isPasswordMismatch) {
            axios.put(this.$store.state.apiUrl + `/users/`,
                {
                  ymcaId: this.ymca,
                  email: this.email,
                  password: this.password,
                })
      }
    }
  }
}
</script>