<template>
  <div>
    <div class="container mt-1 d-flex justify-content-center">
      <ul class="nav">
        <li class="nav-item">
          <router-link tag="a" class="nav-link" to="/"> Home </router-link>
        </li>
      </ul>
    </div>
    <div class="row container mt-3">
      <button type="button" class="btn btn-primary" @click="saveTask()">
        Save
      </button>
    </div>
    <form class="mt-2">
      <div class="form-group">
        <label for="task-id">Task ID</label>
        <input
          type="number"
          class="form-control"
          id="task-id"
          placeholder="1234"
          :value="this.id"
          readonly
        />
      </div>
      <div class="form-group">
        <label for="task-specialist">Specialist</label>
        <input
          type="text"
          class="form-control"
          id="task-specialist"
          placeholder="Specialist"
          v-model="specialist"
        />
      </div>
      <div class="form-group">
        <label for="task-title">Title</label>
        <input
          type="text"
          class="form-control"
          id="task-title"
          placeholder="Title"
          v-model="title"
        />
      </div>
      <div class="form-group">
        <label for="task-descritpion">Descritpion</label>
        <textarea
          class="form-control"
          id="task-descritpion"
          rows="3"
          placeholder="Descritpion"
          v-model="descritpion"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="task-status">Status</label>
        <select
          class="custom-select custom-select-lg mb-3 form-control"
          id="task-status"
          v-model="status"
        >
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </form>
    <div class="row container d-flex justify-content-between">
      <div
        class="card mt-5"
        style="width: 18rem"
        v-for="(item, index) in this.comments"
        :key="index"
      >
        <div class="card-body">
          <h5 class="card-title">{{ item.author }}</h5>
          <p class="card-text">
            {{ item.text }}
          </p>
          <a @click="deleteComment(item.author)" class="btn btn-danger"
            >Delete comment
          </a>
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
      id: Math.floor(1000 + Math.random() * 9000),
      specialist: "",
      title: "",
      descritpion: "",
      status: "",
      attachments: "",
      comments: [],
    };
  },

  methods: {
    addComment() {
      this.commenting = true;
    },
    saveTask() {
      this.edit = false;
      const payload = {
        id: this.id,
        specialist: this.specialist,
        title: this.title,
        descritpion: this.descritpion,
        status: this.status,
      };
      this.$store.dispatch("editTask", payload);
    },
    saveComment() {
      this.commenting = false;
    },
    deleteComment(author) {
      console.log(author);
      this.commenting = false;
      const payload = {
        id: this.getItem.id,
        author: author,
      };
      this.$store.dispatch("removeComment", payload);
    },
    deleteTask() {
      const payload = {
        id: this.getItem.id,
      };
      this.$store.dispatch("removeTask", payload);
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss"></style>
