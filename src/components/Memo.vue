<template>
    <div class="memo_wrapper">
        <div class="memo_content">
            <div class="memo_header">
                <h4>
                    {{ memo.user }} 登記於 {{ memo.date.toLocaleString("en-US", { hour12: true }) }}
                </h4>
            </div>
            <div class="memo_title">
                <h3>{{ memo.title || "(Empty Title)" }}</h3>
            </div>
            <div class="memo_content">
                <p>{{ memo.content }}</p>
            </div>
        </div>
        <div class="memo_actions">
            <button @click="onDeleteClick" class="btn">
                <i className="fas fa-times-circle"></i>
            </button>
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
        ...mapActions(["deleteMemo"]),
        async onDeleteClick(e) {
            e.preventDefault();
            await this.deleteMemo(this.memo.id);
            this.$emit("refresh-memo"); // emit to parent component
        },
    },
};
</script>

<style scoped lang="scss">
.memo_wrapper {
    display: flex;
    padding: 5px 0;
}

.memo_content {
    background: rgb(196, 193, 193);
    border-radius: 6px;
    width: 95%;

    h3,
    h4,
    p {
        margin-block-start: 0.5em;
        margin-inline-start: 0.5em;
    }
}

.memo_actions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 5%;

    .btn {
        text-align: center;
        min-width: 24px;
        margin: 3px 0 3px 10px;
        padding: 2px;
        font-size: 14px;
    }
}
</style>
