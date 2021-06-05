<template>
    <div>
        <h3>Add Memo</h3>
        <div class="add">
            <form @submit="onSubmit">
                <input type="text" v-model="memo.user" placeholder="Username" />
                <input type="text" v-model="memo.title" placeholder="Memo title" />
                <input type="text" v-model="memo.content" placeholder="Memo content" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "AddMemo",
    data() {
        return {
            memo: {
                user: "",
                title: "",
                content: "",
            },
        };
    },
    methods: {
        ...mapActions(["addMemo"]),
        onSubmit(e) {
            e.preventDefault();
            let { user, title, content } = this.memo;
            user = user || "Default user";
            title = title || "Default title";
            content = content || "Default content";
            this.addMemo({ user, title, content });
        },
    },
};
</script>

<style></style>
