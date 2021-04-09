<template>
  <div id="app-user">
    <avatar />
    <user-information />
    <FavoriteList
      v-bind:favorites_restaurants="favorites_restaurants"
      v-bind:on-update="onUpdate"
      v-bind:deleteList="deleteList"
      v-bind:setDeleteActive="setDeleteActive"
      v-bind:setView="setView"
      v-bind:add-list="addList"
      v-bind:add-restaurant="addRestaurant"
      v-bind:update-restaurant="updateRestaurant"
    />
    <h1>Restaurant of favorite list</h1>
    <div class="container">
      <div class="restaurant" v-for="(restaurant, id) in restaurants" :key="id">
        <div class="box">
          <div class="media">
            <div class="media-left">
              <div class="image">
                <img :src="restaurant.pictures[0]" alt="Image" />
              </div>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ restaurant.name }}</strong>
                  <button
                    type="button"
                    v-if="activeDeletion"
                    v-on:click="deleteRestaurants(restaurant.id)"
                  >
                    Delete this Restaurant
                  </button>
                  <br />
                  <br />
                  Address: {{ restaurant.address }}
                </p>
              </div>
              <div class="level-left">
                <a class="level-item">
                  <span class="icon is-small"><i class="fa fa-heart"></i></span>
                  <span class="visits">{{ restaurant.visit }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Api from "@/services/api";
import UserInformation from "@/components/user/UserInformation";
import Avatar from "@/components/user/Avatar";
import FavoriteList from "@/components/user/FavoriteList";
const api = new Api();
export default {
  components: { FavoriteList, Avatar, UserInformation },
  data: () => ({
    profiles: [],
    favorites_restaurants: [],
    restaurants: [],
    activeDeletion: false,
    currentFavorite: false
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
    // eslint-disable-next-line no-unused-vars
    addRestaurant(favorite) {
      this.setRestaurant(favorite.id);
    },
    setView(favorite) {
      this.restaurants = [];
      const restaurants = favorite.restaurants;
      for (let y = 0; y < restaurants.length; y++) {
        console.log(restaurants[y]);
        this.restaurants.push(restaurants[y]);
      }
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
    const randomUser = await api.getRandomUser();
    api.registerUser(randomUser);
    const profile = await api.getUser();
    this.profiles.push(profile);
    const favorites = await api.getFavorites(5);
    console.log(favorites);
    for (let i = 0; i < favorites.total; i++) {
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
#app-user .image {
  top: 6vh;
  padding-top: 10px;
}



#app-user button {
  border-radius: 35px;
  background-color: #4b9ffd;
  bottom: 0;
}

#app-user h1 {
  margin-top: 4vh;
  text-decoration: underline;
  color: #3070ff;
}

#app-user .container {
  display: block;
}

#app-user .restaurant {
  width: 100vw;
  height: 10vh;
  padding: 5px 5px 4px;
  display: table;
}

#app-user .box:hover {
  background-color: #73cb73;
}

#app-user .content {
  margin-top: 5vh;
}

#app-user .user-type img {
  border-radius: 0;
  box-shadow: none;
}

#app-user .user-type .image {
  margin: auto;
  padding: 10px;
}

#app-user .image {
  margin: auto;
  padding: 10px;
  float: left;
}

#app-user img {
  width: 20vh;
  height: 100%;
  border-radius: 50vw;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
  /*transition: width 1s;*/
  display: flex;
}

#app-user .level-left {
  width: 10vw;
  float: right;
}

#app-user input:focus {
  border-color: #00d1b2;
}

#app-user .visits {
  padding: 0 8px;
}

#app-user input {
  font-weight: bold;
}
</style>
