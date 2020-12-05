<template>
  <b-form
      @submit.prevent="submitCheck">
    <h3>{{ membershipCheckHeadline }}</h3>
    <b-form-group
        id="check-name"
        :label="doCheckNameLabel()"
        label-for="check-name"
    >
      <b-form-input
          id="login-username"
          type="text"
          required
          v-model="checkName"
          placeholder="Jan Novák"
          class="rounded-pill"
      />
    </b-form-group>
    <b-form-group
        id="check-email"
        :label="doCheckEmailLabel()"
        label-for="check-email"
    >
      <b-form-input
          id="check-email"
          type="email"
          required
          v-model="checkEmail"
          placeholder="for@example.com"
          class="rounded-pill"
      />
    </b-form-group>
    <b-form-group
        id="check-ymca"
        :label="doCheckYMCALabel()"
        label-for="check-ymca"
    >
      <b-form-input
          id="check-ymca"
          type="ymca"
          required
          v-model="checkYMCA"
          placeholder="YMCA DAP"
          class="rounded-pill"
      />
    </b-form-group>

    <b-button
        type="submit"
        variant="ymca_fe"
        class="rounded-pill"
    >
      {{ sendText }}
    </b-button>


  </b-form>
</template>

<script>
import axios from "axios"

export default {
  name: "MembershipCheck",
  data() {
    return {
      // data for sign
      checkName: "",
      checkEmail: "",
      checkYMCA: "",
      loadResults: false,
      resultFail: false,
      results: {},

    }
  },

  computed: {

    membershipCheckHeadline() {
      return this.$store.state.membershipCheckHeadline;
    },
    sendText() {
      return this.$store.state.searchText;
    },

  },
  methods: {

    doCheckNameLabel() {
      return this.$store.state.checkNameLabel;
    },
    doCheckEmailLabel() {
      return this.$store.state.checkEmailLabel;
    },
    doCheckYMCALabel() {
      return this.$store.state.checkYMCALabel;
    },
    submitCheck() {
      axios.get(this.$store.state.apiUrl + `/check?name=` + this.checkName + `&email=` + this.checkEmail + `&ymca=` + this.checkYMCA, {
        name: this.checkName,
        email: this.checkEmail,
        ymca: this.checkYMCA
      })
        .then(response => {
          this.loadResults = true;
          this.results = response.data.results;
        })
          .catch(() => {
            this.resultFail = true;
            this.loadResults = false;
          });


    }
  }

}
</script>

<style scoped>

</style>