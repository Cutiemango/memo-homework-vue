<template>
    <div>
        <h3>Filter & Options</h3>
        <div class="filter">
            <input type="text" v-model="filteredUser" placeholder="Filter user" />
            <button class="btn" @click="onClick">
                Sort by {{ sortByLatest ? "oldest" : "latest" }}
            </button>
        </div>
        <h3>All Memos</h3>
        <div v-for="memo in memoView" :key="memo.id">
            <div class="bar"></div>
            <Memo @refresh-memo="refreshMemo" :memo="memo" />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Memo from "./Memo.vue";

export default {
    name: "Memos",
    methods: {
        ...mapActions(["fetchMemos"]),
        refreshMemo() {
            // sync memo view with memo storage
            this.memoView = this.getFilteredMemos;
        },
        onClick(e) {
            e.preventDefault();
            this.sortByLatest = !this.sortByLatest;
            this.memoView.sort((a, b) => (this.sortByLatest ? b.date - a.date : a.date - b.date));
        },
    },
    components: {
        Memo,
    },
    computed: {
        ...mapGetters(["getMemos"]),
        getFilteredMemos() {
            return this.getMemos(this.filteredUser);
        },
    },
    watch: {
        filteredUser: function() {
            // no arrow function here: it will break 'this' scope
            this.refreshMemo();
        },
    },
    data() {
        return {
            filteredUser: "",
            memoView: [],
            sortByLatest: true,
        };
    },
    async created() {
        await this.fetchMemos();
        this.refreshMemo();
    },
};
</script>

<style scoped>
.bar {
    width: 100%;
    height: 2px;
    margin: 5px 0;
    background: rgb(70, 70, 70);
}

.btn {
    font-family: inherit;
}
</style>
