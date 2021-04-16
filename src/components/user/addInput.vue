<template>
  <div id="app" data-app>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
          :style="`backgroundColor: #4b9ffd`"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Restaurant</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-autocomplete
                  :items="allRestaurants"
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
            v-on:click="addNewRestaurants"
            @click="
              dialog = false;
            "
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "addInput",
  props: ["addRestaurant", "favorite", "allRestaurants"],
  data: () => ({
    dialog: false,
    list_name: "",
    add_list: []
  }),
  methods: {
    getRestaurants(selectedRestaurant) {
      this.add_list = selectedRestaurant;
    },
    addNewRestaurants(){
      this.addRestaurant(this.favorite, this.add_list);
    }
  },
};
</script>

<style scoped></style>
