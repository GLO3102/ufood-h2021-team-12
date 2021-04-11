<template>
  <div id="app" data-app>
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" :style="`backgroundColor: #4b9ffd`">
          <v-icon>mdi-format-list-bulleted-square</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Select Country</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-list three-line>
            <template v-for="(restaurant, index) in restaurants">
              <!--            <v-subheader-->
              <!--              v-if="item.header"-->
              <!--              :key="item.header"-->
              <!--              v-text="item.header"-->
              <!--            ></v-subheader>-->

              <v-divider :key="index"></v-divider>

              <v-list-item :key="restaurant.name">
                <v-list-item-avatar>
                  <v-img :src="restaurant.pictures[0]"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    v-html="restaurant.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="restaurant.address"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <!--  <h1>Restaurant of favorite list</h1>-->
  <!--  <div class="container">-->
  <!--    <div class="restaurant" v-for="(restaurant, id) in restaurants" :key="id">-->
  <!--      <div class="box">-->
  <!--        <div class="media">-->
  <!--          <div class="media-left">-->
  <!--            <div class="image">-->
  <!--              <img :src="restaurant.pictures[0]" alt="Image" />-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <div class="media-content">-->
  <!--            <div class="content">-->
  <!--              <p>-->
  <!--                <strong>{{ restaurant.name }}</strong>-->
  <!--                <button-->
  <!--                  type="button"-->
  <!--                  v-if="activeDeletion"-->
  <!--                  v-on:click="deleteRestaurants(restaurant.id)"-->
  <!--                >-->
  <!--                  Delete this Restaurant-->
  <!--                </button>-->
  <!--                <br />-->
  <!--                <br />-->
  <!--                Address: {{ restaurant.address }}-->
  <!--              </p>-->
  <!--            </div>-->
  <!--            <div class="level-left">-->
  <!--              <a class="level-item">-->
  <!--                <span class="icon is-small"><i class="fa fa-heart"></i></span>-->
  <!--                <span class="visits">{{ restaurant.visit }}</span>-->
  <!--              </a>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script>
export default {
  name: "RestaurantList",
  props: ["restaurants"],
  data: () => ({
    dialog: false
  })
};
</script>

<style scoped></style>
