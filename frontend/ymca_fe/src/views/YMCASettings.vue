<template>
 <b-container>
   <b-row class="listHeader">
     <h1 class="page-info">
       {{ settingsLabel }}
     </h1>
   </b-row>
   <b-nav>
     <table id="settingsTable">
       <thead>
       <tr >
         <th v-bind:key="col"
             class="center-content"
             v-for="col in columns_display">
           {{ col }}
         </th>
         <th class="center-content" >
           Edit
         </th>
       </tr>
       </thead>
       <tbody>
       <tr
           v-bind:key="config.id"
           v-for="config in configs"
       >
         <td
             v-bind:key="config[col]"
             v-for="col in columns"
             class="center-content"
         >
           {{ config[col] }}
         </td>
         <td class="center-content">
           <b-button
               @click="edit(config)"
               variant="ymca-fe"
               class="rounded-pill"
           >
             Edit
           </b-button>
         </td>
       </tr>
       </tbody>
     </table>
   </b-nav>



   <b-modal
       id="edit-config"
       ref="edit-config"
       hide-footer
       hide-header
   >
     <edit-config :config="toEdit"
         @close="closeModal"
         @closeRefresh="closeRefresh"
     />
   </b-modal>

 </b-container>
</template>

<script>
import axios from "axios";
import EditConfig from "./EditConfig";
export default {
  name: "YMCASettings",
  components : {EditConfig},
  data: function () {
    return {
      configs: [
        {
          type : "student",
          price : 350,
          validity : 12
        },
        {
          type : "normal",
          price : 400,
          validity : 12
        },
        {
          type : "family",
          price : 450,
          validity : 12
        },
      ],
      columns: [
        "type",
        "price",
        "validity"
      ],
      columns_display: [
        this.$store.state.membershipType,
        this.$store.state.price,
        this.$store.state.validityPeriod
      ],
      toEdit: {},
      editing: false,
    };
  },
  mounted() {
    // eslint-disable-next-line no-undef
    axios
        .get(this.$store.state.apiUrl + "/config")
        .then(response => {
          this.configs = response.data.configs

        })
        .catch(() => {
          this.errored = true
        })
        .finally(() => this.loading = false)

  },
  computed: {
    settingsLabel() {
      return this.$store.state.ymcaSettingLabel
    }
  },
  methods: {
    edit: function (config) {
      this.toEdit = config;
      this.$refs['edit-config'].show();
    },
    closeRefresh: function () {
      this.$refs['edit-config'].hide();
      this.$router.push('/ymca-settings');
      this.$router.go(0);
    },
    closeModal: function () {
      this.$router.push('/ymca-settings');
      this.$refs['edit-config'].hide();
    }
  }
}
</script>

<style scoped>

</style>