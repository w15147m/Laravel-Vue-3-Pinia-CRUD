import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const postStore = defineStore("post", {
    state: () => ({
        editMode: false,
        posts: [],
        title: "",
        description: "",
        post_id: "",
        form: {},
    }),
    actions: {
        getPosts() {
            axios.get("/posts").then((res) => {
                this.posts = res.data;
            });
        },
        saveItem() {
            if (!this.title || !this.description) return;
            this.form = {
                title: this.title,
                description: this.description
            };
            let request = this.editMode
                ? axios.put(`/posts/${this.post_id}`, this.form)
                : axios.post("/posts", this.form);
            request.then((res) => {
                this.posts = this.editMode
                    ? this.posts.map((p) => (p.id === this.post_id ? res.data : p))
                    : [...this.posts, res.data];
                this.toString(
                    this.editMode ? "Post updated!" : "Post created!"
                );
                this.title = "";
                this.description = "";
                this.editMode = false;
                this.post_id = null;
            }).catch((error) => {
                this.title = "";
                this.description = "";
                this.editMode = false;
                this.post_id = null;
                console.error("Error saving post:", error);
            });
        }
        ,
        editItem(post) {
            this.post_id = post.id;
            this.editMode = true;
            this.title = post.title;
            this.description = post.description;
        },
        deleteItem(post) {
            axios
                .delete(`/posts/${post.id}`)
                .then(() => {
                    this.posts = this.posts.filter((p) => p.id !== post.id);
                    this.toString("Post deleted!");
                })
                .catch((err) => {
                    console.log(err);
                    toString("Error deleting post!", "error");
                });
        },
        toString(msg, type = "success") {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: type,
                title: msg,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        },
    },
});
