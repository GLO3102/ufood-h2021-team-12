<template>
  <v-card class="d-flex justify-center mb-10">
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="favorite in favorites_restaurants"
          :key="favorite.name"
          :cols="6"
        >
          <v-card>
            <v-img
              :src="randomImg.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="favorite.name"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <addInput
                v-bind:addRestaurant="addRestaurant"
                v-bind:favorite="favorite"
                v-on:click="addingRestaurant = !addingRestaurant"
                v-model="addingRestaurant"
              />
              <updateList
                v-bind:updateRestaurant="updateRestaurant"
                v-bind:favorite="favorite"
                v-on:click="updateName = !updateName"
                v-model="updateName"
              />

              <RestaurantList
                v-bind:restaurants="restaurants"
                v-on:click="currentFavorite = !currentFavorite"
                v-model="currentFavorite"
              />
              <v-btn icon v-on:click="deleteList(favorite.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn icon v-on:click="setDeleteActive(favorite.id)">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <addList
          v-bind:addList="addList"
          v-on:click="addingList = !addingList"
          v-model="addingList"
        />
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
import AddInput from "@/components/user/addInput";
import AddList from "@/components/user/addList";
import UpdateList from "@/components/user/updateList";
import RestaurantList from "@/components/user/RestaurantList";
export default {
  name: "FavoriteList",
  components: { RestaurantList, UpdateList, AddList, AddInput },
  props: [
    "favorites_restaurants",
    "onUpdate",
    "deleteList",
    "setDeleteActive",
    "restaurants",
    "setView",
    "addList",
    "addRestaurant",
    "updateRestaurant",
  ],
  data: () => ({
    listImages: [
      {
        title: "Default list1",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg"
      },
      {
        title: "Default list2",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg"
      },
      {
        title: "Default list3",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg"
      }
    ],
    list_name: "",
    addingList: false,
    addingRestaurant: false,
    updateName: false,
    activeDeletion: false,
    currentFavorite: false
  }),
  methods: {
    randomImg() {
      return this.listImages[
        Math.floor(Math.random() * this.listImages.length)
      ];
    },
  }
};
</script>

<style scoped>
button {
  background-color: #4b9ffd;
}
</style>
