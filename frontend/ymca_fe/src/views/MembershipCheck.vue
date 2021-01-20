<template>
  <b-container>
    <b-form
        @submit.prevent="submitCheck"
    >
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
        <b-form-select
            id="check-ymca"
            type="ymca"
            v-model="checkYMCA"
            :options="mapYMCAs()"
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
    <div v-if="loadResults">
      <b-nav>
        <table id="membersTable">
          <thead>
          <tr>
            <th v-bind:key="col"
                class="center-content"
                v-for="col in columns_display">
              {{ col }}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-bind:key="res.id"
              v-for="res in results"
          >
            <td
                v-bind:key="res[col]"
                v-for="col in columns"
                class="center-content"
            >
              {{ res[col] }}
            </td>
          </tr>
          </tbody>
        </table>
      </b-nav>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";

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
      results: [
        {
          id: 0,
          email: "lucieaprochazkova@gmail.com",
          name: "Lucie Procházková",
          type: "student",
          validity: "01. 01. 2021"
        },
      ],
      columns: [
        "name",
        "type",
        "validity"
      ],
      columns_display: [
        this.$store.state.name,
        this.$store.state.membershipType,
        this.$store.state.validity
      ],
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

  computed: {

    membershipCheckHeadline() {
      return this.$store.state.membershipCheckHeadline;
    },
    sendText() {
      return this.$store.state.searchText;
    },

  },
  methods: {
    mapYMCAs() {
      return this.YMCAs.map(ymca => ({value: ymca.id, text: ymca.name}));
    },
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
      axios.get(this.$store.state.apiUrl
          + `/check?name=` + this.checkName + `&surname=` + this.checkSurname + `&email=` + this.checkEmail + `&ymca=` + this.checkYMCA)
          .then(response => {
            this.loadResults = true;
            this.results = response.data.results;
          })
          .catch(() => {
            this.resultFail = true;
            this.loadResults = true;
          });


    }
  }

}
</script>

<style scoped>

</style>