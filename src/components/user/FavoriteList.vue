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
              :src="randomImg"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="favorite.name"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon v-on:click="addingRestaurant = !addingRestaurant">
                <v-icon>mdi-plus</v-icon>
              </v-btn>

              <v-btn icon v-on:click="updateName = !updateName">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <v-btn icon v-on:click="setView(favorite)">
                <v-icon>mdi-format-list-bulleted-square</v-icon>
              </v-btn>
              <v-btn icon v-on:click="deleteList(favorite.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn icon v-on:click="setDeleteActive(favorite.id)">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
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
            v-on:click="addRestaurant(favorite, list_name) (addingRestaurant = !addingRestaurant) (this.clean) "
            class="list_inputOK"
          >
            Add a new restaurant to list
          </button>
          <button
            type="button"
            v-if="updateName"
            v-on:click="
              updateRestaurant(favorite, list_name) (updateName = !updateName);
            "
            class="list_inputOK"
          >
            OK
          </button>
        </v-col>
      </v-row>
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
        v-on:click="addList(list_name) (addingList = !addingList)"
        class="list_inputOK"
      >
        Create a new list
      </button>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn icon v-on:click="addingList = !addingList">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "FavoriteList",
  props: [
    "favorites_restaurants",
    "onUpdate",
    "deleteList",
    "setDeleteActive",
    "setView",
    "addList",
    "addRestaurant",
    "updateRestaurant"
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
    activeDeletion: false
  }),
  methods: {
    randomImg() {
      return this.listImages[Math.floor(Math.random() * this.listImages.length)]
        .src;
    },
    clean() {
      this.list_name = "";
    }
  }
};
</script>

<style scoped>
.list_inputOK {
  position: absolute;
  left: 60vw;
  top: 40vh;
  height: 5vh;
  width: auto;
}
.list_input {
  position: absolute;
  left: 50vw;
  top: 40vh;
  height: 5vh;
}
</style>
