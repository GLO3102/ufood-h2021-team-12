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
                :items="users"
                label="Users"
                item-text="name"
                item-value="id"
                @input="getUsers"
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
        <v-btn color="blue darken-1" text v-on:click="this.followUsers" @click="dialog = false; followUsers">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "addFollowers",
  props: ['users', 'followUsers', 'following'],
  data: () =>({
    dialog: false
  }),
  methods: {
    getUsers(selectUsers){
      this.following.data = selectUsers;
      console.log(this.following.data)
    }
  }
}
</script>

<style scoped>

</style>
