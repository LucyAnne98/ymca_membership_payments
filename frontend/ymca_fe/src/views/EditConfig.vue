<template>
  <b-container>
    <b-form
        @submit.prevent="submitEdit"
    >
      <h1>Edit {{config.type}} </h1>
      <b-form-group
        id="price-edit"
        :label="priceText"
        class="rounded-pill"
      >
        <b-form-input
          id="price-edit"
          v-model="price"
          type="text"
          required
          :placeholder="config.price"
          class="rounded-pill"
        />
      </b-form-group>
      <b-form-group
          id="validity-edit"
          :label="validityText"
          class="rounded-pill"
      >
        <b-form-input
            id="price-edit"
            v-model="validity"
            type="number"
            required
            :placeholder="config.validity"
            class="rounded-pill"
        />
      </b-form-group>
      <b-button
          type="submit"
          variant="ymca-fe"
          class="rounded-pill"
      >
        Edit
      </b-button>
    </b-form>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "EditConfig",
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      price: null,
      validity: null,
    }
  },
  computed: {
    priceText() {
      return this.$store.state.price;
    },
    validityText() {
      return this.$store.state.validityPeriod;
    }
  },
  methods: {
    submitEdit() {
      let self = this
      axios.post(this.$store.state.apiUrl + `/config`, {
        ymca: self.$store.state.user.ymcaID, type: self.config.type, price: self.price, validity: self.validity
      })
      //this.$emit('closeRefresh');

    }
  }
}
</script>

<style scoped>

</style>