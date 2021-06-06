<template>
    <div class="memo_wrapper">
        <div class="memo_display">
            <div class="memo_header">
                <h4>
                    {{ memo.user }} 登記於 {{ memo.date.toLocaleString("en-US", { hour12: true }) }}
                </h4>
            </div>
            <div class="memo_title">
                <h3>{{ memo.title || "(Empty Title)" }}</h3>
            </div>
            <div class="memo_content">
                <p v-if="!isEditing">{{ content }}</p>
                <div v-else class="memo_textarea">
                    <textarea id="textarea" v-model="content" @input="handleInput"></textarea>
                </div>
            </div>
        </div>
        <div class="memo_actions">
            <div v-if="!isEditing">
                <button @click="onDeleteClick" class="btn" id="remove_btn">
                    <i className="fas fa-times"></i>
                </button>
                <button @click="onEditClick" class="btn">
                    <i className="fas fa-edit"></i>
                </button>
            </div>
            <div v-else>
                <button @click="onFinishClick" class="btn" id="finish_btn">
                    <i className="fas fa-check"></i>
                </button>
                <button @click="onCancelClick" class="btn">
                    <i className="fas fa-undo"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "Memo",
    props: {
        memo: Object,
    },
    methods: {
        ...mapActions(["deleteMemo", "postMemo"]),
        handleInput(e) {
            this.resizeElement(e.target);
        },
        resizeElement(element) {
            if (element) {
                element.style.height = "auto";
                element.style.height = element.scrollHeight + "px";
            }
        },
        async onDeleteClick(e) {
            e.preventDefault();
            await this.deleteMemo(this.memo.id);
            this.$emit("refresh-memo"); // emit to parent component
        },
        onEditClick(e) {
            e.preventDefault();
            this.isEditing = true;
        },
        async onFinishClick(e) {
            e.preventDefault();
            this.isEditing = false;
            await this.postMemo({ ...this.memo, content: this.content });
            this.$emit("refresh-memo");
        },
        onCancelClick(e) {
            e.preventDefault();
            this.content = this.memo.content;
            this.isEditing = false;
        },
    },
    data() {
        return {
            isEditing: false,
            content: "",
        };
    },
    created() {
        this.content = this.memo.content;
    },
};
</script>

<style scoped lang="scss">
.memo_wrapper {
    display: flex;
    padding: 5px 0;
}

.memo_display {
    background: rgb(193, 193, 193);
    border-radius: 6px;
    width: 100%;
    h3,
    h4 {
        margin: 1em 0 1em 2%;
    }

    .memo_content {
        padding: 2% 2%;
        p {
            margin: 0;
            display: inline-block;
            word-break: break-all;
        }

        .memo_textarea {
            width: 100%;
            height: 100%;
            textarea {
                padding: 6px;
                width: 100%;
                min-height: 100px;
                border-radius: 6px;
                border: 2px solid rgb(70, 70, 70);
                outline: none;
                font-size: 16px;
                resize: none;
                background: white;
                box-sizing: border-box;
                font-family: inherit;
            }
        }
    }
}

.memo_actions {
    #remove_btn {
        color: #b60e0e;
    }

    #finish_btn {
        color: #1ba832;
    }

    div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        min-width: 5%;
    }

    .btn {
        text-align: center;
        min-width: 24px;
        margin: 3px 10px;
        padding: 2px;
        font-size: 14px;
    }
}
</style>
