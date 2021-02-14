<template>
  <div id="app-home">
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
                  <strong>{{ restaurant.name }}</strong>  <small>{{ restaurant.handle }}</small>
                  <br>
                  {{ restaurant.moto }}
                </p>
              </div>
              <div class="level-left">
                <a class="level-item">
                  <span class="icon is-small"><i class="fa fa-heart"></i></span>
                  <span class="likes">{{ restaurant.likes }}</span>
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
      restaurants: [
        {
          id: 1,
          name: "Jon's Pizza",
          handle: "@jokerjames",
          img:
            "https://pixabay.com/get/g91d3306a35c38c28cb7c6e7d11c381676b68f9b408bff70ece19ac0b6127c79d34c177fc241099fb3a00af831bee9425_640.jpg",
          moto: "If you don't succeed, dust yourself off and try again.",
          likes: 10
        },
        {
          id: 2,
          name: "Vegetarians area",
          handle: "@fantasticfatima",
          img:
            "https://pixabay.com/get/g0895c39ed696538396bbdf053f507a28989f435aa930dc3ddd2aa57bf4ea085dccb8e099a69fcbccbbaa94ee78e87a28_640.jpg",
          moto: "Better late than never but never late is better.",
          likes: 12
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        },
        {
          id: 3,
          name: "Sushi shop",
          handle: "@xeroxin",
          img:
            "https://pixabay.com/get/gca85462d2f7d493f4b966710b07bb55ca292ffd13164a98b83dfbea43240892fd29b20fada50ef59c1a1bfcda80f2a0c_640.jpg",
          moto: "Beauty in the struggle, ugliness in the success.",
          likes: 18
        }
      ]
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
  height: 25vh;
  padding: 5px 5px 4px;
  display: table;
}

#app-home .box {
  width: 100%;
  height: 100%;
  border: 3px solid darkgrey;
  background-color: darkgrey;
  margin-bottom: 0;
  border-radius: 0;
  display: grid;
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

#app-home .level-item {
  padding-left: 10px;
  color: #f60334;
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
</style>
