<template>
  <v-dialog v-model="dialog" scrollable max-width="300px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" :style="`backgroundColor: #4b9ffd`">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Remove restaurant </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <v-autocomplete
                :items="currentRestaurants"
                label="Restaurants"
                item-text="name"
                item-value="id"
                @input="getRestaurants"
                return-object
                multiple
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          v-on:click="deleteAllRestaurants"
          @click="dialog = false"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "removeRestaurants",
  props: ["deleteRestaurants", "restaurants", "favorite"],
  data: () => ({
    dialog: false,
    currentRestaurants: [],
    removeList: []
  }),
  methods: {
    getRestaurants(selectUsers) {
      this.removeList = selectUsers;
    },
    deleteAllRestaurants() {
      this.deleteRestaurants(this.favorite, this.removeList);
    }
  },
  created() {
    const currentRestaurants = this.restaurants.filter(x => x.favorite === this.favorite.id);
    for(let i = 0; i < currentRestaurants.length; i++) {
      this.currentRestaurants.push(currentRestaurants[i].data);
    }
  }
}
</script>

<style scoped>

</style>
