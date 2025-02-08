import { defineStore } from "pinia";
import axios from "axios";

export const postStore = defineStore("post", {
    state: () => ({
        posts: [],
        title: "",
        description: "",
    }),
    getters: {},
    actions: {
        getPosts() {
            axios
                .get("/posts")
                .then((response) => {
                    this.posts = response.data;
                    console.log(response.data);
                    
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        addItem() {
            if (this.title && this.description) {
                let form_data = {
                    title: this.title,
                    description: this.description,
                };
                axios
                    .post("/posts", form_data)
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
    },
});
