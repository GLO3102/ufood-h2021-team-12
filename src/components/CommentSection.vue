<template>
  <div class="comment-section">
    <div class="restaurant-review-block color-scheme-global">
      <Comment
        class="restaurant-review"
        v-for="item in this.items"
        v-bind:key="item.id"
        v-bind:review="item"
      />
    </div>
  </div>
</template>

<script>
import UFoodApi from "@/services/UFoodApi";
import Comment from "@/components/Comment";

export default {
  name: "CommentSection",
  components: { Comment },
  props: ["id"],
  data: () => {
    return {
      items: null
    };
  },

  async created() {
    let fetched = await UFoodApi.betterFetch(
      "restaurants/" + this.id + "/visits",
      false
    );
    this.items = fetched.items;
  }
};
</script>

<style scoped></style>
