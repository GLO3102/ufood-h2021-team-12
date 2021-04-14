<template>
  <div id="app" data-app>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn :style="`backgroundColor: #4b9ffd`" v-bind="attrs" v-on="on">
          Sign up
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Legal first name*"
                  v-model="first_name"
                  :color="`${this.colors[0]}`"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Legal last name*"
                  v-model="last_name"
                  :color="`${this.colors[1]}`"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  v-model="email"
                  :color="`${this.colors[2]}`"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  v-model="password"
                  :color="`${this.colors[3]}`"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <small :style="`Color: red`">Already have an account</small>
          <v-btn color="blue darken-1" text @click="dialog = false">
            <signIn />
            Sign <in></in>
          </v-btn>
          <signIn v-model="dialog"/>
          <v-btn :style="`backgroundColor: ${this.colors[4]}`" text @click="this.validUserInformation">
            Register
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SignIn from "@/components/connection/signIn";
import Api from "@/services/api";
const api = new Api();
export default {
  name: "signUp",
  props: ["api"],
  components: { SignIn },
  data: () => ({
    dialog: false,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    colors: ["#4b9ffd", "#4b9ffd", "#4b9ffd", "#4b9ffd", "#4b9ffd"]
  }),
  methods: {
    validFirstName() {
      if (this.first_name.trim() === "") {
        this.colors[0] = "#FF0000";
        return false;
      }
      return true;
    },
    validLastName() {
      if (this.last_name.trim() === "") {
        this.colors[1] = "#FF0000";
        return false;
      }
      return true;
    },
    validEmail() {
      if (this.email.trim() === "") {
        this.colors[2] = "#FF0000";
        return false;
      }
      return true;
    },
    validPassword() {
      if (this.password.trim() === "") {
        this.colors[3] = "#FF0000";
        return false;
      }
      return true;
    },
    validUserInformation() {
      if ((this.validFirstName() && this.validLastName() && this.validEmail() && this.validPassword())) {
        const full_name  = this.first_name + this.last_name;
        api.createUser(full_name, this.email, this.password);
        console.log(full_name);
        this.dialog = false;
      }
      this.colors[4] = "#FF0000"
    }
  }
};
</script>
