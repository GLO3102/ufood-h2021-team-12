<template>
  <div id="app-user">
    <div class="user-information">
      <div class="image">
        <img src= "@/assets/user.png" alt="Image">
        <div class="meter">
          <div class="meter-text">
          Progress Bar
          </div>
          <progress max="100" value="40"></progress>
        </div>
      </div>
      <div class="profile" v-for="(profile, id) in profiles" :key="id">
        <div class="identification">{{ profile.handle }}</div>
        <div class="information">{{profile.name }}</div>
        <div class="information">{{profile.phone}}</div>
        <div class="information">{{profile.birth}}</div>
        <div class="information">{{profile.address}}</div>
        <div class="profile-button">
          <button v-on:click="counter += 1">Edit Information</button>
        </div>
      </div>
      <div class="profile" v-for="(profile, id) in profiles" :key="id">
        <div class="identification">{{ profile.handle }}</div>
        <div class="information">Best Restaurant: {{profile.best }}</div>
        <div class="information">User rate: {{profile.rate}}</div>
        <div class="information">Number of share: {{profile.share}}</div>
        <div class="information">Number of like: {{profile.likes}}</div>
        <div class="information">Community friends: {{profile.likes}}</div>
        <div class="profile-button">
          <button>Share</button>
        </div>
      </div>
      <div class="user-type">
        <div class="image">
          <img src= "@/assets/star.png" alt="Image">
        </div>
        <div class = "user-type-text">Beginner user</div>
        <div class="profile-button">
          <button v-on:click="counter += 1">Share</button>
        </div>
      </div>
    </div>
    <h1>Your last visit Information</h1>
    <div class="container">
      <div class="restaurant" v-for="(restaurant, id) in restaurants" :key="id">
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
                  <strong>{{ restaurant.name }}</strong><small>{{ restaurant.handle }}</small>
                  <br>
                  <br>
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
export default {
  data: () => {
    return {
      profiles:[
        {
          id: 5234,
          name: "Dietz-Benony",
          phone: "+1888-888-8888",
          birth: "18 March 1997",
          address: "234 McInter st",
          best: "Sushi shop",
          rate: "83%",
          share: "120",
          handle: "@dino",
          img:
            "@/assets/user.png",
          likes: 3,
          friends: "1,2k"
        }
      ],
      restaurants: [
        {
          id: 3,
          name: "Sushi shop",
          handle: "@dino",
          img:
            "https://pixabay.com/get/g91d3306a35c38c28cb7c6e7d11c381676b68f9b408bff70ece19ac0b6127c79d34c177fc241099fb3a00af831bee9425_640.jpg",
          Date: "2020-02-14 10h45 A.M",
          visit: 15
        },
        {
          id: 2,
          name: "Vegetarians area",
          handle: "@dino",
          img:
            "https://pixabay.com/get/g0895c39ed696538396bbdf053f507a28989f435aa930dc3ddd2aa57bf4ea085dccb8e099a69fcbccbbaa94ee78e87a28_640.jpg",
          Date: "2020-04-01 2h45 P.M",
          visit: 5
        },
        {
          id: 1,
          name: "Jon's Pizza",
          handle: "@dino",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          Date: "2020-12-19 2h45 P.M",
          visit: 4
        }
        ]
    }
  }
};
</script>
<style>
html,
body{
  text-align: center;
}
#app-user .image{
  top: 6vh;
  padding-top: 10px;
}

#app-user .user-information{
  margin-top: 5vh;
  display: flex;
  padding-left: 0;
}

#app-user .profile{
  width: 20vw;
  margin-left: 2vw;
  border: 5px solid black;
  border-radius: 35px;
  padding: 10px 0 0;
}

#app-user .profile-button{
  bottom: 0;
}

#app-user button{
  width: 100%;
  border-radius: 35px;
  background-color: #4b9ffd;
  bottom: 0;
}
.profile .identification{
  margin-bottom: 3vh;
  color: blue;
}

.profile .information{
  width: 100%;
  height: 8vh;
  border: 2px solid lightgray;
  padding-top: 2vh;
  font-weight: bold;
}

.profile .information:hover{
  background-color: #4b73e9;
}

#app-user .user-type{
  width: 20vw;
  margin-left: 2vw;
  border: 5px solid green;
  border-radius: 35px;
  display: block;
}

#app-user .user-type .user-type-text{
  font-size: 4vh;
  color: #e70c2b;
  font-family: "Agency FB",serif;
  font-weight: bold;
}

#app-user h1{
  margin-top: 4vh;
  text-decoration: underline;
  color: #3070ff
}

#app-user .container{
  display: block;
}

#app-user .restaurant{
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

#app-user .box:hover{
  background-color: #73cb73;
}

#app-user .content {
  margin-top: 5vh;
}
#app-user .content small {
  color: #e70c2b;
  float: right;
}

#app-user .user-type img{
  border-radius: 0;
  box-shadow: none;
}

#app-user .user-type .image{
  margin: auto;
  padding: 10px;
}


#app-user .image{
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

#app-user .level-left{
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
.meter progress{
  background-image:
    -webkit-linear-gradient(-45deg,
    transparent 33%, rgba(0, 0, 0, .1) 33%,
    rgba(0,0, 0, .1) 66%, transparent 66%),
    -webkit-linear-gradient(top,
    rgba(255, 255, 255, .25),
    rgba(0, 0, 0, .25)),
    -webkit-linear-gradient(left, #09c, #f44);

  border-radius: 2px;
  background-size: 35px 20px, 100% 100%, 100% 100%;
}
.meter progress[value]::-webkit-progress-value {
  background-image:
    -webkit-linear-gradient(-45deg,
    transparent 33%, rgba(0, 0, 0, .1) 33%,
    rgba(0,0, 0, .1) 66%, transparent 66%),
    -webkit-linear-gradient(top,
    rgba(255, 255, 255, .25),
    rgba(0, 0, 0, .25)),
    -webkit-linear-gradient(left, #09c, #f44);

  border-radius: 2px;
  background-size: 35px 20px, 100% 100%, 100% 100%;
}

.meter .meter-text{
  margin-top: 2vh;
  margin-bottom: 0;
}
</style>
