<template>
  <div id="app-home">
    <div class="homePage">
      <div class="preference">
        <button class="filter" v-on:click="userFilterKey = 'all'" :class="{ active: userFilterKey === 'all' }">Reset</button>
        <button class="filter1" v-on:click="userFilterKey = 'range1'" :class="{ active: userFilterKey === 'range1' }">Low Price</button>
        <button class="filter2" v-on:click="userFilterKey = 'range2'" :class="{ active: userFilterKey === 'range2' }">Medium Price</button>
        <button class="filter3" v-on:click="userFilterKey = 'range3'" :class="{ active: userFilterKey === 'range3' }">High price</button>
      </div>
      <div class="homeImage">
        <img src="@/assets/homePicture.jpg" alt="Image">
        <div class="visit-restaurant-button">
          <button class="list-button">View the restaurant list</button>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="restaurant" v-for="restaurant in userFilter" :key="restaurant">
        <div class="box">
          <div class="media">
            <div class="media-left">
              <div class="image">
                <img :src="restaurant.img" alt="Image">
              </div>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ restaurant.name }}</strong>  <small>{{ restaurant.handle }}</small>
                  <br>
                  {{ restaurant.moto }}
                </p>
              </div>
              <div class="visit-button">
                <button class="take-visit-button">Visit this restaurant</button>
                <button class="add-favorite-button" v-on:click="counter += 1">Add to favorite</button>
              </div>
              <div class="level-left">
                <a class="level-item">
                  <span class="icon is-small"><i class="fa fa-heart"></i></span>
                  <span class="likes">{{ restaurant.likes }}</span>
                </a>
                <a v-if = "restaurant.price === 3" class="prices">
                  <span class ="icon is-small"><i class="fa fa-usd"></i></span>
                  <span class ="icon is-small"><i class="fa fa-usd"></i></span>
                  <span class ="icon is-small"><i class="fa fa-usd"></i></span>
                </a>
                <a v-if = "restaurant.price === 2" class="prices">
                  <span class ="icon is-small"><i class="fa fa-usd"></i></span>
                  <span class ="icon is-small"><i class="fa fa-usd"></i></span>
                </a>
                <a v-if = "restaurant.price === 1" class="prices">
                  <span class ="icon is-small"><i class="fa fa-usd"></i></span>
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
export default {
  data: () => {
    return {
      userFilterKey: 'all',
      restaurants: [
        {
          id: 1,
          name: "Jon's Pizza",
          handle: "@jokerjames",
          img:
            "https://pixabay.com/get/g91d3306a35c38c28cb7c6e7d11c381676b68f9b408bff70ece19ac0b6127c79d34c177fc241099fb3a00af831bee9425_640.jpg",
          moto: "If you don't succeed, dust yourself off and try again.",
          likes: 10,
          price: 3
        },
        {
          id: 2,
          name: "Vegetarians area",
          handle: "@fantasticfatima",
          img:
            "https://pixabay.com/get/g0895c39ed696538396bbdf053f507a28989f435aa930dc3ddd2aa57bf4ea085dccb8e099a69fcbccbbaa94ee78e87a28_640.jpg",
          moto: "Better late than never but never late is better.",
          likes: 12,
          price: 3
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gfc3a59ad3c18cec407f7a2089f9ce455a36e4274294b95c22219f49869df7ed64034ca5f5220eb8644121cf5fd02d453_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18,
          price: 2
        },
        {
          id: 4,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/g0b0b02e08a7eecfec4fa7990281f8029396515ab552169290b00218e1378b0fbfcbd86d80ed01fa08d0f2bd5a1d66bc3_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18,
          price: 3
        },
        {
          id: 4,
          name: "Brunch Ti",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gafcefc712de7ba3f89149ad2512c48f5e550e1fcae8000268f40651bc0f55f4b2d18e92d7efd3efcb86d66e66b2171a6_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18,
          price: 2
        },
        {
          id: 5,
          name: "THE coffee",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/g15f096832d48d14de1d8c7936a9ac7d89d7db193e5cba5631c73b57edfb5112cc98627c612208fcd18d5fe7f22276e39_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18,
          price: 1
        },
        {
          id: 6,
          name: "Timi Breakfast",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/g16eb644e1f952a53785a243c19ef3d9b9fec425bdfe28f7be183eeddc9e8cab43c7e1d551511639b32a323e41b1e47e0_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18,
          price: 1
        },
        {
          id: 7,
          name: "Bread shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gef56459615831676b739efb938a5612df6113012bfa0ec0004cdf334fcfd117ed1842931b62fb4c22061c1bb0c65c2fb_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18,
          price: 2
        },
        {
          id: 8,
          name: "Luna Fish",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/g92bf565658ce4d157301b9eb6010208840e3f1bebf3664a6c64f26d9ebeafda9253924a3d3ef9a4f68e7d7120e7a19c0_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18,
          price: 2
        },
        {
          id: 9,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/ge0a46db1982a464069561ea3bd8ba6196ea32f14a79a572432c081c56b341faf6107dc5722495a112a3b665a9ee41762_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18,
          price: 3
        },
        {
          id: 10,
          name: "Buffet",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/g083a505998cfd7739a87477d1987fab7d741cc741646c883b67ed206e389b232ffcf3011b2969b251235379156316aa6_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18,
          price: 2
        },
        {
          id: 11,
          name: "Healthy smoothie",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/g242fb2c08f6a523d0defec34962f9f638576704a3b0440ea8c8044afbfa38d6cbd35e2bfffe36223708de4757e6cdc37_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18,
          price: 1
        },
        {
          id: 12,
          name: "Spring Rolls",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/g836991eeed2912bdaf2ff0ac173538e495fb0812121b4a16e04b02d80397dfa69984258239965fa56b23e40a4443312f_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18,
          price: 1
        },
        {
          id: 13,
          name: "Don meat",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/g65c9934aa04916b2d0fd525f6b3f80e81ccadc14e55a722f814b902ad05484b5b87525e7e930b621103a2168c9dfe1a2_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18,
          price: 3
        },
        {
          id: 14,
          name: "Grill Meat",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/g1a53f6792cd471e19ed3b642d25d998cd3613789e003a5085e268685103dc8efb201774788fbc7b05e046cfd9178f0e6_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18,
          price: 3
        },
        {
          id: 15,
          name: "Wings wi",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/g872168252f4e0bbbb2efd6949d640a4e602dee9a18ad0c35f3fc71a07964e324b3ee2e8270a7858f1c8611d8541ab144_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18,
          price: 1
        },
        {
          id: 16,
          name: "Salad shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/g8ef5ed447f6391160030ce8aa6d7bbb38f9ffe5052187019216184a044a40a830ee6e7c68eabeb1fb5c97970adfedbaf_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18,
          price: 2
        }
      ]
    }
  },
  computed: {
    userFilter() {
      return this[this.userFilterKey]
    },
    all() {
      return this.restaurants
    },
    range1() {
      return this.restaurants.filter(restaurant => (restaurant.price === 1));
    },
    range2() {
      return this.restaurants.filter(restaurant => (restaurant.price === 2));
    },
    range3() {
      return this.restaurants.filter(restaurant => (restaurant.price === 3));
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
  height: 100%;
  width: auto;
  padding-top: 0;
  text-align: center;
  margin: auto;
}

#app-home .container{
  display: block;
}

#app-home .restaurant{
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

#app-home .box:hover{
  background-color: #73cb73;
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

#app-home .homeImage img{
  width: 100%;
  height: 100%;
  border-radius: 0;
}
#app-home .preference{
  float: initial;
  text-align: center;
  overflow: hidden;
}
#app-home .preference button{
  background-size: cover;
  width: auto;
  height: auto;
  border-radius: 50vw;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
  font-size: 2rem;
}

