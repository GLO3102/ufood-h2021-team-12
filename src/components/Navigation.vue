<template>
  <nav>
    <!-- The navigation menu -->
    <div class="navbar" id="navbar">
      <router-link to="/" tag="div"
        ><a class="item_nav" href="#"
          ><i class="fa fa-fw fa-home"></i> Home</a
        ></router-link
      >
      <div>
        <a class="item_nav">
          <s href="#"><SearchBar class="searchbar"> </SearchBar></s
        ></a>
      </div>

      <div class="dropdown">
        <button class="dropbtn">
          {{ this.username }}
          <i class="fa fa-fw fa-user"></i>
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <router-link to="/user" tag="div"
            ><a class="item_nav">Profile</a>
          </router-link>
          <router-link to="/" tag="div"
            ><a class="item_nav" v-on:click="logout">Disconnect</a>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Api from "@/services/api";
import Cookies from "js-cookie";
import SearchBar from "./SearchBar";
const api = new Api()
export default {
  data: () => ({
    username: ""
  }),
  components: { SearchBar },
  async created() {
    const api = new Api();
    if (Cookies.get("token")) {
      const user = await api.getUser(Cookies.get("token"));
      this.username = user.name;
    }
  },
  methods: {
    async logout(){
      await api.logOut();
      this.$cookies.remove("token");
      location.reload();
    }
  }
};
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
* {
  box-sizing: border-box;
}
body {
  font-family: Arial, Helvetica, sans-serif;
}

.navbar {
  width: 100%;
  background-color: #555;
  overflow: visible;
}

.navbar s {
  float: left;

  color: white;
  text-decoration: none;
  font-size: 9px;
  width: 100%;
  text-align: center;
}
.navbar .item_nav {
  float: left;
  padding: 12px;
  color: white;
  text-decoration: none;
  font-size: 17px;
  width: 33%;
  text-align: center;
}

.searchbar {
  position: absolute;
  width: inherit;
}

.navbar .item_nav:hover {
  background-color: #000;
}
.navbar u:hover {
  background-color: #000;
}

.dropdown {
  float: initial;
  text-align: center;
  overflow: hidden;
}
.dropdown:hover {
  background-color: #000;
}
.dropdown .dropbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}
.dropdown-content {
  width: 33%;
  display: none;
  position: absolute;
  background-color: #555;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown-content .item_nav {
  float: left;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: center;
  width: 100%;
  color: white;
}
.dropdown:hover .dropdown-content {
  display: block;
}
@media screen and (max-width: 500px) {
  .navbar .item_nav {
    float: none;
    display: block;
    width: 100%;
    text-align: left;
  }
}
</style>
