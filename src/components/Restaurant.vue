<template>
  <div id="restaurantContent">
    <signIn v-model="connection" v-if="!hasSignedIn" />
    <div class="restaurant-data" v-if="this.canDisplayRestaurantData">
      <div class="restaurant-banner-core">
        <h1 class="restaurant-banner-name">{{ this.fetched.name }}</h1>
        <div class="favorite-bar">
          <div>Favorites:</div>
          <v-select
            multiple
            v-model="favoriteList"
            :options="favoriteOptions"
            @input="modifyFavorites"
          />
        </div>
        <div class="restaurant-banner-address-info">
          <div class="restaurant-banner-address-info-upper">
            <div>
              <a
                :href="
                  'https://www.google.com/maps/search/?api=1&query=' +
                    this.address_formatted +
                    '&query_place_id=' +
                    this.fetched.place_id
                "
                >{{ this.fetched.address }}</a
              >
            </div>
            <div class="flex-separator"></div>
            <div>
              <a :href="'callto:' + this.telHref"
                >call {{ this.fetched.tel }}</a
              >
            </div>
          </div>
        </div>
        <div class="restaurant-banner-ratings">
          <div class="flex-separator"></div>
          <div class="rating-block">
            <div
              class="restaurant-rating color-scheme-global content-flex-centered"
            >
              <h3 class="rating-header">Restaurant rating</h3>
              <div class="rating-element-format">
                {{ this.fetched.rating.toFixed(2) }}
              </div>
            </div>
          </div>
          <div class="flex-separator"></div>
          <div class="flex-separator"></div>
          <div class="rating-block">
            <div
              class="restaurant-rating color-scheme-global content-flex-centered"
            >
              <h3 class="rating-header">Cost rating</h3>
              <div class="rating-element-format">
                {{ this.fetched.price_range.toFixed(2) }}
              </div>
            </div>
          </div>
          <div class="flex-separator"></div>
        </div>
        <div class="restaurant-banner-tags content-flex-centered">
          |<a
            class="restaurantDescriptorTag"
            v-for="tag in this.fetched.genres"
            v-bind:key="tag"
            >{{ tag }}|</a
          >
        </div>
      </div>
      <div class="restaurant-info-core">
        <div class="restaurant-info-dual-panel">
          <div class="restaurant-photo-gallery-core">
            <div
              class="row"
              v-for="(photoRow, idx) in this.formattedPhoto"
              v-bind:key="idx"
            >
              <div
                class="column"
                v-for="photoColumn in photoRow"
                v-bind:key="photoColumn"
              >
                <img :src="photoColumn" :alt="''" />
              </div>
            </div>
          </div>
          <div class="restaurant-hours-core content-flex-centered">
            <div class="restaurant-hours-column-setter">
              <div class="restaurant-hours-column">
                <h4
                  class="restaurant-hours-time-slot-header content-flex-centered"
                >
                  Opening Hours
                </h4>
                <div class="restaurant-hours-time-table content-flex-centered">
                  <div
                    class="restaurant-hours-time-slot"
                    v-for="(hourTimeSlot, day) in this.fetched.opening_hours"
                    v-bind:key="day"
                  >
                    <div class="restaurant-hours-day-of-the-week">
                      {{ day }}
                    </div>
                    <div class="flex-separator"></div>
                    <div class="restaurant-hours-open">{{ hourTimeSlot }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <iframe
          class="google-maps-embed"
          :src="
            'https://www.google.com/maps/embed/v1/place?key=AIzaSyDTekFbXJ_GdKSznFTcQ5Nvgo9-6MeJzaI&q=place_id:' +
              fetched.place_id
          "
        ></iframe>
      </div>
      <SuggestionList
        :currentRestaurantGenre="this.fetched.genres[0]"
        :currentRestaurantName="this.fetched.name"
        class="suggested"
      />
      <div class="restaurant-social-core">
        <div class="restaurant-review-core">
          <CommentSection
            :currentRestaurantId="this.fetched.id"
            v-bind:id="this.id"
          />
        </div>
      </div>
    </div>
    <div class="page-not-found" v-if="!this.canDisplayRestaurantData">
      <h1>Sorry, we can't show you this restaurant at this time.</h1>
    </div>
  </div>
</template>
<script>
import CommentSection from "@/components/CommentSection";
import Vue from "vue";
import vSelect from "vue-select";
import SuggestionList from "./SuggestionList";
import Api from "@/services/api";
import SignIn from "@/components/connection/signIn";

Vue.component("v-select", vSelect);
const api = new Api();
export default {
  components: { SignIn, CommentSection, SuggestionList },
  data: () => {
    return {
      canDisplayRestaurantData: null,
      loading: true,
      fetched: null,
      items: null,
      id: "",
      formattedPhoto: [],
      telHref: "",
      address_formatted: "",
      favoriteList: [],
      favoriteOptions: [],
      lastState:[],
      currentRestaurantGenre: "",
      currentRestaurantId: "",
      connection: true,
      invalidToken: true,
      hasSignedIn: true
    };
  },
  async created() {
    //get user with token and check if id is present
    const token = this.$cookies.get("token");
    const user = await api.getTokenInfo(token);
    if (user && user.id.length > 0) {
      api.registerToken(token);
      this.invalidToken = false;
      api.registerUser(user);
      const queryString = window.location.href;
      const query = queryString
        .split("/")
        .pop()
        .split("?")
        .pop();
      const urlParams = new URLSearchParams(query);
      this.id = urlParams.get("id");
      await this.populateFavoriteList();
      this.fetched = await api.getRestaurant(this.id);
      if (this.fetched === undefined) {
        this.canDisplayRestaurantData = false;
      } else {
        let array = this.fetched.pictures;
        var i,
          j,
          temparray,
          chunk = 3;
        this.formattedPhoto = [];
        for (i = 0, j = array.length; i < j; i += chunk) {
          temparray = array.slice(i, i + chunk);
          this.formattedPhoto.push(temparray);
        }

        this.telHref = ("" + this.fetched.tel).replace(/\D/g, "");

        this.address_formatted = this.fetched.address.replace(" ", "+");
        this.canDisplayRestaurantData = true;
      }
    } else {
      this.invalidToken = true;
      this.hasSignedIn = false;
    }
  },
  methods: {
    async modifyFavorites() {
      if (this.lastState.length > this.favoriteList.length) {
        let tempFavoriteList = this.favoriteList;
        let removed = this.lastState.filter(function(v) {
          return tempFavoriteList.indexOf(v) === -1;
        });
        await api.deleteRestaurant(removed[0].id, this.id);
      } else {
        await api.createRestaurant(
          this.favoriteList[this.favoriteList.length - 1].id,
          this.id
        );
      }
      await this.populateFavoriteList();
    },
    async populateFavoriteList() {
      let tempfavoriteOptions = (await api.getFavorites(200)).items;
      tempfavoriteOptions.forEach(option => {
        option.label = option.name;
      });
      let restaurantId = this.id;
      this.favoriteOptions = tempfavoriteOptions;
      let filtered = this.favoriteOptions.filter(list => {
        let found = false;
        list.restaurants.forEach(restaurant => {
          if (restaurant.id === restaurantId) {
            found = true;
          }
        });
        return found;
      });
      this.favoriteList = filtered;
      this.favoriteList.forEach(f =>
        this.favoriteOptions.splice(
          this.favoriteOptions.findIndex(e => e.id === f.id),
          1
        )
      );
      this.lastState = this.favoriteList;
    }
  }
};
</script>

<style>
@import "style/restaurant.css";
</style>
