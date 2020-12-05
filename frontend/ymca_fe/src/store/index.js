import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    //General
    apiUrl: "TODO", //TODO
    isAuthenticated: true,
    user: null,
    //MembershipCheck
    membershipCheckHeadline: "Zkontrolujte si své členství",
    checkNameLabel: "Zadejte jméno",
    checkEmailLabel: "Zadejte email",
    checkYMCALabel: "Zadejte jméno vaší Ymky",
    searchText: "Hledej",
    //Navigation
    membershipLabel: "Správa plateb",
    checkLabel: "Stav členství",
    ymcaSettingLabel: "Správa YMCA"

   },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    }
  }

});