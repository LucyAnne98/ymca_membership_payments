<template>
  <b-container tag="main" id="membershipSettings">
    <b-row class="listHeader">
      <h1 class="page-info">
        {{ membershipLabel }}
      </h1>
      <div class="margin-right">
        <b-button v-b-modal="'add-payment'"
                  variant="ymca-fe"
                  class="rounded-pill"
        >
          {{ addPayment }}
        </b-button>
      </div>
    </b-row>
    <b-nav>
      <table id="membersTable">
        <thead>
        <tr>
          <th v-bind:key="col"
              v-for="col in columns_display">
            {{ col }}
          </th>
          <th>

          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-bind:key="member.id"
            v-for="member in members"
        >
          <td v-bind:key="member[col]"
              v-for="col in columns">
            {{ member[col] }}
          </td>
          <td>
            <b-button
                @click="remind(member.id)"
                variant="ymca-fe"
                class="rounded-pill"
            >
              {{ sendReminder }}
            </b-button>
          </td>
        </tr>
        </tbody>
      </table>
    </b-nav>

  </b-container>

</template>

<script>
import axios from "axios";

export default {
  name: "Memberships",
  data: function () {
    return {
      members: [
        {
          id: 0,
          email: "lucieaprochazkova@gmail.com",
          name: "Lucie Procházková",
          membershipType: "student",
          validity: "1.1.2021"
        },
        {
          id: 1,
          email: "info@ymcadap.cz",
          name: "Ondřej Strádal",
          membershipType: "pracující",
          validity: "1.1.2021"
        }
      ],
      columns: [
        "name",
        "membershipType",
        "validity"
      ],
      columns_display: [
        this.$store.state.name,
        this.$store.state.membershipType,
        this.$store.state.validity
      ],



    };
  },
  mounted() {
    // eslint-disable-next-line no-undef
    axios
        .get(this.$store.state.apiUrl + "/members/" + this.$store.state.user.ymcaID)
        .then(response => {
          this.members = response.data.members

        })
        .catch(() => {
          this.errored = true
        })
        .finally(() => this.loading = false)

  },
  methods: {
    remind: function (id) {
      axios.post(`${this.$store.state.apiUrl}/remind/${id}`)
      .catch(e => {
        console.log(e)
      })
    }
  },
  computed: {
    membershipLabel() {
      return this.$store.state.membershipLabel;
    },
    addPayment() {
      return this.$store.state.addPayment;
    },
    sendReminder() {
      return this.$store.state.sendReminder;
    }
  }
}
</script>
