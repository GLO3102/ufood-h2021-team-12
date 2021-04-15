<template>
  <div id="app-home">
    <div class="search-container">
      <div class="search-options">
        <div class="select-div">
          <label>
            Price range :
            <select
              class="restaurant-selector"
              v-on:change="priceRangeChange($event)"
            >
              <option value="0">all</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          <label>
            Genre :
            <select
              class="restaurant-selector"
              v-on:change="genreChange($event)"
            >
              <option value="">all</option>
              <option value="ambiance">ambiance</option>
              <option value="bistro">bistro</option>
              <option value="desserts">desserts</option>
              <option value="fast-food">fast-food</option>
              <option value="fruits de mer">fruits de mer</option>
              <option value="hamburgers">hamburgers</option>
              <option value="mexicain">mexicain</option>
              <option value="santé">santé</option>
              <option value="végétarien">végétarien</option>
            </select>
          </label>
        </div>
        <button class="list-shortcut-button" v-on:click="bottom">
          View the restaurant list
        </button>
      </div>
    </div>
    <div class="restaurant-list" id="list">
      <div
        class="restaurant-entry"
        v-for="(restaurant, id) in restaurantSample"
        :key="id"
      >
        <div class="media-left">
          <img
            class="restaurant-image"
            :src="restaurant.pictures[0]"
            alt="Restaurant Image"
          />
        </div>
        <div class="media-content">
          <h1>
            {{ restaurant.name }}
          </h1>
          <div class="info-brackets">
            price range: {{ restaurant.price_range }} , rating:
            {{ restaurant.rating.toFixed(2) }}
          </div>
          <div class="genreText">
            <div v-for="genre in restaurant.genres" :key="genre">
              {{ genre }},
            </div>
          </div>
          <div class="visit-buttons-block">
            <button
              class="visit-button"
              v-on:click="visitRestaurant(restaurant.id)"
            >
              Visit this restaurant's page
            </button>
            <button class="visit-button" v-on:click="modal">
              Leave a review
            </button>
          </div>
          <div class="level-left">
            <a class="level-item">
              <p>
                <span class="adressText">{{ restaurant.address }}</span>
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from "./Modal";
import VModal from "vue-js-modal";
import Vue from "vue";
Vue.use(VModal);
import RestaurantList from "../services/RestaurantList";
export default {
  data: () => {
    return {
      restaurantSample: [],
      genreList: [],
      price: 0,
      genre: ""
    };
  },
  async created() {
    const response = await RestaurantList.getRestaurantList();
    this.restaurantSample = response.items;
  },
  methods: {
    visitRestaurant: function(id) {
      window.location.href = `/#/restaurant?id=${id}`;
    },
    modal: function() {
      this.$modal.show(Modal);
    },
    bottom: function() {
      document.getElementById("list").scrollIntoView({ behavior: "smooth" });
      if (this.restaurantSample.length === 0)
        alert("Unfortunately, no restaurant fits this price range and genre.");
    },
    async priceRangeChange(event) {
      const response = await RestaurantList.getRestaurantList();
      this.restaurantSample = response.items;
      this.price = event.target.value;
      var p = this.price;
      var g = this.genre;
      if (this.price != 0 && this.genre != "")
        this.restaurantSample = this.restaurantSample.filter(function(item) {
          return item.price_range == p && item.genres.indexOf(g) >= 0;
        });
      else if (this.price != 0)
        this.restaurantSample = this.restaurantSample.filter(function(item) {
          return item.price_range == p;
        });
      if (this.restaurantSample.length === 0)
        alert("Unfortunately, no restaurant fits this price range and genre.");
    },
    async genreChange(event) {
      const response = await RestaurantList.getRestaurantList();
      this.restaurantSample = response.items;
      this.genre = event.target.value;
      var p = this.price;
      var g = this.genre;
      if (this.price != 0 && this.genre != "")
        this.restaurantSample = this.restaurantSample.filter(function(item) {
          return item.price_range == p && item.genres.indexOf(g) >= 0;
        });
      else if (this.genre != "")
        this.restaurantSample = this.restaurantSample.filter(function(item) {
          return item.genres.indexOf(g) >= 0;
        });
      if (this.restaurantSample.length === 0)
        alert("Unfortunately, no restaurant fits this price range and genre.");
    }
  }
};
</script>
<style>
@import "style/home.css";
</style>
