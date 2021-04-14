<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="300px"
  >
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
        <span class="headline">Add new friend</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <v-autocomplete
                v-model="selectUsers"
                :items="users"
                label="Users"
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
        <v-btn color="blue darken-1" text @click="dialog = false; followUsers">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "addFollowers",
  props: ['users'],
  data: () =>({
    dialog: false,
    selectUsers: []
  }),
  methods: {
    followUsers(){
      console.log(this.selectUsers)
    }
  }
}
</script>

<style scoped>

</style>
