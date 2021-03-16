<template>
  <div id="restaurantContent">
    <div class="restaurant" v-if="this.canDisplayRestaurantData">
      <div class="restaurant-banner-core">
        <h1 class="restaurant-banner-name">{{ this.rawApiInfo.name }}</h1>
        <div class="restaurant-banner-address-info">
          <div class="restaurant-banner-address-info-upper">
            <div>
              <a
                :href="
                  'https://www.google.com/maps/search/?api=1&query=' +
                    this.address_formatted +
                    '&query_place_id=' +
                    this.rawApiInfo.place_id
                "
                >{{ this.rawApiInfo.address }}</a
              >
            </div>
            <div class="flex-separator"></div>
            <div>
              <a :href="'callto:' + this.telHref"
                >call {{ this.rawApiInfo.tel }}</a
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
                {{ this.rawApiInfo.rating.toFixed(2) }}
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
                {{ this.rawApiInfo.price_range.toFixed(2) }}
              </div>
            </div>
          </div>
          <div class="flex-separator"></div>
        </div>
        <div class="restaurant-banner-tags content-flex-centered">
          |<a
            class="restaurantDescriptorTag"
            v-for="tag in this.rawApiInfo.genres"
            :href="tag.href"
            >{{ tag }}|</a
          >
        </div>
      </div>
      <div class="restaurant-info-core">
        <div class="restaurant-info-dual-panel">
          <div class="restaurant-photo-gallery-core">
            <div class="row" v-for="photoRow in this.formattedPhoto">
              <div class="column" v-for="photoColumn in photoRow">
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
                    v-for="(hourTimeSlot, day) in this.rawApiInfo.opening_hours"
                  >
                    <div class="restaurant-hours-day-of-the-week">{{ day }}</div>
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
              rawApiInfo.place_id
          "
        ></iframe>
      </div>
      <!-- Hardcoded social directly in the template for now, it will pull data from another location-->
      <div class="restaurant-social-core">
        <div class="restaurant-review-core">
          <div class="restaurant-review-block color-scheme-friend">
            <div class="restaurant-review">
              <div
                class="restaurant-review-profile-icon-holder content-flex-centered"
              >
                <img
                  class="restaurant-review-profile-icon"
                  src="@/assets/defaultIcon.png"
                  alt="Profile Icon"
                />
              </div>
              <div class="restaurant-review-right">
                <div class="restaurant-review-header">
                  <h3 class="restaurant-review-profile-name">My best friend</h3>
                  <div class="restaurant-review-spacer1"></div>
                  <h3 class="restaurant-review-name">★★★★★</h3>
                  <div class="restaurant-review-spacer2"></div>
                  <h3 class="restaurant-review-name">Best dine-in EVER!</h3>
                </div>
                <div class="restaurant-review-content">
                  Never I have ever tasted better!
                </div>
              </div>
            </div>
          </div>
          <div class="restaurant-review-block color-scheme-global">
            <div class="restaurant-review">
              <div
                class="restaurant-review-profile-icon-holder content-flex-centered"
              >
                <img
                  class="restaurant-review-profile-icon"
                  src="@/assets/defaultIcon.png"
                  alt="Profile Icon"
                />
              </div>
              <div class="restaurant-review-right">
                <div class="restaurant-review-header">
                  <h3 class="restaurant-review-profile-name">Terry</h3>
                  <div class="restaurant-review-spacer1"></div>
                  <h3 class="restaurant-review-name">★</h3>
                  <div class="restaurant-review-spacer2"></div>
                  <h3 class="restaurant-review-name">Laaaaaame</h3>
                </div>
                <div class="restaurant-review-content">
                  The food is bland
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- endOf Hardcoded social -->
    </div>
    <div class="page-not-found" v-if="!this.canDisplayRestaurantData && !loading">
      <h1>This is not the restaurant you're looking for</h1>
    </div>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      canDisplayRestaurantData: null,
      loading: true,
      rawApiInfo: null,
      formattedPhoto: [],
      telHref: "",
      adress_formatted: ""
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
    this.rawApiInfo = await fetch(
      "https://ufoodapi.herokuapp.com/unsecure/restaurants/" +
        urlParams.get("id")
    )
      .then(async response => {
        const data = await response.json();
        if (!response.ok) {
          this.canDisplayRestaurantData = false;
          this.error = (data && data.message) || response.statusText;
        } else {
          this.canDisplayRestaurantData = true;
          this.rawApiInfo = data;
          let array = this.rawApiInfo.pictures;
          var i,
            j,
            temparray,
            chunk = 3;
          this.formattedPhoto = [];
          for (i = 0, j = array.length; i < j; i += chunk) {
            temparray = array.slice(i, i + chunk);
            this.formattedPhoto.push(temparray);
          }

          this.telHref = ("" + this.rawApiInfo.tel).replace(/\D/g, "");

          this.address_formatted = this.rawApiInfo.address.replace(" ", "+");
        }
        this.loading = false;
      })
      .catch(function(error) {
        console.log(
          "Something has gone terribly wrong while fetching the API:"+error
        );
      });
  }
};
</script>

<style>
@import "style/restaurant.css";
</style>
