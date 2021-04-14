<template>
  <div id="app" data-app>
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" :style="`backgroundColor: #4b9ffd`">
          <v-icon>mdi-format-list-bulleted-square</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Restaurant list</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-list three-line>
            <template v-for="(follow, index) in follow">
              <v-divider :key="index"></v-divider>

              <v-list-item :key="follow.id">
                <v-list-item-avatar>
                  <v-img :src="follow.pictures[0]"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    v-html="follow.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="follow.email"
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
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "followList",
  props: ["follow"],
  data: () => ({
    dialog: false
  })
}
</script>

<style scoped>

</style>
