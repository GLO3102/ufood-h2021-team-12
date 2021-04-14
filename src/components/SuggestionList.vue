<template>
  <div>
    Restaurant similaire :
    <div
      class="restaurantSuggested"
      v-for="restaurant in this.filteredList"
      v-bind:key="restaurant.id"
    >
      <a v-on:click="visitRestaurant(restaurant.id)">
        <div>{{ restaurant.name }}</div>

        <img
          :src="restaurant.pictures[0]"
          alt=""
          style="width:200px;height:200px"
        />
      </a>
    </div>
  </div>
</template>

<script>
import RestaurantList from "../services/RestaurantList";
export default {
  props: { currentRestaurantGenre: String, currentRestaurantName: String },
  data: () => ({
    name: "",
    totalList: [],
    filteredList: [],
    selected: ""
  }),
  async created() {
    const response = await RestaurantList.getRestaurantList();
    this.totalList = response.items;
    var genre = this.currentRestaurantGenre;
    this.filteredList = this.totalList.filter(function(restaurant) {
      return restaurant.genres.includes(genre);
    });
    for (var i = 0; i < this.filteredList.length; i++) {
      if (this.filteredList[i].name === this.currentRestaurantName) {
        this.filteredList.splice(i, 1);
      }
    }
  },
  methods: {
    visitRestaurant: function(id) {
      window.location.href = `/#/restaurant?id=${id}`;
      location.reload();
    }
  }
};
</script>

<style>
.suggested {
  display: flex;
  flex-direction: row;
  background-color: #555;
  border-block-start: solid 5px #333;
  font-family: Arial, Helvetica, sans-serif;
}
.restaurantSuggested {
  border-left: solid 5px #333;
  border-right: solid 5px #333;
  cursor: pointer;
}
</style>
