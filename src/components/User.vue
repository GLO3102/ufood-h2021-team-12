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
      <input v-model = "list_name" v-if="addingList" type="text" class = "list_input" placeholder="Enter a new list ..." />
      <button type = "button"  v-if="addingList" v-on:click="addList" class = "list_inputOK"> Create a new list</button>
      <div class="profile" v-for="(profile, id) in profiles" :key="id">
        <div class="identification">Personal information</div>
        <div class="information">{{ profile.name }}</div>
        <div class="information">Following: {{ profile.following.length }}</div>
        <div class="information">followers: {{ profile.followers.length }}</div>
        <div class="information">User rate: {{ profile.rating }}</div>
        <div class="information">{{ profile.email }}</div>
        <div class="profile-button">
          <button v-on:click="counter += 1">Edit Information</button>
        </div>
      </div>
      <div class="profile">
        <div class="identification">Favorite list</div>
        <button type = "button" v-on:click="addingList = !addingList"> Add a new list</button>
        <div class="information" v-for="(favorite, id) in favorites_restaurants" :key="id">Name: {{ favorite.name }}</div>
<!--        <div class="information">followers: {{ profile.followers.length }}</div>-->
<!--        <div class="information">Best Restaurant: {{ profile.best }}</div>-->
<!--        <div class="information">User rate: {{ profile.rating }}</div>-->
<!--        <div class="information">Number of share: {{ profile.share }}</div>-->
        <div class="profile-button">
          <button>More</button>
        </div>
      </div>
      <div class="user-type">
        <div class="image">
          <img src="@/assets/star.png" alt="Image" />
        </div>
        <div class="user-type-text">Beginner user</div>
        <div class="profile-button">
          <button v-on:click="counter += 1">Share</button>
        </div>
      </div>
    </div>
    <h1>Your favorite list</h1>
    <div class="container">
      <div class="restaurant" v-for="(restaurant, id) in restaurants" :key="id">
        <div class="box">
          <div class="media">
            <div class="media-left">
              <div class="image">
                <img :src="restaurant.img" alt="Image" />
              </div>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ restaurant.name }}</strong
                  ><small>{{ restaurant.handle }}</small>
                  <br />
                  <br />
                  Last Visit: {{ restaurant.Date }}
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
const api = new Api();
export default {
  data: () => ({
    profiles: [],
    favorites_restaurants: [],
    restaurants: [],
    list_name: "",
    addingList: false,
  }),
  methods: {
    // async onCreate(name){
    //   const task = await api.createTask(name);
    //   this.tasks.push(task);
    // },
    addList(){
      if(this.list_name.trim() === "") {return ;}
      // this.onCreate(this.list_name);
      this.list_name = "";
      this.addingList = false;
    }
  },
  async created() {
    const randomUser = await api.getRandomUser();
    api.registerUser(randomUser);
    const profile = await api.getUser();
    this.profiles.push(profile);
    const favorites = await api.getFavorites(5);
    console.log(favorites);
    for(let i = 0; i< favorites.total; i++){
      const restaurants = favorites.items[i].restaurants;
      for(let y = 0; y < restaurants.length; y++){
        console.log(restaurants[i])
        this.restaurants.push(restaurants[i]);
      }
      this.favorites_restaurants.push(favorites.items[i]);
    }
    // console.log(api.getUser().id);
    // this.profiles.id = randomUser.id;
    // console.log(this.profiles.id);
    // this.profiles.email = randomUser.email;
    // console.log(this.profiles.email);
    // this.profiles.rating = randomUser.rating;
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

/*#app-user .profile-button {*/
/*  width: 100%;*/
/*  border-radius: 35px;*/
/*  background-color: #4b9ffd;*/
/*  bottom: 0;*/
/*}*/
.list_inputOK{
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
  height: 8vh;
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

#app-user .user-type .user-type-text {
  font-size: 4vh;
  color: #e70c2b;
  font-family: "Agency FB", serif;
  font-weight: bold;
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
.list_input{
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
