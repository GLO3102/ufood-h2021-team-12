<template>
  <vue-select
    class="searchbar"
    label="name"
    :options="this.nameList"
    :value="selected"
    @input="setSelected"
  ></vue-select>
</template>

<script>
import Api from "@/services/api";
const api = new Api();
import Vue from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
Vue.component("vue-select", vSelect);
export default {
  data: () => ({
    name: "",
    nameList: [],
    selected: ""
  }),
  async created() {
    const token = await this.$cookies.get("token");
    const user = await api.getTokenInfo(token);
    if (user && user.id.length > 0) {
      api.registerToken(token);
      this.invalidToken = false;
      const response = await api.getRestaurants();
      this.nameList = response.items;
    } else {
      this.unvalidToken = true;
    }
  },
  methods: {
    setSelected(selected) {
      window.location.href = `/#/restaurant?id=${selected.id}`;
      window.location.reload(true);
    }
  }
};
</script>

<style>
.searchbar .vs__search::placeholder,
.searchbar .vs__dropdown-toggle,
.searchbar .vs__dropdown-menu {
  background: #dfe5fb;
  border: none;
  color: #394066;
  text-transform: lowercase;
  font-variant: small-caps;
}
</style>
