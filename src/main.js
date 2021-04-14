import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from '@/plugins/vuetify' // path to vuetify export
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  vuetify,
}).$mount("#app");
