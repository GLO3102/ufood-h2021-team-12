<template>
  <modal name="example">
    <a style="color:black; display:flex; flex-direction: column">
      <div>
        <button style="float: right" @click="close">
          ❌
        </button>
      </div>
      <h1 style="color:black;">Review</h1>

      <div>
        Rating :
        <select
          id="rating"
          style="width:10%;"
          v-on:change="priceRangeChange($event)"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div style="padding-top: 25px">Leave a comment :</div>
      <div><textarea rows="4" cols="50" id="comment" /></div>
      <div style="padding-top: 25px">
        <button v-on:click="submit">Submit</button>
      </div>
    </a>
  </modal>
</template>

<script>
import Api from "@/services/api";
export default {
  name: "MyComponent",
  props: ["restaurantid"],
  mounted() {
    this.$modal.show("example");
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async submit() {
      const api = new Api();
      const token = this.$cookies.get("token");
      const tokeninfo = await api.getUser(token);
      const userId = tokeninfo.id;
      let now = new Date();

      await api.leaveReview(
        token,
        userId,
        this.restaurantid,
        document.getElementById("comment").value,
        document.getElementById("rating").value,
        now.toJSON()
      );
      this.$emit("close");
    }
  }
};
</script>
<style>
.modal {
  text: black;
  color: black;
}
</style>