/*#app-home .filter {*/
/*  font-size: 16px;*/
/*  border: none;*/
/*  outline: none;*/
/*  color: white;*/
/*  padding: 14px 16px;*/
/*  background-color: inherit;*/
/*  font-family: inherit;*/
/*}*/
#app-home .image{
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

#app-home .filter{
  position: fixed;
  top: 5vh;
  right: 5vw;
  z-index: 1;
  margin-right: 2vw ;
}

#app-home .filter1{
  position: fixed;
  top: 5vh;
  right: 12vw;
  z-index: 1;
  margin-right: 2vw ;
}

#app-home .filter2{
  position: fixed;
  top: 5vh;
  right: 22vw;
  z-index: 1;
  margin-right: 2vw ;
}

#app-home .filter3{
  position: fixed;
  top: 5vh;
  right: 35vw;
  z-index: 1;
  margin-right: 2vw ;
}

#app-home .level-item {
  padding-left: 10px;
  color: #f60334;
  float: right;
}

#app-home .level-left{
  width: 10vw;
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

#app-home .visit-button button{
  width: 28%;
  height: 20%;
  border-radius: 35px;
}

#app-home .visit-restaurant-button button{
  width: 35%;
  height: 10%;
  border-radius: 35px;
  font-weight: bold;
  font-size: 15px;
}

#app-home .take-visit-button{
  position: absolute;
  bottom: 0;
  left: 23%;
  background-color: #93ee67;
}

#app-home .take-visit-button:hover{
  height: 25%;
  width: 30%;
  background-color: #08ee34;
}

#app-home .add-favorite-button{
  position: absolute;
  bottom: 0;
  right: 20%;
  background-color: #e0c359;
}

#app-home .add-favorite-button:hover{
  height: 25%;
  width: 30%;
  background-color: #facb20;
}

#app-home .list-button{
  position: absolute;
  bottom: 0;
  right: 30%;
  background-color: #08ee34;
}
</style>
