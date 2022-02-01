<template>
  <form>
    <div class="form-group">
      <label for="task-id">Task ID</label>
      <input
        type="number"
        class="form-control"
        id="task-id"
        :placeholder="getItem.id"
        :v-model="id"
        :readonly="edit === false"
      />
    </div>
    <div class="form-group">
      <label for="task-specialist">Specialist</label>
      <input
        type="text"
        class="form-control"
        id="task-specialist"
        :placeholder="getItem.specialist"
        :v-model="specialist"
        :readonly="edit === false"
      />
    </div>

    <div class="form-group">
      <label for="task-descritpion">Descritpion</label>
      <textarea
        class="form-control"
        id="task-descritpion"
        rows="3"
        :placeholder="getItem.descritpion"
        :v-model="descritpion"
        :readonly="edit === false"
      ></textarea>
    </div>

    <div class="form-group">
      <label for="task-status"> Status</label>
      <select
        class="custom-select custom-select-lg mb-3 form-control"
        id="task-status"
        :disabled="edit === false"
        :v-model="status"
      >
        <option :selected="getItem.status == 'Active'" value="Active">
          Active
        </option>
        <option :selected="getItem.status == 'Pending'" value="pending">
          Pending
        </option>
        <option :selected="getItem.status == 'Done'" value="done">Done</option>
      </select>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      edit: false,
      id: "",
      specialist: "",
      title: "",
      description: "",
      status: "",
      attachments: "",
    };
  },
  computed: {
    getItem() {
      return this.$store.getters.getTaskById(this.$route.params.id);
    },
  },
};
</script>

<style scoped lang="scss"></style>
