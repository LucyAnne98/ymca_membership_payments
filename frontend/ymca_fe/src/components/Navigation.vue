<template>
  <b-container tag="header" fluid>
    <b-row class="top-header top-bar">
      <b-col class="text-right">
        <b-nav-item
          v-if="!isAuthenticated"
          to="/sign#sign-up-anchor"
          class="item"
        >
          Login
        </b-nav-item>
        <b-nav-item
          v-if="isAuthenticated"
          to="/memberships"
          class="item"
        >
          {{ membershipLabel }}
        </b-nav-item>
      </b-col>
      <b-col class="text-right">
        <b-nav-item
          v-if="!isAuthenticated"
          to="/check"
          class="item"
        >
          {{ checkLabel }}
        </b-nav-item>
        <b-nav-item
          v-if="isAuthenticated"
          to="/ymca-settings"
          class="item"
        >
          {{ ymcaSettingsLabel }}
        </b-nav-item>
      </b-col>
      <b-col>
        <b-nav-item
          to="/"
          class="item"
        >
          <b-img
            src="img/logo.png"
            alt="YMCA"
          />
        </b-nav-item>
      </b-col>
    </b-row>

  </b-container>


</template>

<script>
export default {
  name: "Navigation",
  props: {
    msg: String
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    membershipLabel() {
      return this.$store.state.membershipLabel;
    },
    checkLabel() {
      return this.$store.state.checkLabel;
    },
    ymcaSettingsLabel() {
      return this.$store.state.ymcaSettingLabel;
    }
  }

};
</script>
