<template>
  <v-card class="d-flex justify-center mb-10">
    <signIn v-model="connection" v-if="unvalidToken" />
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
            v-bind:deleteRestaurants="deleteRestaurants"
            v-bind:setView="setView"
            v-bind:restaurants="restaurants"
            v-bind:add-list="addList"
            v-bind:add-restaurant="addRestaurant"
            v-bind:update-restaurant="updateRestaurant"
            v-bind:allRestaurants="allRestaurants"
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
    unvalidToken: true,
    allRestaurants: []
  }),
  methods: {
    async setRestaurant(listId, restaurantList) {
      for(let i=0; i < restaurantList.length; i++){
        await api.createRestaurant(listId, restaurantList[i].id);
        const aRestaurant = await api.getRestaurant(restaurantList[i].id);
        this.restaurants.push(aRestaurant);
      }
      location.reload();
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
      location.reload();
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
    deleteRestaurants(favorite , list_restaurant) {
      for (let i = 0; i < list_restaurant.length; i++) {
        this.onDeleteRestaurant(favorite, list_restaurant[i].id);
      }
    },
    //TODO check this to remove async
    async addRestaurant(favorite, restaurantList) {
      await this.setRestaurant(favorite.id, restaurantList);
      location.reload();
    },
    async setView(favorite) {
      this.restaurants.splice(0, this.restaurants.length);
      for (let y = 0; y < favorite.restaurants.length; y++) {
        console.log(favorite.restaurants[y].id);
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
    async onDeleteRestaurant(favorite,restaurantId) {
      await api.deleteRestaurant(favorite.id, restaurantId);
      this.restaurants = this.restaurants.filter(
        restaurant => restaurant.id !== restaurantId
      );
      location.reload();
    },
    setDeleteActive(favoriteId) {
      this.activeDeletion = !this.activeDeletion;
      this.currentFavorite = favoriteId;
    }
  },
  async created() {
    const token = this.$cookies.get("token");
    const user = await api.getTokenInfo(token);

    console.log(user);
    api.registerToken(token);
    //Check if the token is still available if not dispaly the connection menu
    // const user = await api.getUser(this.token)
    api.registerUser(user);
    if (user.id.length > 0) {
      this.unvalidToken = false;
    }
    else{
      this.unvalidToken = true;
    }
    // const profile = await api.getUser();
    this.profiles.push(user);
    const favorites = await api.getFavorites(5);
    for (let i = 0; i < favorites.total; i++) {
      for (let y = 0; y < favorites.items[i].restaurants.length; y++) {
        const aRestaurant = await api.getRestaurant(
          favorites.items[i].restaurants[y].id
        );
        this.restaurants.push({
          favorite: favorites.items[i].id,
          data: aRestaurant
        });
      }
      this.favorites_restaurants.push(favorites.items[i]);
    }
    const allRestaurants = await api.getRestaurants();
    for(let i = 0; i < allRestaurants.items.length; i++) {
      this.allRestaurants.push(allRestaurants.items[i]);
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
