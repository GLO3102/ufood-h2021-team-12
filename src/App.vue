<template>
  <div id="app">
    <nav-menu v-if="isLogged() === true"></nav-menu>
    <router-view></router-view>
  </div>
</template>

<script>

//import Cookies from 'js-cookie'
import Navigation from "@/components/Navigation";
export default {
  name: "app",
  components: {
    "nav-menu": Navigation
  },
  methods:{
    isLogged() {
      //if(!Cookies.get("token"))
        //return false
      //else
        return true
    }
  }
  
};

</script>

<style></style>
