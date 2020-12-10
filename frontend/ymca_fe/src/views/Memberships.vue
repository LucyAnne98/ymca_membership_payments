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
        <tr >
          <th v-bind:key="col"
              class="center-content"
              v-for="col in columns_display">
            {{ col }}
          </th>
          <th class="center-content" >
            {{ sendReminder }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-bind:key="member.id"
          v-for="member in members"
        >
          <td
            v-bind:key="member[col]"
            v-for="col in columns"
            class="center-content"
          >
            {{ member[col] }}
          </td>
          <td class="center-content">
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


    <!--modals-->
    <b-modal
      id="add-payment"
      ref="add-payment"
      hide-footer
      hide-header
    >
      <new-payment
        @close="closeModal"
        @closeRefresh="closeRefresh"
      />
    </b-modal>


  </b-container>
</template>

<script>

import NewPayment from "./NewPayment";
export default {
  name: "Memberships",
  components: {NewPayment},
  data: function () {
    return {
      members: [
        {
          id: 0,
          email: "lucieaprochazkova@gmail.com",
          name: "Lucie Procházková",
          type: "student",
          validity: "01. 01. 2021"
        },
        {
          id: 1,
          email: "info@ymcadap.cz",
          name: "Ondřej Strádal",
          type: "normal",
          validity: "01. 01. 2021"
        }
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



    };
  },
  mounted() {
    // eslint-disable-next-line no-undef
    axiosStatic
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
      axiosStatic.post(`${this.$store.state.apiUrl}/remind/`+ this.$store.state.user.ymcaID + `/${id}`)
      .catch(e => {
        console.log(e)
      })
    },
    closeRefresh: function () {
      this.$refs['add-payment'].hide();
      this.$router.push('/memberships');
      this.$router.go(0);
    },
    closeModal: function () {
      this.$router.push('/memberships');
      this.$refs['add-payment'].hide();
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