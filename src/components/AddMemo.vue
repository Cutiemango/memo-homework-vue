<template>
    <div>
        <h3>Add Memo</h3>
        <div class="add_memo">
            <div>
                <label for="user">User Name</label>
                <input name="user" type="text" v-model="memo.user" />
            </div>
            <div>
                <label for="title">Memo Title</label>
                <input name="title" type="text" v-model="memo.title" />
            </div>

            <div class="textarea">
                <label for="content">Memo Content</label>
                <textarea for="content" v-model="memo.content" @input="handleInput" />
            </div>

            <div class="button">
                <button @click="onClick">
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "AddMemo",
    methods: {
        ...mapActions(["addMemo"]),
        handleInput(e) {
            this.resizeElement(e.target);
        },
        resizeElement(element) {
            if (element) {
                element.style.height = "auto";
                element.style.height = element.scrollHeight + "px";
            }
        },
        onClick(e) {
            e.preventDefault();
            let { user, title, content } = this.memo;

            user = user || "Default user";
            title = title || "Default title";
            content = content || "Default content";

            this.addMemo({ user, title, content });

            this.memo = {
                user: "",
                title: "",
                content: "",
            };
        },
    },
    data() {
        return {
            memo: {
                user: "",
                title: "",
                content: "",
            },
        };
    },
};
</script>

<style scoped lang="scss">
.add_memo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    div {
        label {
            font-size: 14px;
            padding-bottom: 5px;
            display: inline-block;
        }

        input {
            width: 100%;
            border: none;
            border-bottom: 2px solid rgb(193, 193, 193);
            box-sizing: border-box;
            font-family: inherit;

            &:focus,
            &:hover {
                outline: none;
                border-bottom: 2px solid rgb(70, 70, 70);
            }
        }

        textarea {
            width: 100%;
            padding: 0;
            margin: 0;
            border-radius: 6px;
            border: 2px solid rgb(193, 193, 193);
            resize: none;
            font-family: inherit;
            box-sizing: border-box;
            padding: 6px;
            overflow: hidden;

            &:focus,
            &:hover {
                outline: none;
                border: 2px solid rgb(70, 70, 70);
            }
        }

        width: 100%;
        margin: 5px 0;
    }

    .button {
        text-align: center;
    }
}
</style>
