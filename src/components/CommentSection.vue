<template>
  <div class="comment-section">
    <div class="comment-selection">
      <div class="flex-separator"></div>
      <button class="visit-button" v-on:click="modal(currentRestaurantId)">
        Leave a review
      </button>
      <div class="flex-separator"></div>
      <div class="param-info">Review per page (oldest to newest):</div>
      <v-select
        class="favorite-selector"
        v-model="reviewPerPage"
        :options="[10, 20, 30, 40, 50]"
        @input="fetchAgain"
      />
      <div class="param-info">Page:</div>
      <v-select
        class="favorite-selector"
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
import Comment from "@/components/Comment";
import Modal from "./Modal";
import VModal from "vue-js-modal";
import Vue from "vue";
import vSelect from "vue-select";
import Api from "@/services/api";

const api = new Api();
Vue.component("v-select", vSelect);
Vue.use(VModal);

export default {
  name: "CommentSection",
  components: { Comment },
  props: ["id", "currentRestaurantId"],
  data: () => {
    return {
      invalidToken: true,
      items: null,
      page: 0,
      reviewPerPage: 10
    };
  },

  async created() {
    const token = await this.$cookies.get("token");

    const user = await api.getTokenInfo(token);
    if (user.id.length > 0) {
      this.invalidToken = false;
      api.registerToken(token);

      await this.fetchAgain();
    } else {
      this.invalidToken = true;
      this.hasSignedIn = false;
    }
  },
  methods: {
    modal: function(currentRestaurantId) {
      this.$modal.show(Modal, { restaurantid: currentRestaurantId });
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
      let response = await api.getReviews(
        this.id,
        this.reviewPerPage,
        this.page
      );
      //I WOULD reverse this list to get reviews by date written, but the api serves them from oldest to newest
      //this means I wouldn't be able to granularly fetch them page by page (unless I have info on page size and review count)
      //without a bunch of boilerplate that I can't be hassled to work on at 6AM. you can reverse it if you like and play
      //with the page size, it's incredibly ugly. So we're serving oldest to newest with no option: it's a feature, not a bug
      this.items = response.items;
    }
  }
};
</script>

<style scoped>
.visit-button {
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
