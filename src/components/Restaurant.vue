<template>
  <div>
    <div class="restaurant-banner-core">
      <h1 class="restaurant-banner-name">{{ restaurant.name }}</h1>
      <div class="restaurant-banner-food-chain-block content-flex-centered">
        <a class="restaurant-banner-food-chain content-flex-centered" :href="restaurant.contact.branchWebsiteHref">
          <img class="restaurant-banner-food-chain-logo" :src="restaurant.contact.branchOnlineLogo" alt="Logo">
        </a>
      </div>
      <div class="restaurant-banner-address-info">
        <div class="restaurant-banner-address-info-upper">
          <div><a :href="restaurant.contact.branchAddressHref">{{restaurant.contact.branchAddressLocation}}</a></div>
          <div class="flex-separator"></div>
          <div><a :href="restaurant.contact.branchPhoneHref">call {{restaurant.contact.branchPhoneFormatted}}</a></div>
        </div>
        <div class="restaurant-banner-address-info-lower content-flex-centered">
          |<a class="restaurantDescriptorTag" v-for="tag in restaurant.tag.addressDescriptors" :href="tag.href">{{tag.name}}|</a>
        </div>
      </div>
      <!-- Hardcoded social directly in the template for now, it will pull data from another location-->
      <div class="restaurant-banner-ratings">
        <div class="flex-separator"></div>
        <div class="rating-block">
          <div class="restaurant-rating color-scheme-friend content-flex-centered">
            <h3 class="rating-header">Restaurant rating</h3>
            <div class="rating-element-format">★★★★</div>
          </div>
          <div class="restaurant-rating color-scheme-global content-flex-centered">
            <h3 class="rating-header">Restaurant rating</h3>
            <div class="rating-element-format">★★★</div>
          </div>
        </div>
        <div class="flex-separator"></div>
        <div class="flex-separator"></div>
        <div class="rating-block">
          <div class="restaurant-rating color-scheme-friend content-flex-centered">
            <h3 class="rating-header">Cost rating</h3>
            <div class="rating-element-format">$</div>
          </div>
          <div class="restaurant-rating color-scheme-global content-flex-centered">
            <h3 class="rating-header">Cost rating</h3>
            <div class="rating-element-format">$$</div>
          </div>
        </div>
        <div class="flex-separator"></div>
      </div>
      <!-- endOf Hardcoded social -->
      <div class="restaurant-banner-tags content-flex-centered">
        |<a class="restaurantDescriptorTag" v-for="tag in restaurant.tag.genericDescriptors" :href="tag.href">{{tag.name}}|</a>
      </div>
    </div>
    <div class="restaurant-info-core">
      <div class="restaurant-info-dual-panel">
        <div class="restaurant-photo-gallery-core">
          <div class="row">
            <div class="column">
              <img src="https://lh5.googleusercontent.com/p/AF1QipOr8dUAebLIx7dinVJ0zT1HCVxnv4UhfMhWAxZT=w254-h179-k-no" alt="egg bacon fries">
            </div>
            <div class="column">
              <img src="https://lh5.googleusercontent.com/p/AF1QipMkhyIYtVRcYwmbgr0ZLXonfXPVGaZwrYFfb1ux=w254-h190-k-no" alt="egg hash potatoes">
            </div>
            <div class="column">
              <img src="https://lh5.googleusercontent.com/p/AF1QipM5U8fcBZNtV7zplEndROKyXBSB0PQdIZX8bvf9=w254-h169-k-no" alt="Chicken general tao salad">
            </div>
          </div>
        </div>
        <div class="restaurant-hours-core content-flex-centered">
          <h3 class="restaurant-hours-header content-flex-centered">Hours</h3>
          <div class="restaurant-hours-column-setter">
            <div class="restaurant-hours-column" v-for="hourColumn in restaurant.hours">
              <h4 class="restaurant-hours-time-slot-header content-flex-centered">{{hourColumn.name}}</h4>
              <div class="restaurant-hours-time-table content-flex-centered">
                <div class="restaurant-hours-time-slot" v-for="hourTimeSlot in hourColumn.timeSlots">
                  <div class="restaurant-hours-day-of-the-week">{{ hourTimeSlot.dayOfTheWeek }}</div>
                  <div class="flex-separator"></div>
                  <div class="restaurant-hours-open">{{hourTimeSlot.hoursOpenFormatted}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- will embed google api-->
      <div class="restaurant-map-core">
        <a :href="restaurant.map.href"><img class=map :src="restaurant.map.src" alt="map" id="map"></a>
      </div>
    </div>
    <!-- Hardcoded social directly in the template for now, it will pull data from another location-->
    <div class="restaurant-social-core">
      <div class="restaurant-review-core">
        <div class="restaurant-review-block color-scheme-friend">
          <div class="restaurant-review">
            <div class="restaurant-review-profile-icon-holder content-flex-centered">
              <img class="restaurant-review-profile-icon" src="@/assets/defaultIcon.png" alt="Profile Icon">
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
            <div class="restaurant-review-profile-icon-holder content-flex-centered">
              <img class="restaurant-review-profile-icon" src="@/assets/defaultIcon.png" alt="Profile Icon">
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
</template>
<script>
export default {
  data: () => {
    return {
      restaurant: {
        name: "Normandin Duberger",
        contact: {
          branchWebsiteHref: "https://restaurantnormandin.com/en/restaurant/duberger/",
          branchOnlineLogo: "https://restaurantnormandin.com/img/logo.svg",
          branchAddressHref: "https://www.google.com/maps/place/Restaurant+Normandin/@46.8114671,-71.2968759,15z/data=!4m5!3m4!1s0x0:0x472d926e469834b8!8m2!3d46.8114671!4d-71.2968759",
          branchAddressLocation: "2185 Boulevard Père-Lelièvre, Québec, QC G1P 2X2",
          branchPhoneHref: "callto:4186834967",
          branchPhoneFormatted: "(418) 683-4967"
        },
        tag: {
          addressDescriptors: [
            {
              searchType: "s",
              name: "Dine-in",
              href: "../../public/restaurant/search/s=?dine_in"
            },
            {
              searchType: "s",
              name: "Curbside Pickup",
              href: "../../public/restaurant/search/s=?curbside_pickup"
            },
            {
              searchType: "s",
              name: "No-Contact Delivery",
              href: "../../public/restaurant/search/s=?no_contact_delivery"
            }
          ],
          genericDescriptors: [
            {
              searchType: "f",
              name: "Pizza",
              href: "../../restaurant/search/f=?pizza"
            },
            {
              searchType: "t",
              name: "Family Restaurant",
              href: "../../restaurant/search/t=?family_restaurant"
            },
            {
              searchType: "t",
              name: "Sports Bar",
              href: "../../restaurant/search/t=?sports_bar"
            }
          ]
        },
        photos: [
          {
            src: "https://lh5.googleusercontent.com/p/AF1QipOr8dUAebLIx7dinVJ0zT1HCVxnv4UhfMhWAxZT=w254-h179-k-no",
            alt: "egg bacon fries"
          },
          {
            src: "https://lh5.googleusercontent.com/p/AF1QipMkhyIYtVRcYwmbgr0ZLXonfXPVGaZwrYFfb1ux=w254-h190-k-no",
            alt: "egg hash potatoes"
          },
          {
            src: "https://lh5.googleusercontent.com/p/AF1QipM5U8fcBZNtV7zplEndROKyXBSB0PQdIZX8bvf9=w254-h169-k-no",
            alt: "Chicken general tao salad"
          }
        ],
        hours: [
          {
            name: "At Location",
            timeSlots: [
              {
                dayOfTheWeek: "Monday",
                hoursOpenFormatted: "9:00-21:00"
              },
              {
                dayOfTheWeek: "Tuesday",
                hoursOpenFormatted: "9:00-21:00"
              },
              {
                dayOfTheWeek: "Wednesday",
                hoursOpenFormatted: "9:00-21:00"
              },
              {
                dayOfTheWeek: "Thursday",
                hoursOpenFormatted: "9:00-21:00"
              },
              {
                dayOfTheWeek: "Friday",
                hoursOpenFormatted: "9:00-22:00"
              },
              {
                dayOfTheWeek: "Saturday",
                hoursOpenFormatted: "9:00-22:00"
              },
              {
                dayOfTheWeek: "Sunday",
                hoursOpenFormatted: "9:00-21:00"
              }
            ]
          },
          {
            name: "Delivery",
            timeSlots: [
              {
                dayOfTheWeek: "Monday",
                hoursOpenFormatted: "9:00-21:00"
              },
              {
                dayOfTheWeek: "Tuesday",
                hoursOpenFormatted: "9:00-21:00"
              },
              {
                dayOfTheWeek: "Wednesday",
                hoursOpenFormatted: "9:00-21:00"
              },
              {
                dayOfTheWeek: "Thursday",
                hoursOpenFormatted: "9:00-21:00"
              },
              {
                dayOfTheWeek: "Friday",
                hoursOpenFormatted: "9:00-22:00"
              },
              {
                dayOfTheWeek: "Saturday",
                hoursOpenFormatted: "9:00-22:00"
              },
              {
                dayOfTheWeek: "Sunday",
                hoursOpenFormatted: "9:00-21:00"
              }
            ]
          },
          {
            name: "Takeout",
            timeSlots: [
              {
                dayOfTheWeek: "Monday",
                hoursOpenFormatted: "9:00-19:30"
              },
              {
                dayOfTheWeek: "Tuesday",
                hoursOpenFormatted: "9:00-19:30"
              },
              {
                dayOfTheWeek: "Wednesday",
                hoursOpenFormatted: "9:00-19:30"
              },
              {
                dayOfTheWeek: "Thursday",
                hoursOpenFormatted: "9:00-19:30"
              },
              {
                dayOfTheWeek: "Friday",
                hoursOpenFormatted: "9:00-19:30"
              },
              {
                dayOfTheWeek: "Saturday",
                hoursOpenFormatted: "9:00-19:30"
              },
              {
                dayOfTheWeek: "Sunday",
                hoursOpenFormatted: "9:00-19:30"
              }
            ]
          }
        ],
        map: {
          src: "@/assets/dummyMap.png",
          href: "https://www.google.com/maps/dir//normandin+p%C3%A8re+leli%C3%A8vre/@46.8541618,-71.3135585,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x4cb897a0a256f51d:0x472d926e469834b8!2m2!1d-71.2968759!2d46.8114671"
        }
      }
    }
  }
}
</script>

<style>
@import "style/restaurant.css";
</style>
