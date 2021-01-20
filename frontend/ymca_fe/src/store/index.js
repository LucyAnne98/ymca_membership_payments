import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    //General
    apiUrl: "TODO", //TODO
    isAuthenticated: true,
    isSuperAdmin: false,
    user: {
      ymcaID : 0,
    },
    types: ["student", "pracující", "rodina", "čestné"],
    //Login

    //MembershipCheck
    membershipCheckHeadline: "Zkontrolujte si své členství",
    nameLabel: "Zadejte jméno",
    surnameLabel: "Zadejte příjmení",
    emailLabel: "Zadejte email",
    YMCALabel: "Zadejte jméno vaší Ymky",
    searchText: "Hledej",
    //Navigation
    membershipLabel: "Správa plateb",
    checkLabel: "Stav členství",
    ymcaSettingLabel: "Správa YMCA",
    //MembershipSettings
    addPayment: "Nová platba",
    name: "Jméno",
    membershipType: "Typ členství",
    validity: "Platné do",
    sendReminder: "Pošli upomínku",
    //New Payment
    newPaymentLabel: "Nová platba",
    valueLabel: "Zadejte hodnotu platby",
    dateLabel: "Zadejte datum",
    typeLabel: "Zadejte typ členství",
    registerLabel: "Zapsat platbu",
    //Login
    loginErrorText: "Něco se nepovedlo. V případě opakovaných potíží kontaktujte správce systému.",
    //Configs
    price:"Cena",
    validityPeriod: "Doba platnosti v měsících",

  },
  mutations: {},
  actions: {
    async getUser({state, commit}) {
      try {
        let response = await axios.get(`${state.apiUrl}/me`, {withCredentials: true});

        commit('setUser', response.data);
        commit('setIsAuthenticated', true);
      } catch (error) {
        commit('setUser', []);
        commit('setIsAuthenticated', false);
      }
    },
    userLogin({state, commit}, {username, password, remember, callback}) {
      const data = {
        "username": username,
        "password": password,
        "remember": remember
      };
      axios.post(`${state.apiUrl}/users/identity`, data, {withCredentials: true}).then(() => {

        this.dispatch('getUser').then(() => {
          commit('setAuthenticationError', false);
          callback();
        });
      }).catch(() => {
        commit('setAuthenticationError', true);
      });
    },
    userRegister({state, commit}, data) {
      axios.put(`${state.apiUrl}/users`, data, {withCredentials: true}).then(() => {
        commit("setRegisterError", false);
        commit("setRegisterSuccess", true);
      }).catch((error) => {
        console.log(error);
      });
    },
    logout({state, commit}) {

      axios.delete(`${state.apiUrl}/users/identity`, {withCredentials: true});
      commit('setUser', []);
      commit('setIsAuthenticated', false);
      commit('setAuthenticationError', false);
    },
  },
  modules: {},
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    }
  }

});
