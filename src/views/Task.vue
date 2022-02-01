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
          :placeholder="getItem.id"
          v-model="getItem.id"
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
          :placeholder="getItem.specialist"
          v-model="getItem.specialist"
          :readonly="edit === false"
          required
        />
      </div>
      <div class="form-group">
        <label for="task-title">Title</label>
        <input
          type="text"
          class="form-control"
          id="task-title"
          :placeholder="getItem.title"
          v-model="getItem.title"
          :readonly="edit === false"
          required
        />
      </div>
      <div class="form-group">
        <label for="task-descritpion">Descritpion</label>
        <textarea
          class="form-control"
          id="task-descritpion"
          rows="3"
          :placeholder="getItem.descritpion"
          v-model="getItem.descritpion"
          :readonly="edit === false"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="task-status"> Status</label>
        <select
          class="custom-select custom-select-lg mb-3 form-control"
          id="task-status"
          :disabled="edit === false"
          v-model="getItem.status"
          required
        >
          <option :selected="getItem.status == 'Active'" value="Active">
            Active
          </option>
          <option :selected="getItem.status == 'Pending'" value="Pending">
            Pending
          </option>
          <option :selected="getItem.status == 'Done'" value="Done">
            Done
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="task-attachment">Attachments</label>
        <input
          type="text"
          class="form-control"
          id="task-attachment"
          :placeholder="
            getItem.attachments.name
              ? getItem.attachments.name
              : getItem.attachments
          "
          readonly
          required
        />
      </div>
      <div class="mb-3" :class="{ noshow: !edit }">
        <label for="formFile" class="form-label">Add file</label>
        <input
          class="form-control"
          type="file"
          id="formFile"
          @change="handleFileUpload($event)"
          :readonly="edit === false"
        />
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
        <button
          v-else
          type="submit"
          class="btn btn-primary"
          @click="saveTask()"
        >
          Save
        </button>
        <button type="button" class="btn btn-danger" @click="deleteTask()">
          Delete Task
        </button>
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
          <a @click="deleteComment(item.text)" class="btn btn-danger"
            >Delete comment</a
          >
        </div>
      </div>
    </div>
    <button
      v-if="commenting == false"
      type="button"
      class="btn btn-success mt-5"
      @click="addComment()"
    >
      Add comment
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
            required
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
            required
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary" @click="saveComment()">
          Save comment
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      commentAuthor: "",
      commentText: "",
      edit: false,
      commenting: false,
      attachment: "",
    };
  },
  computed: {
    ...mapGetters(["getTaskById"]),
    getItem() {
      return this.getTaskById(this.$route.params.id);
    },
  },
  methods: {
    handleFileUpload(event) {
      this.attachment = event.target.files[0];
    },
    editTask() {
      this.edit = true;
    },
    addComment() {
      this.commenting = true;
    },
    saveTask() {
      if (
        this.getItem.id &&
        this.getItem.specialist &&
        this.getItem.title &&
        this.getItem.descritpion &&
        this.getItem.status
      ) {
        this.edit = false;
        const payload = {
          id: this.getItem.id,
          specialist: this.getItem.specialist,
          title: this.getItem.title,
          descritpion: this.getItem.descritpion,
          status: this.getItem.status,
          attachments: this.attachment,
        };
        this.$store.dispatch("editTask", payload);
      } else {
        alert("Complete missing data");
      }
    },
    saveComment() {
      if (this.commentAuthor && this.commentText) {
        this.commenting = false;
        const payload = {
          id: this.getItem.id,
          author: this.commentAuthor,
          text: this.commentText,
        };
        this.$store.dispatch("addComment", payload);
        this.commentAuthor = "";
        this.commentText = "";
      } else {
        alert("Comment must have an author and text");
      }
    },
    deleteComment(text) {
      this.commenting = false;
      const payload = {
        id: this.getItem.id,
        text: text,
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

<style scoped lang="scss">
.noshow {
  display: none;
}
</style>
