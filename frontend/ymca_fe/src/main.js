import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import axiosApi  from "axios";
import VueAxios from "vue-axios";


const axios = axiosApi.create({
    baseURL: store.state.apiUrl,

});

//Use the window object to make it available globally.
window.axios = axios;
Vue.config.productionTip = false;


Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
