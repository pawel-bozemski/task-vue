<template>
  <div>
    <h1>task vue {{ $route.params.id }}</h1>
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
