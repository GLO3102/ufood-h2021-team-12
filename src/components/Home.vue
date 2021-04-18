<template>
  <div id="app-home">
    <signIn v-model="connection" v-if="!hasSignedIn" />
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
              @change="renderMap()"
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
import SignIn from "@/components/connection/signIn";
import Api from "@/services/api";
export default {
  components: { SignIn },
  data: () => {
    return {
      map: null,
      gmapLoader: new Loader({
        apiKey: "AIzaSyDTekFbXJ_GdKSznFTcQ5Nvgo9-6MeJzaI",
        version: "weekly"
      }),
      markers: [],
      latLng: null,
      locationMarker: null,
      gotGeoLocation: false,
      mapRendered: false,
      restaurantSample: [],
      genreList: [],
      price: 0,
      genre: "",
      mapChecked: false,
      connection: true,
      hasSignedIn: true,
      invalidToken: true
    };
  },
  async created() {
    //get user with token and check if id is present
    const token = await this.$cookies.get("token");
    let user = await api.getTokenInfo(token);
    if (user && user.id.length > 0) {
      this.invalidToken = false;
      api.registerToken(token);
      await this.adjustSampleByLocation();
      this.latLng = this.getLocation();
    } else {
      this.invalidToken = true;
      this.hasSignedIn = false;
    }
  },

  methods: {
    async renderMap() {
      let latLng = this.latLng;
      let gotGeoLocation = this.gotGeoLocation;
      let mapOnDrag = this.mapOnDrag;
      if (!this.mapRendered) {
        try {
          await this.gmapLoader.load().then(() => {
            // eslint-disable-next-line no-undef
            this.map = new google.maps.Map(document.getElementById("homeMap"), {
              center: latLng,
              zoom: 12
            });
            // eslint-disable-next-line no-undef
            google.maps.event.addListener(this.map, "dragend", mapOnDrag);
            if (gotGeoLocation) {
              // eslint-disable-next-line no-undef
              this.locationMarker = new google.maps.Marker({
                position: latLng,
                map: this.map,
                title: "Your location",
                icon:
                  "https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png"
              });
            }
          });
          let response;
          if (this.mapChecked) {
            response = await api.getRestaurantsFromLocation(
              this.map.center.lat(),
              this.map.center.lng(),
              this.map.zoom
            );
          } else {
            response = await api.getRestaurants();
          }
          this.restaurantSample = response.items;
          await this.setMarkersToSamples();
        } catch (error) {
          console.error(error);
        }
      }
      this.mapRendered = true;
    },
    async mapOnDrag() {
      await this.adjustSampleByLocation();
      this.cullByPrice();
      this.cullByGenre();
      await this.setMarkersToSamples();
    },
    visitRestaurant: function(id) {
      window.location.href = `/#/restaurant?id=${id}`;
    },
    modal: function(id) {
      this.$modal.show(Modal, { restaurantid: id });
    },
    bottom: function() {
      document
        .getElementById(this.mapChecked ? "homeMap" : "list")
        .scrollIntoView({ behavior: "smooth" });
      if (this.restaurantSample.length === 0)
        alert("Unfortunately, no restaurant fits this price range and genre.");
    },
    async priceRangeChange(event) {
      await this.adjustSampleByLocation();
      this.price = event.target.value;
      this.cullByPrice();
      if (this.restaurantSample.length === 0)
        alert("Unfortunately, no restaurant fits this price range and genre.");
      if (this.mapRendered) {
        await this.setMarkersToSamples();
      }
    },
    cullByPrice() {
      let p = this.price;
      let g = this.genre;
      if (this.price != 0 && this.genre != "")
        this.restaurantSample = this.restaurantSample.filter(function(item) {
          return item.price_range == p && item.genres.indexOf(g) >= 0;
        });
      else if (this.price != 0)
        this.restaurantSample = this.restaurantSample.filter(function(item) {
          return item.price_range == p;
        });
    },
    async genreChange(event) {
      await this.adjustSampleByLocation();
      this.genre = event.target.value;
      this.cullByGenre();
      if (this.restaurantSample.length === 0)
        alert("Unfortunately, no restaurant fits this price range and genre.");
      if (this.mapRendered) {
        await this.setMarkersToSamples();
      }
    },
    cullByGenre() {
      let p = this.price;
      let g = this.genre;
      if (this.price != 0 && this.genre != "")
        this.restaurantSample = this.restaurantSample.filter(function(item) {
          return item.price_range == p && item.genres.indexOf(g) >= 0;
        });
      else if (this.genre != "")
        this.restaurantSample = this.restaurantSample.filter(function(item) {
          return item.genres.indexOf(g) >= 0;
        });
    },
    async getLocation() {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(
          this.addLocation,
          this.defaultLatLng
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
    async adjustSampleByLocation() {
      let response;
      if (this.mapChecked) {
        response = await api.getRestaurantsFromLocation(
          this.map.center.lat(),
          this.map.center.lng(),
          this.map.zoom
        );
      } else {
        response = await api.getRestaurants();
      }
      this.restaurantSample = response.items;
    },
    addLocation(position) {
      this.latLng.lat = position.coords.latitude;
      this.latLng.lng = position.coords.longitude;
      this.gotGeoLocation = true;
    },
    defaultLatLng(error) {
      console.log(error);
      this.latLng.lat = 46.8164419;
      this.latLng.lng = -71.336886;
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
        this.restaurantSample.forEach(restaurant => {
          let lnglat = {
            lng: restaurant.location.coordinates[0],
            lat: restaurant.location.coordinates[1]
          };
          // eslint-disable-next-line no-undef
          let marker = new google.maps.Marker({
            map: map,
            position: lnglat,
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
