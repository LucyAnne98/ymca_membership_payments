<template>
  <b-form
      @submit.prevent="submitCheck">
    <h3>{{ membershipCheckHeadline }}</h3>
    <b-row>
      <b-col>
        <b-form-group
            id="check-name"
            :label="doCheckNameLabel()"
            label-for="check-name"
        >
          <b-form-input
              id="check-name"
              type="text"
              required
              v-model="checkName"
              placeholder="Jan"
              class="rounded-pill"
          />
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group
            id="check-surname"
            :label="doCheckSurnameLabel()"
            label-for="check-name"
        >
          <b-form-input
              id="check-surname"
              type="text"
              required
              v-model="checkSurname"
              placeholder="Novák"
              class="rounded-pill"
          />
        </b-form-group>
      </b-col>
    </b-row>
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
          v-model="checkYMCA"
          placeholder="YMCA DAP"
          class="rounded-pill"
      />
    </b-form-group>

    <b-button
        type="submit"
        variant="ymca-fe"
        class="rounded-pill"
    >
      {{ sendText }}
    </b-button>


  </b-form>
</template>

<script>

export default {
  name: "MembershipCheck",
  data() {
    return {
      // data for sign
      checkName: "",
      checkSurname: "",
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
      return this.$store.state.nameLabel;
    },
    doCheckSurnameLabel() {
      return this.$store.state.surnameLabel;
    },
    doCheckEmailLabel() {
      return this.$store.state.emailLabel;
    },
    doCheckYMCALabel() {
      return this.$store.state.YMCALabel;
    },
    submitCheck() {
      axiosStatic.get(this.$store.state.apiUrl
          + `/check?name=` + this.checkName+ `&surname=` + this.checkSurname + `&email=` + this.checkEmail + `&ymca=` + this.checkYMCA)
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