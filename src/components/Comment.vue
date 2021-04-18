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
        <h3 class="restaurant-review-name">
          {{this.review.date}}
        </h3>
        <h3 class="restaurant-review-name">
          {{ this.review.rating.toFixed(2) }}
        </h3>
      </div>
      <div class="restaurant-review-content">
        <div class="restaurant-review-content-text">
          {{ this.review.comment }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/services/api";

const api = new Api();

export default {
  name: "Comment",
  props: ["review"],
  data: () => {
    return {
      name: "unknown"
    };
  },
  async created() {
    api.registerToken(this.$cookies.get("token"));
    let fetched = await api.getUser(this.review.user_id);
    if (fetched !== undefined) {
      this.name = fetched.name;
    }
  }
};
</script>

<style scoped>

</style>
