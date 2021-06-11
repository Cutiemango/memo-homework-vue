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
                    SUBMIT
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
            transition: border 0.5s ease-in-out;

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
            transition: border 0.5s ease-in-out;

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

        button {
            position: relative;
            font-family: inherit;
            font-size: 16px;
            font-weight: 500;

            padding: 8px 16px;
            margin: 8px;
            border: 0;
            border-radius: 6px;
            cursor: pointer;

            &:hover {
                background: rgb(150, 150, 150);
                transition: background-color 0.25s ease-in-out, transform 0.25s ease-in-out;
                transform: scale(1.2);
            }

            &::before,
            &::after {
                position: absolute;
                top: 0;
                bottom: 0;
                right: 0;
                left: 0;
                border-radius: 6px;
            }

            &::before {
                content: "";
                place-items: center;
                display: grid;
                z-index: 10;
            }
            &::after {
                content: "";
                z-index: 1;
                background: #b1b0b0;
                animation: pulse 1000ms infinite;
            }
        }
        @keyframes pulse {
            0% {
                transform: scale(1);
                opacity: 0.75;
            }
            100% {
                transform: scale(1.2);
                opacity: 0;
            }
        }
    }
}
</style>
