<template>
  <modal class="reviewModal" name="review">
    <div class="review-box">
      <div class="review-top">
        <button class="review-close-button" @click="close">
          ❌
        </button>
        <h1 class="review-header">Review</h1>
      </div>
      <div>
        Rating :
        <select
          class="review-selector"
          id="rating"
          style="width:10%;"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div>Leave a comment :</div>
      <div><textarea class="review-text-area" rows="4" cols="50" id="comment" /></div>
      <div class="weird-flex-but-ok">
        <button class="modal-submit-button" v-on:click="submit">Submit</button>
      </div>
    </div>
  </modal>
</template>

<script>
import Api from "@/services/api";
export default {
  name: "MyComponent",
  props: ["restaurantid"],
  mounted() {
    this.$modal.show("review");
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async submit() {
      const api = new Api();
      const token = this.$cookies.get("token");
      const tokeninfo = await api.getTokenInfo(token);
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
      //I'm so sorry, this was the quickest way to refresh the comment section on a short time constraint
      location.reload();
      this.$emit("close");
    }
  }
};
</script>
<style>
.reviewModal {
  width: 100%;
}
.review-selector {
  background-color: #ddd;
}
.review-box {
  color: black;
  display: flex;
  flex-direction: column;
  background-color: darkgrey;
}
.review-close-button {
  float: right;
}
.review-text-area {
  border: 1px solid;
}

.weird-flex-but-ok {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-submit-button {
  width: 50%;
  border-radius: 35px;
  font-weight: bold;
  font-size: 15px;
  bottom: 0;
  background-color: #555;
  color: white;
}
</style>
