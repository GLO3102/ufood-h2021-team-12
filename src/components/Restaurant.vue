<template>
  <div id="restaurantContent">
    <div class="restaurant" v-if="this.canDisplayRestaurantData">
      <div class="restaurant-banner-core">
        <h1 class="restaurant-banner-name">{{ this.fetched.name }}</h1>
        <div class="favorite-bar">
          <div>Favorites:</div>
          <v-select
            multiple
            v-model="favoriteList"
            :options="['My Dummy List', 'My Dummiest List', '+ Add New List']"
            @input="updateFavoriteList"
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
      <div class="restaurant-social-core">
        <div class="restaurant-review-core">
          <CommentSection v-bind:id="this.id" />
        </div>
      </div>
    </div>
    <div class="page-not-found" v-if="!this.canDisplayRestaurantData">
      <h1>Sorry, we can't show you this restaurant at this time.</h1>
    </div>
    <SuggestionList
      :currentRestaurantGenre="this.fetched.genres[0]"
      :currentRestaurantName="this.fetched.name"
      class="suggested"
    />
  </div>
</template>
<script>

import CommentSection from "@/components/CommentSection";
import UFoodApi from "@/services/UFoodApi";
import Vue from "vue";
import vSelect from "vue-select";
import SuggestionList from "./SuggestionList";

Vue.component("v-select", vSelect);

export default {
  components: { CommentSection, SuggestionList },
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
      favoriteList: "",
      currentRestaurantGenre: ""
    };
  },
  async created() {
    const queryString = window.location.href;
    const query = queryString
      .split("/")
      .pop()
      .split("?")
      .pop();
    const urlParams = new URLSearchParams(query);
    this.id = urlParams.get("id");
    this.fetched = await UFoodApi.betterFetch("restaurants/" + this.id, false);
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
  },
  methods: {
    updateFavoriteList() {
      if (
        this.favoriteList[this.favoriteList.length - 1] !== "+ Add New List"
      ) {
        console.log("Now in " + this.favoriteList);
      } else {
        this.favoriteList.pop();
        console.log("TODO: show prompt and add to list");
      }
    }
  }
};
</script>

<style>
@import "style/restaurant.css";
</style>
