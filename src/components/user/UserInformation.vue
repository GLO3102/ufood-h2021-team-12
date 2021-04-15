<template>
  <v-card class="d-flex justify-center mb-10">
    <v-container>
      <v-row>
        <v-col sm="12">
          <v-card class="d-flex justify-center">
            <h3>{{ userName }}</h3>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="6">
          <v-card class="d-flex justify-center">
            <h3>{{ followers.title }}</h3>
          </v-card>
          <p>{{ followers.length }}</p>
          <v-card-actions>
            <v-spacer></v-spacer>
            <followList v-model="dialog" v-bind:follow="followers.data" />
          </v-card-actions>
        </v-col>
        <v-col :cols="6">
          <v-card class="d-flex justify-center">
            <h3>{{ following.title }}</h3>
          </v-card>
          <p>{{ following.length }}</p>
          <v-card-actions>
            <v-spacer></v-spacer>
            <addFollowers
              v-model="dialog"
              v-bind:users="users"
              v-bind:followUsers="followUsers"
              v-bind:following="following"
            />
            <removeFollowers
              v-model="dialog"
              v-bind:following="following"
              v-bind:removeFriends="removeFriends"
            />
            <followList v-model="dialog" v-bind:follow="following.data" />
          </v-card-actions>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="information in userInformation"
          :key="information.title"
          :cols="6"
        >
          <v-card class="d-flex justify-center">
            <h3>{{ information.title }}</h3>
          </v-card>
          <p>{{ information.data }}</p>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn icon :style="`backgroundColor: #FF0000`" v-on:click="logOut">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
import Api from "@/services/api";
import AddFollowers from "@/components/user/addFollowers";
import FollowList from "@/components/user/followList";
import RemoveFollowers from "@/components/user/removeFollowers";

const api = new Api();
export default {
  name: "UserInformation",
  components: { RemoveFollowers, FollowList, AddFollowers },
  data: () => ({
    followers: {},
    following: {},
    userName: String,
    userInformation: [],
    users: [],
    dialog: false
  }),
  methods: {
    async followUsers() {
      for (let i = 0; i < this.following.data.length; i++) {
        await api.followUser(this.following.data[i].id);
      }
      location.reload();
    },
    async removeFriends() {
      for (let i = 0; i < this.following.data.length; i++) {
        await api.removeUser(this.following.data[i].id);
      }
      location.reload();
    },
    async logOut(){
      await api.logOut();
      this.$cookies.remove("token");
      location.reload();
    }
  },
  async created() {
    const token = this.$cookies.get("token");
    const user = await api.getUser(token);
    api.registerToken(token);
    api.registerUser(user);
    //setting user name
    this.userName = user.name;
    //setting user information
    const followers = await api.getFollowers();
    this.followers = {
      title: "followers",
      data: followers,
      length: user.followers.length
    };
    const following = await api.getFollowing();
    this.following = {
      title: "following",
      data: following,
      length: user.following.length
    };
    // console.log("iccc");
    // console.log(user.following);
    // console.log(followers);
    this.userInformation.push({ title: "User rates", data: user.rating });
    this.userInformation.push({ title: "email", data: user.email });
    //set users
    const users = await api.getUsers();
    for (let i = 0; i < users.items.length; i++) {
      this.users.push(users.items[i]);
      // console.log("userssssss")
      // console.log(users.items[i])
    }
  }
};
</script>

<style scoped>
button {
  background-color: #4b9ffd;
}
</style>
