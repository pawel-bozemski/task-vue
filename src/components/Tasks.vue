<template>
  <div>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    items() {
      return this.$store.state.tasks;
    },
  },
};
</script>

<style scoped lang="scss"></style>
