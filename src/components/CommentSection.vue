<template>
  <div class="comment-section">
    <div class="comment-selection">
      <div class="flex-separator"></div>
      <button class="take-visit-button" v-on:click="modal">
        Leave a review
      </button>
      <div class="flex-separator"></div>
      <div class="param-info">Review per page:</div>
      <v-select
        v-model="reviewPerPage"
        :options="[10, 20, 30, 40, 50]"
        @input="fetchAgain"
      />
      <div class="param-info">Page:</div>
      <v-select
        v-model="page"
        :options="this.generatePageOptions(page)"
        @input="fetchAgain"
      />
    </div>
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
import Modal from "./Modal";
import VModal from "vue-js-modal";
import Vue from "vue";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);
Vue.use(VModal);

export default {
  name: "CommentSection",
  components: { Comment },
  props: ["id"],
  data: () => {
    return {
      items: null,
      page: 0,
      reviewPerPage: 10
    };
  },

  async created() {
    await this.fetchAgain();
  },
  methods: {
    modal: function() {
      this.$modal.show(Modal);
    },
    generatePageOptions: function(page) {
      let page_options = [];
      for (let i = page - 2; i <= page + 2; i++) {
        if (i >= 0) {
          page_options.push(i);
        }
      }
      return page_options;
    },
    fetchAgain: async function() {
      let fetched = await UFoodApi.betterFetch(
        "restaurants/" +
          this.id +
          "/visits" +
          "?limit=" +
          this.reviewPerPage +
          "&page=" +
          this.page,
        false
      );
      this.items = fetched.items;
    }
  }
};
</script>

<style scoped>
.take-visit-button {
  background-color: #333;
  color: cyan;
  border: 1px solid cyan;
  min-width: 20ch;
}
.comment-selection {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
}
.param-info {
  align-self: center;
  color: #333;
  padding: 0 5px;
}
</style>
