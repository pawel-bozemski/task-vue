<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Specialist</th>
          <th scope="col">Title</th>
          <th scope="col">Descritpion</th>
          <th scope="col">Status</th>
          <th scope="col">Attachments</th>
          <th scope="col">Comments</th>
        </tr>
      </thead>
      <tbody>
        <router-link
          tag="tr"
          v-for="item in items"
          :key="item.id"
          :to="{ name: 'task', params: { id: item.id } }"
        >
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.specialist }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.descritpion }}</td>
          <td>{{ item.status }}</td>
          <td>
            {{
              item.attachments.name ? item.attachments.name : item.attachments
            }}
          </td>
          <td>{{ item.comments.length }}</td>
        </router-link>
      </tbody>
    </table>
    <div class="row container mt-3">
      <router-link
        tag="button"
        type="button"
        class="btn btn-danger"
        :to="{ name: 'new-task' }"
      >
        Add New Task
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",

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
