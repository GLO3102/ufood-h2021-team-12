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
        <v-col
          v-for="followers in followerInformation"
          :key="followers.title"
          :cols="followers.flex"
        >
          <v-card class="d-flex justify-center">
            <h3>{{ followers.title }}</h3>
          </v-card>
          <p>{{ followers.data }}</p>
          <v-card-actions>
            <v-spacer></v-spacer>
                <addFollowers v-model="dialog" v-bind:users="users"/>
<!--            <v-btn icon>-->
<!--              <v-icon>mdi-plus</v-icon>-->
<!--            </v-btn>-->
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

        <v-btn icon>
          <v-icon>mdi-information</v-icon>
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

const api = new Api();
export default {
  name: "UserInformation",
  components: {AddFollowers},
  data: () => ({
    followerInformation: [],
    userName: String,
    userInformation: [],
    users: [],
    dialog: false
  }),
  async created() {
    const token = this.$cookies.get("token")
    const user = await api.getUser(token);
    api.registerToken(token)
    api.registerUser(user);
    //setting user name
    this.userName = user.name;
    //setting user information
    this.followerInformation.push({
      title: "followers",
      data: user.followers.length
    });
    this.followerInformation.push({
      title: "following",
      data: user.following.length
    });
    this.userInformation.push({ title: "User rates", data: user.rating });
    this.userInformation.push({ title: "email", data: user.email });
    //set users
    const users = await api.getUsers();
    for (let i = 0; i < users.items.length; i++) {
      this.users.push(users.items[i].name);
      console.log("userssssss")
      console.log(users.items[i])
    }
  }
};
</script>

<style scoped>
button {
  background-color: #4b9ffd;
}
</style>
