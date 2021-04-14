<template>
  <v-card class="d-flex justify-center mb-10">
    <signIn v-model="connection" v-if="!validToken" />
    <v-container>
      <v-row>
        <v-col sm="3">
          <v-card class="d-flex left">
            <avatar />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <user-information />
        </v-col>
        <v-col cols="6">
          <FavoriteList
            v-bind:favorites_restaurants="favorites_restaurants"
            v-bind:on-update="onUpdate"
            v-bind:deleteList="deleteList"
            v-bind:setDeleteActive="setDeleteActive"
            v-bind:setView="setView"
            v-bind:restaurants="restaurants"
            v-bind:add-list="addList"
            v-bind:add-restaurant="addRestaurant"
            v-bind:update-restaurant="updateRestaurant"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import Api from "@/services/api";
import UserInformation from "@/components/user/UserInformation";
import Avatar from "@/components/user/Avatar";
import FavoriteList from "@/components/user/FavoriteList";
import SignIn from "@/components/connection/signIn";
const api = new Api();
export default {
  name: "User",
  components: { SignIn, FavoriteList, Avatar, UserInformation },
  data: () => ({
    profiles: [],
    favorites_restaurants: [],
    restaurants: [],
    activeDeletion: false,
    currentFavorite: false,
    connection: true,
    validToken: false
  }),
  methods: {
    async setRestaurant(listId) {
      await api.createRestaurant(listId);
      const aRestaurant = await api.getRestaurant();
      this.restaurants.push(aRestaurant);
    },
    async onCreate(name) {
      const favorite = await api.createFavorite(name);
      this.favorites_restaurants.push(favorite);
    },
    async onDelete(listId) {
      await api.deleteFavorite(listId);
      this.favorites_restaurants = this.favorites_restaurants.filter(
        restaurant => restaurant.id !== listId
      );
    },
    async onUpdate(listId, name) {
      //Can update this if I can use Es6 function
      const favorite = await api.updateFavorite(listId, name);
      for (let i = 0; i < favorite.length; i++) {
        if (this.favorites_restaurants[i].id === listId) {
          this.favorites_restaurants[i] = favorite;
        }
      }
    },
    // eslint-disable-next-line no-unused-vars
    addList(list_name) {
      if (list_name.trim() === "") {
        return;
      }
      this.onCreate(list_name);
    },
    deleteList(id) {
      this.onDelete(id);
    },
    deleteRestaurants(restaurantId) {
      this.onDeleteRestaurant(restaurantId);
    },
    //TODO check this to remove async
    async addRestaurant(favorite) {
      await this.setRestaurant(favorite.id);
    },
    async setView(favorite) {
      this.restaurants.splice(0, this.restaurants.length);
      for (let y = 0; y < favorite.restaurants.length; y++) {
        const aRestaurant = await api.getRestaurant(favorite.restaurants[y].id);
        this.restaurants.push(aRestaurant);
      }
      // this.restaurants = [];
      // const restaurants = favorite.restaurants;
      // for (let y = 0; y < restaurants.length; y++) {
      //   this.restaurants.push(restaurants[y]);
      // }
    },
    // eslint-disable-next-line no-unused-vars
    updateRestaurant(favorite, list_name) {
      if (list_name.trim() === "") {
        return;
      }
      this.onUpdate(favorite.id, list_name);
    },
    async onDeleteRestaurant(restaurantId) {
      await api.deleteRestaurant(this.currentFavorite, restaurantId);
      this.restaurants = this.restaurants.filter(
        restaurant => restaurant.id !== restaurantId
      );
    },
    setDeleteActive(favoriteId) {
      this.activeDeletion = !this.activeDeletion;
      this.currentFavorite = favoriteId;
    }
  },
  async created() {
    const token = this.$cookies.get("token");
    const user = await api.getUser(token);
    this.validToken = user !== "Unauthorized";
    api.registerToken(token);
    console.log(this.validToken);

    //Check if the token is still available if not dispaly the connection menu
    // const user = await api.getUser(this.token);
    api.registerUser(user);
    // const profile = await api.getUser();
    this.profiles.push(user);
    const favorites = await api.getFavorites(5);
    console.log(favorites);
    for (let i = 0; i < favorites.total; i++) {
      for (let y = 0; y < favorites.items[i].restaurants.length; y++) {
        const aRestaurant = await api.getRestaurant(
          favorites.items[i].restaurants[y].id
        );
        this.restaurants.push(aRestaurant);
      }
      this.favorites_restaurants.push(favorites.items[i]);
    }
  }
};
</script>
<style>
html,
body {
  text-align: center;
}
</style>
