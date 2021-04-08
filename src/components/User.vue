<template>
  <div id="app-user">
    <div class="user-information">
      <div class="image">
        <img src="@/assets/user.png" alt="Image" />
        <div class="meter">
          <div class="meter-text">
            Progress Bar
          </div>
          <progress max="100" value="40"></progress>
        </div>
      </div>
      <input
        v-model="list_name"
        v-if="addingList"
        type="text"
        class="list_input"
        placeholder="Enter a new list ..."
      />
      <button
        type="button"
        v-if="addingList"
        v-on:click="addList"
        class="list_inputOK"
      >
        Create a new list
      </button>
      <user-information />
      <div class="profile">
        <div class="identification">Favorite list</div>
        <button type="button" v-on:click="addingList = !addingList">
          Add a new list
        </button>
        <div
          class="information"
          v-for="(favorite, id) in favorites_restaurants"
          :key="id"
        >
          Name: {{ favorite.name }}
          <button type="button" v-on:click="updateName = !updateName">
            Change name
          </button>
          <button
            type="button"
            v-on:click="addingRestaurant = !addingRestaurant"
          >
            Add a restaurant
          </button>
          <button type="button" v-on:click="setView(favorite)">
            view all restaurant
          </button>
          <button type="button" v-on:click="deleteList(favorite.id)">
            Delete this list
          </button>
          <button type="button" v-on:click="setDeleteActive(favorite.id)">
            Active Deletion of a restaurant
          </button>
          <input
            v-model="list_name"
            v-if="addingRestaurant"
            type="text"
            class="list_input"
            placeholder="Enter a new restaurant"
          />
          <input
            v-model="list_name"
            v-if="updateName"
            type="text"
            class="list_input"
            placeholder="Change name"
          />
          <button
            type="button"
            v-if="addingRestaurant"
            v-on:click="addRestaurant(favorite)"
            class="list_inputOK"
          >
            Add a new restaurant to list
          </button>
          <button
            type="button"
            v-if="updateName"
            v-on:click="updateRestaurant(favorite)"
            class="list_inputOK"
          >
            OK
          </button>
        </div>
        <div class="profile-button">
          <button>More</button>
        </div>
      </div>
    </div>
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
import UserInformation from "@/components/UserInformation";
const api = new Api();
export default {
  components: { UserInformation },
  data: () => ({
    profiles: [],
    favorites_restaurants: [],
    restaurants: [],
    list_name: "",
    addingList: false,
    addingRestaurant: false,
    updateName: false,
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
    addList() {
      if (this.list_name.trim() === "") {
        this.addingList = false;
        return;
      }
      this.onCreate(this.list_name);
      this.list_name = "";
      this.addingList = false;
    },
    deleteList(id) {
      this.onDelete(id);
    },
    deleteRestaurants(restaurantId) {
      this.onDeleteRestaurant(restaurantId);
    },
    addRestaurant(favorite) {
      if (this.list_name.trim() === "") {
        this.addingRestaurant = false;
        return;
      }
      this.setRestaurant(favorite.id);
      this.list_name = "";
      this.addingRestaurant = false;
    },
    setView(favorite) {
      this.restaurants = [];
      const restaurants = favorite.restaurants;
      for (let y = 0; y < restaurants.length; y++) {
        console.log(restaurants[y]);
        this.restaurants.push(restaurants[y]);
      }
    },
    updateRestaurant(favorite) {
      if (this.list_name.trim() === "") {
        this.updateName = false;
        return;
      }
      this.onUpdate(favorite.id, this.list_name);
      this.list_name = "";
      this.updateName = false;
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

#app-user .user-information {
  margin-top: 5vh;
  display: flex;
  padding-left: 0;
}

#app-user .profile {
  width: 20vw;
  margin-left: 2vw;
  border: 5px solid black;
  border-radius: 35px;
  padding: 10px 0 0;
}

.list_inputOK {
  position: absolute;
  left: 60vw;
  top: 40vh;
  height: 5vh;
  width: auto;
}
#app-user button {
  border-radius: 35px;
  background-color: #4b9ffd;
  bottom: 0;
}
.profile .identification {
  margin-bottom: 3vh;
  color: blue;
}

.profile .information {
  width: 100%;
  height: 15vh;
  border: 2px solid lightgray;
  padding-top: 2vh;
  font-weight: bold;
}

.profile .information:hover {
  background-color: #4b73e9;
}

#app-user .user-type {
  width: 20vw;
  margin-left: 2vw;
  border: 5px solid green;
  border-radius: 35px;
  display: block;
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

#app-user .box {
  width: 98%;
  height: 100%;
  border: 3px solid darkgrey;
  background-color: darkgrey;
  margin-bottom: 0;
  border-radius: 0;
  display: grid;
}

#app-user .box:hover {
  background-color: #73cb73;
}

#app-user .content {
  margin-top: 5vh;
}
#app-user .content small {
  color: #e70c2b;
  float: right;
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

#app-user .level-item {
  padding-left: 10px;
  color: #f60334;
  float: right;
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
.list_input {
  position: absolute;
  left: 50vw;
  top: 40vh;
  height: 5vh;
}
.meter progress {
  background-image: -webkit-linear-gradient(
      -45deg,
      transparent 33%,
      rgba(0, 0, 0, 0.1) 33%,
      rgba(0, 0, 0, 0.1) 66%,
      transparent 66%
    ),
    -webkit-linear-gradient(top, rgba(255, 255, 255, 0.25), rgba(0, 0, 0, 0.25)),
    -webkit-linear-gradient(left, #09c, #f44);

  border-radius: 2px;
  background-size: 35px 20px, 100% 100%, 100% 100%;
}
.meter progress[value]::-webkit-progress-value {
  background-image: -webkit-linear-gradient(
      -45deg,
      transparent 33%,
      rgba(0, 0, 0, 0.1) 33%,
      rgba(0, 0, 0, 0.1) 66%,
      transparent 66%
    ),
    -webkit-linear-gradient(top, rgba(255, 255, 255, 0.25), rgba(0, 0, 0, 0.25)),
    -webkit-linear-gradient(left, #09c, #f44);

  border-radius: 2px;
  background-size: 35px 20px, 100% 100%, 100% 100%;
}

.meter .meter-text {
  margin-top: 2vh;
  margin-bottom: 0;
}
</style>
