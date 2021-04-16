<template>
  <div id="app-home">
    <signIn v-model="connection" v-if="unvalidToken" />
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
        <div class="search-options-inputs">
          <button class="list-shortcut-button" v-on:click="bottom">
            View the restaurant {{ mapChecked ? "map" : "list" }}
          </button>
          <label>
            Map mode
            <input
              class="map-checkbox"
              type="checkbox"
              id="mapCheckbox"
              v-model="mapChecked"
            />
          </label>
        </div>
      </div>
    </div>
    <div
      v-bind:style="mapChecked ? 'display: none' : 'display: block'"
      class="restaurant-list"
      id="list"
    >
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
            <button class="visit-button" v-on:click="modal(restaurant.id)">
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
    <div
      v-bind:style="mapChecked ? 'display: block' : 'display: none'"
      class="home-map"
      id="homeMap"
    ></div>
  </div>
</template>
<script>
import Modal from "./Modal";
import VModal from "vue-js-modal";
import Vue from "vue";
import { Loader } from "@googlemaps/js-api-loader";
Vue.use(VModal);
const api = new Api();
import RestaurantList from "../services/RestaurantList";
import SignIn from "@/components/connection/signIn";
import Api from "@/services/api";
export default {
  components: { SignIn },
  data: () => {
    return {
      map: null,
      gmapLoader: new Loader({
        apiKey: "AIzaSyDTekFbXJ_GdKSznFTcQ5Nvgo9-6MeJzaI",
        version: "weekly",
        libraries: ["places"]
      }),
      markers: [],
      latLng: { lat: 46.8164419, lng: -71.336886 },
      locationMarker: null,
      restaurantSample: [],
      genreList: [],
      price: 0,
      genre: "",
      mapChecked: false,
      connection: true,
      unvalidToken: true
    };
  },
  async created() {
    const response = await RestaurantList.getRestaurantList();
    this.restaurantSample = response.items;
    await this.setMarkersToSamples();
    //get user with token and check if id is present
    const token = this.$cookies.get("token");
    const user = await api.getUser(token);
    if (user.id.length > 0) {
      this.unvalidToken = false;
    } else {
      this.unvalidToken = true;
    }
  },

  async mounted() {
    await this.getLocation();
    console.log(this.latLng);
    let latLng = this.latLng;
    console.log(latLng);
    try {
      this.gmapLoader.load().then(() => {
        // eslint-disable-next-line no-undef
        this.map = new google.maps.Map(document.getElementById("homeMap"), {
          center: latLng,
          zoom: 12
        });
        // eslint-disable-next-line no-undef
        this.locationMarker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: "Your location",
          icon:
            "https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png"
        });
      });
    } catch (error) {
      console.error(error);
    }
  },

  methods: {
    visitRestaurant: function(id) {
      window.location.href = `/#/restaurant?id=${id}`;
    },
    modal: function(id) {
      this.$modal.show(Modal,{restaurantid: id});
    },
    bottom: function() {
      document
        .getElementById(this.mapChecked ? "homeMap" : "list")
        .scrollIntoView({ behavior: "smooth" });
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
      await this.setMarkersToSamples();
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
      await this.setMarkersToSamples();
    },
    async getLocation() {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(this.addLocation);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
    addLocation(position) {
      this.latLng.lat = position.coords.latitude;
      this.latLng.lng = position.coords.longitude;
    },
    async setMarkersToSamples() {
      let map = this.map;
      let visitRestaurant = this.visitRestaurant;
      let generateContentString = this.generateContentString;
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
      let markers = this.markers;
      this.gmapLoader.load().then(() => {
        // eslint-disable-next-line no-undef
        var service = new google.maps.places.PlacesService(map);
        this.restaurantSample.forEach(restaurant => {
          service.getDetails(
            {
              placeId: restaurant.place_id
            },
            // eslint-disable-next-line no-unused-vars
            function(result, status) {
              let marker =
                // eslint-disable-next-line no-undef
                new google.maps.Marker({
                  map: map,
                  place: {
                    placeId: restaurant.place_id,
                    location: result.geometry.location
                  },
                  title: restaurant.name
                });
              // eslint-disable-next-line no-undef
              let infowindow = new google.maps.InfoWindow({
                content: generateContentString(restaurant)
              });
              // eslint-disable-next-line no-undef
              google.maps.event.addListener(marker, "mouseover", function() {
                infowindow.open(map, marker);
              });
              // eslint-disable-next-line no-undef
              google.maps.event.addListener(marker, "mouseout", function() {
                infowindow.close();
              });
              // eslint-disable-next-line no-undef
              google.maps.event.addListener(marker, "click", function() {
                visitRestaurant(restaurant.id);
              });
              markers.push(marker);
            }
          );
        });
      });
    },
    generateContentString(restaurant) {
      const imgSrc = restaurant.pictures[0];
      return `<div class="restaurant-entry-small">
      <div class="media-left">
        <img
          class="restaurant-image"
        :src="${imgSrc}"
           alt="Restaurant Image"
      />
    </div>
      <div class="media-content">
        <h1>
          ${restaurant.name}
        </h1>
        <div class="info-brackets">
          price range: ${restaurant.price_range} , rating:
          ${restaurant.rating.toFixed(2)}
        </div>
        <div class="genreText">
          ${restaurant.genres}
        </div>
        <div class="level-left">
            <a class="level-item">
                <p>
                <span class="adressText">${restaurant.address}</span>
                </p>
            </a>
        </div>
      </div>
    </div>
    </div>`;
    }
  }
};
</script>
<style>
@import "style/home.css";
</style>
