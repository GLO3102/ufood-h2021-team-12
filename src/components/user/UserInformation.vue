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
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="information in userInformation"
          :key="information.title"
          :cols="information.flex"
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
          <v-icon>mdi-bookmark</v-icon>
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

const api = new Api();
export default {
  name: "UserInformation",
  data: () => ({
    followerInformation: [],
    userName: String,
    userInformation: []
  }),
  async created() {
    const randomUser = await api.getRandomUser();
    api.registerUser(randomUser);
    const profile = await api.getUser();
    //setting user name
    this.userName = profile.name;
    //setting user information
    this.followerInformation.push({
      title: "followers",
      data: profile.followers.length
    });
    this.followerInformation.push({
      title: "following",
      data: profile.following.length
    });
    this.userInformation.push({ title: "User rates", data: profile.rating });
    this.userInformation.push({ title: "email", data: profile.email });
  }
};
</script>

<style scoped></style>
