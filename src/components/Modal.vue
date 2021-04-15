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
        Visit date : <input type="date" id="date" name="date" />
        Rating :
        <select style="width:10%;" v-on:change="priceRangeChange($event)">
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
        <button v-on:click="close">Submit</button>
      </div>
    </a>
  </modal>
</template>

<script>
export default {
  name: "MyComponent",
  mounted() {
    this.$modal.show("example");
  },
  methods: {
    close() {
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
