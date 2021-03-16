<template>
  <div id="app-home">
    <div class="homePage">
      <div class="homeImage">
        <img src="@/assets/homePicture.jpg" alt="Image" />
        <div class="select_div">
          Price range :
          <select v-on:change="priceRangeChange($event)">
            <option value="0">all</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          Genre :
          <select v-on:change="genreChange($event)">
            <option value="">all</option>
            <option value="ambiance">ambiance</option>
            <option value="bistro">bistro</option>
            <option value="desserts">desserts</option>
            <option value="fast-food">fast-food</option>
            <option value="fruits de mer">fruits de mer</option>
            <option value="hamburgers">hamburgers</option>
            <option value="mexicain">mexicain</option>
            <option value="santé">santé</option>
            <option value="végétarien">végétarien</option>
          </select>
        </div>
        <div class="visit-restaurant-button">
          <button class="list-button" v-on:click="bottom">
            View the restaurant list
          </button>
        </div>
      </div>
    </div>
    <div class="container" id="list">
      <div
        class="restaurant"
        v-for="(restaurant, id) in restaurantSample"
        :key="id"
      >
        <div class="box">
          <div class="media">
            <div class="media-left">
              <div class="image">
                <img :src="restaurant.pictures[0]" alt="Image" />
              </div>
              price range: {{ restaurant.price_range }} , rating:
              {{ restaurant.rating.toFixed(2) }}
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ restaurant.name }}</strong>

                  <br />
                </p>
              </div>
              <div class="visit-button">
                <button
                  class="take-visit-button"
                  v-on:click="visitRestaurant(restaurant.id)"
                >
                  Visit this restaurant's page
                </button>
              </div>
              <div class="level-left">
                <a class="level-item">
                  <p>
                    <span class="adressText">{{ restaurant.address }}</span>
                  </p>
                  <span
                    class="genreText"
                    v-for="genre in restaurant.genres"
                    :key="genre"
                    >{{ genre }},</span
                  >
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
import RestaurantList from "../services/RestaurantList";
export default {
  data: () => {
    return {
      restaurantSample: [],
      genreList: [],
      price: 0,
      genre: ""
    };
  },
  async created() {
    const response = await RestaurantList.getRestaurantList();
    this.restaurantSample = response.items;
  },
  methods: {
    visitRestaurant: function(id) {
      window.location.href = `/#/restaurant?id=${id}`;
    },
    bottom: function() {
      document.getElementById("list").scrollIntoView({ behavior: "smooth" });
      if (this.restaurantSample.length === 0)
        alert("Unfortunately, no restaurant fits this price range and genre.");
    },
    async priceRangeChange(event) {
      const response = await RestaurantList.getRestaurantList();
      this.restaurantSample = response.items;
      this.price = event.target.value;
      var p = this.price;
      var g = this.genre;
      if (this.price != 0 && this.genre != "")
        this.restaurantSample = this.restaurantSample.filter(function(item) {
          return item.price_range == p && item.genres.indexOf(g) >= 0;
        });
      else if (this.price != 0)
        this.restaurantSample = this.restaurantSample.filter(function(item) {
          return item.price_range == p;
        });
      if (this.restaurantSample.length === 0)
        alert("Unfortunately, no restaurant fits this price range and genre.");
    },
    async genreChange(event) {
      const response = await RestaurantList.getRestaurantList();
      this.restaurantSample = response.items;
      this.genre = event.target.value;
      var p = this.price;
      var g = this.genre;
      if (this.price != 0 && this.genre != "")
        this.restaurantSample = this.restaurantSample.filter(function(item) {
          return item.price_range == p && item.genres.indexOf(g) >= 0;
        });
      else if (this.genre != "")
        this.restaurantSample = this.restaurantSample.filter(function(item) {
          return item.genres.indexOf(g) >= 0;
        });
      if (this.restaurantSample.length === 0)
        alert("Unfortunately, no restaurant fits this price range and genre.");
    }
  }
};
</script>
<style>
html,
body {
  height: 100%;
  /*padding-top: 10px;*/
  background: #e6ecf1;
}

#app-home {
  background: #555;
  height: 100%;
  width: auto;
  padding-top: 0;
  text-align: center;
  margin: auto;
}

#app-home .container {
  display: block;
}

#app-home .restaurant {
  width: 100vw;
  height: 20vh;
  padding: 5px 5px 4px;
  display: table;
}

#app-home .box {
  width: 98%;
  height: 100%;
  border: 3px solid darkgrey;
  background-color: darkgrey;
  margin-bottom: 0;
  border-radius: 0;
  display: grid;
  position: relative;
}

#app-home .box:hover {
  background-color: #555;
}

#app-home .content {
  margin-top: 5vh;
}

#app-home .content small {
  color: #e70c2b;
  float: right;
}
#app-home .homeImage {
  height: 100%;
}
.addressText {
  float: right;
}
.genreText {
  float: right;
}

#app-home .homeImage img {
  width: 100%;
  height: 100%;
  border-radius: 0;
}

#app-home .image {
  margin: auto;
  padding: 10px;
  float: left;
}

#app-home img {
  width: 20vh;
  height: 100%;
  border-radius: 50vw;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
  /*transition: width 1s;*/
  display: flex;
}

#app-home .level-item {
  color: white;
  float: right;
}

#app-home .level-left {
  float: right;
}

#app-home input:focus {
  border-color: #00d1b2;
}

#app-home .likes {
  padding: 0 8px;
}

#app-home input {
  font-weight: bold;
}

#app-home .visit-button button {
  width: 28%;
  height: 20%;
  border-radius: 35px;
}

#app-home .select_div {
  display: center;
  position: absolute;
  bottom: 10%;
  left: 40%;
}

#app-home .visit-restaurant-button button {
  width: 35%;
  height: 10%;
  border-radius: 35px;
  font-weight: bold;
  font-size: 15px;
}

#app-home .take-visit-button {
  background-color: darkgrey;
}

#app-home .take-visit-button:hover {
  height: 25%;
  width: 30%;
  background-color: #08ee34;
}

#app-home .add-favorite-button {
  position: absolute;
  bottom: 0;
  right: 20%;
  background-color: #e0c359;
}

#app-home .add-favorite-button:hover {
  height: 25%;
  width: 30%;
  background-color: #facb20;
}

#app-home .list-button {
  position: absolute;
  bottom: 0;
  right: 30%;
  background-color: #555;
  color: white;
}
#app-home .list-button:hover {
  color: white;
  background-color: black;
}
</style>
