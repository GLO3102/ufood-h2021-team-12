<template>
  <div>
    <div
      class="restaurant-review-profile-icon-holder content-flex-centered"
    >
      <img
        class="restaurant-review-profile-icon"
        src="@/assets/defaultIcon.png"
        alt="Profile Icon"
      />
    </div>
    <div class="restaurant-review-right">
      <div class="restaurant-review-header">
        <h3 class="restaurant-review-profile-name">
          {{ this.name }}
        </h3>
        <div class="restaurant-review-spacer1"></div>
        <h3 class="restaurant-review-name">
          {{ this.review.rating.toFixed(2) }}
        </h3>
        <div class="restaurant-review-spacer2"></div>
        <h3 class="restaurant-review-name"></h3>
      </div>
      <div class="restaurant-review-content">
        {{this.review.comment}}
      </div>
    </div>
  </div>
</template>

<script>
import UFoodApi from "@/services/UFoodApi";

export default {
  name: "Comment",
  props: ["review"],
  data: () => {
    return {
      name: null
    };
  },
  async created() {
    let fetched = await UFoodApi.betterFetch("users/" + this.review.user_id, false);
    this.name = fetched.name;
  }
}
</script>

<style scoped>

</style>
