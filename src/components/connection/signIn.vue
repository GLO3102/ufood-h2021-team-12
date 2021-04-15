<template>
  <div id="app" data-app>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
          <v-alert
            dense
            outlined
            type="error"
            v-show="valid"
          >
            Wrong password or email
          </v-alert>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Email*" v-model="email" :color="`${colors[0]}`" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  :color="`${colors[1]}`"
                  v-model="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <small :style="`color=red`">Can't find your account</small>
          <signUp />
          <v-btn :style="`backgroundColor: ${colors[2]}`" text @click="this.connect">
            Connect
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SignUp from "@/components/connection/signUp";
import Api from "@/services/api";
const api = new Api();
export default {
  name: "signIn",
  components: { SignUp},
  data: () => ({
    dialog: true,
    email: "",
    password: "",
    colors: ["#4b9ffd", "#4b9ffd", "#4b9ffd"],
    valid: false
  }),
  methods: {
    validEmail() {
      if (this.email.trim() === "") {
        this.colors[0] = "#FF0000";
        return false;
      }
      return true;
    },
    validPassword() {
      if (this.password.trim() === "") {
        this.colors[1] = "#FF0000";
        return false;
      }
      return true;
    },
    async connect(){
      if(this.validEmail() && this.validPassword()){
        try{
          const user = await api.connectUser(this.email, this.password);
          console.log(user)
          const { token } = user;
          this.$cookies.set("token", token, 200000);
          console.log(token)
          this.dialog = false;
        }
        catch (err){
          this.colors[2] = "#FF0000";
          this.valid = true;
        }
      }
      this.colors[2] = "#FF0000"
      this.valid = true;
    }
  }
}
</script>

<style scoped>

</style>
