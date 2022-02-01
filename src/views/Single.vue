<template>
  <div>
    <div class="container mt-1 d-flex justify-content-center">
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link active" href="/">Home</a>
        </li>
      </ul>
    </div>
    <div class="row container mt-3">
      <button
        v-if="edit === false"
        type="button"
        class="btn btn-success"
        @click="editTask()"
      >
        Edit
      </button>
      <button v-else type="button" class="btn btn-primary" @click="saveTask()">
        Save
      </button>
      <button type="button" class="btn btn-danger" @click="deleteTask()">
        Delete Task
      </button>
    </div>
    <form class="mt-2">
      <div class="form-group">
        <label for="task-id">Task ID</label>
        <input
          type="number"
          class="form-control"
          id="task-id"
          :placeholder="getItem.id"
          v-model="id"
          :value="getItem.id"
          readonly
        />
      </div>
      <div class="form-group">
        <label for="task-specialist">Specialist</label>
        <input
          type="text"
          class="form-control"
          id="task-specialist"
          :placeholder="getItem.specialist"
          v-model="specialist"
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
          v-model="descritpion"
          :readonly="edit === false"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="task-status"> Status</label>
        <select
          class="custom-select custom-select-lg mb-3 form-control"
          id="task-status"
          :disabled="edit === false"
          v-model="status"
        >
          <option :selected="getItem.status == 'Active'" value="Active">
            Active
          </option>
          <option :selected="getItem.status == 'Pending'" value="pending">
            Pending
          </option>
          <option :selected="getItem.status == 'Done'" value="done">
            Done
          </option>
        </select>
      </div>
    </form>
    <div class="row container d-flex justify-content-between">
      <div
        class="card mt-5"
        style="width: 18rem"
        v-for="(item, index) in getItem.comments"
        :key="index"
      >
        <div class="card-body">
          <h5 class="card-title">{{ item.author }}</h5>
          <p class="card-text">
            {{ item.text }}
          </p>
          <a @click="deleteComent()" class="btn btn-danger">Delete coment</a>
        </div>
      </div>
    </div>
    <button
      v-if="commenting == false"
      type="button"
      class="btn btn-success"
      @click="addComment()"
    >
      Add comment
    </button>
    <button v-else type="button" class="btn btn-primary" @click="saveComment()">
      Save comment
    </button>

    <div v-if="commenting === true">
      <form class="mt-5">
        <div class="form-group">
          <label for="comment-author">Author</label>
          <input
            type="text"
            class="form-control"
            id="comment-author"
            placeholder="Author"
            v-model="commentAuthor"
          />
        </div>

        <div class="form-group">
          <label for="comment-text">Comment</label>
          <textarea
            class="form-control"
            id="comment-text"
            rows="3"
            placeholder="Comment"
            v-model="commentText"
          ></textarea>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentAuthor: "",
      commentText: "",
      edit: false,
      commenting: false,
      id: "",
      specialist: "",
      title: "",
      descritpion: "",
      status: "",
      attachments: "",
      comments: [],
    };
  },
  computed: {
    getItem() {
      return this.$store.getters.getTaskById(this.$route.params.id);
    },
  },
  methods: {
    editTask() {
      this.edit = true;
    },
    addComment() {
      this.commenting = true;
    },
    saveTask() {
      this.edit = false;
    },
    saveComment() {
      this.commenting = false;
    },
    deleteComment() {
      this.edit = false;
    },
    deleteTask() {
      this.commenting = false;
    },
  },
};
</script>

<style scoped lang="scss"></style>
