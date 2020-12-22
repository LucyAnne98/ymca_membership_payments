<template>
  <b-form>
    <h3>{{ newPaymentLabel }}</h3>
    <b-row>
      <b-col>
        <b-form-group
            id="pay-name"
            :label="doNameLabel()"
            label-for="pay-name"
        >
          <b-form-input
              id="pay-name"
              type="text"
              required
              v-model="payName"
              placeholder="Jan"
              class="rounded-pill"
          />
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group
            id="pay-surname"
            :label="doSurnameLabel()"
            label-for="pay-surname"
        >
          <b-form-input
              id="pay-surname"
              type="text"
              required
              v-model="paySurname"
              placeholder="Jan"
              class="rounded-pill"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-form-group
        id="pay-email"
        :label="doEmailLabel()"
        label-for="pay-email"
    >
      <b-form-input
          id="pay-email"
          type="text"
          required
          v-model="payEmail"
          placeholder="for@example.com"
          class="rounded-pill"
      />
    </b-form-group>
    <b-form-group
        id="pay-value"
        :label="doValueLabel()"
        label-for="pay-email"
    >
      <b-form-input
          id="pay-value"
          type="number"
          required
          v-model="payValue"
          placeholder="250"
          class="rounded-pill"
      />
    </b-form-group>
    <b-form-group id="pay-type"
                  :label="doTypeLabel()"
                  label-for="group-selection-name"
    >
      <b-form-select v-model="payType"
                     :options="this.$store.state.types"
                     class="rounded-pill"
      />
    </b-form-group>


    <b-form-group
        id="pay-date"
        :label="doDateLabel()"
        label-for="date"
    >
      <b-form-input
          type="date" v-model="payDate"
          class="rounded-pill"
      />
    </b-form-group>
    <b-button
        @click="registerPayment()"
        variant="ymca-fe"
        class="rounded-pill"
    >
      {{ registerLabel }}
    </b-button>


  </b-form>
</template>

<script>
import axios from "axios";

export default {
  name: "NewPayment",
  data() {
    return {
      payName: "",
      paySurname: "",
      payEmail: "",
      payDate: null,
      payValue: 0,
      payType: null,
      result: null,
    }
  },
  methods: {
    doNameLabel() {
      return this.$store.state.nameLabel;
    },
    doSurnameLabel() {
      return this.$store.state.surnameLabel;
    },
    doEmailLabel() {
      return this.$store.state.emailLabel;
    },
    doValueLabel() {
      return this.$store.state.valueLabel;
    },
    doTypeLabel() {
      return this.$store.state.typeLabel;
    },
    doDateLabel() {
      return this.$store.state.dateLabel;
    },
    registerPayment() {
      let self = this;
      axios.post(this.$store.state.apiUrl + `/payments`, {
        id: this.$store.state.user.ymcaID,
        name: self.payName,
        surname: self.paySurname,
        email: self.payEmail,
        value: self.payValue,
        type: self.payType,
        date: self.payDate,
      })
        .catch(e => {
          console.log(e)
        })
        .then(
            response => {
              this.result = response.data;
            }
        );
    }

  },
  computed: {
    newPaymentLabel() {
      return this.$store.state.newPaymentLabel;
    },
    registerLabel() {
      return this.$store.state.registerLabel;
    }
  }
}
</script>