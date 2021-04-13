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
import RestaurantList from "../services/RestaurantList";
import Vue from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
Vue.component("vue-select", vSelect);
export default {
  data: () => ({
    name: "",
    nameList: [],
    selected:""
  }),
  async created() {
    const response = await RestaurantList.getRestaurantList();
    this.nameList = response.items;
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
