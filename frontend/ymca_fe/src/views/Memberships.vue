<template>
  <h3>
    {{ membershipLabel }}
  </h3>


</template>

<script>
export default {
  name: "Memberships",
  computed: {
    membershipLabel() {
      return this.$store.state.membershipLabel;
    }
  }
}
</script>

<style scoped>

</style>