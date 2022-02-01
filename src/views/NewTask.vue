<template>
  <div>
    <div class="container mt-1 d-flex justify-content-center">
      <ul class="nav">
        <li class="nav-item">
          <router-link tag="a" class="nav-link" to="/"> Home </router-link>
        </li>
      </ul>
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
          required
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
          required
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
          required
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
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="task-status">Status</label>
        <select
          class="custom-select custom-select-lg mb-3 form-control"
          id="task-status"
          v-model="status"
          required
        >
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="formFile" class="form-label">Add file</label>
        <input
          class="form-control"
          type="file"
          id="formFile"
          @change="handleFileUpload($event)"
        />
      </div>
      <div class="row container mt-3">
        <button type="submit" class="btn btn-primary" @click="saveTask()">
          Save
        </button>
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
          <a @click="deleteComment(item.text)" class="btn btn-danger"
            >Delete comment
          </a>
        </div>
      </div>
    </div>
    <button
      v-if="commenting == false"
      type="submit"
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
      attachment: "none",
      comments: [],
    };
  },

  methods: {
    handleFileUpload(event) {
      this.attachment = event.target.files[0];
    },
    addComment() {
      this.commenting = true;
    },
    saveTask() {
      if (
        this.id &&
        this.specialist &&
        this.title &&
        this.descritpion &&
        this.status
      ) {
        this.edit = false;
        const payload = {
          id: this.id,
          specialist: this.specialist,
          title: this.title,
          descritpion: this.descritpion,
          status: this.status,
          comments: this.comments,
          attachment: this.attachment,
        };
        this.$store.dispatch("addTask", payload);
        this.$router.push("/");
      } else {
        alert("Complete missing data");
      }
    },
    saveComment() {
      if (this.commentAuthor && this.commentText) {
        this.commenting = false;
        this.comments.push({
          author: this.commentAuthor,
          text: this.commentText,
        });

        this.commentAuthor = "";
        this.commentText = "";
      } else {
        alert("Comment must have an author and text");
      }
    },
    deleteComment(text) {
      this.commenting = false;
      this.comments = this.comments.filter((item) => item.text !== text);
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
