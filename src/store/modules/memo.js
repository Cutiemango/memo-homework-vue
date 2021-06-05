import axios from "axios";

const API_URL = "https://ncufresh-cloudrun-p2qvm7cmaq-uc.a.run.app";
const state = {
    memos: [],
};

// a bunch of getters
const getters = {
    getMemos: (state) => (user) => {
        if (!user) return state.memos;
        return state.memos.filter((memo) => memo.user === user);
    },
};

// general actions
const actions = {
    async fetchMemos({ commit }) {
        const response = await axios.get(API_URL);
        let memos = response.data.map((memo) => {
            return {
                ...memo,
                date: new Date(memo.date),
            };
        });
        memos.sort((a, b) => b.date - a.date);

        commit("setMemos", memos);
    },
    async addMemo({ commit }, { user, ...data }) {
        const response = await axios.post(`${API_URL}/users/${user}`, data);

        if (response.status == 200) {
            const { id, user, title, content, date } = response.data;
            commit("newMemo", { id, user, title, content, date: new Date(date) });
        }
    },
    async deleteMemo({ commit }, id) {
        const response = await axios.delete(`${API_URL}/memoID/${id}`);

        if (response.status == 200) commit("removeMemo", id);
    },
};

// a bunch of setters
const mutations = {
    setMemos: (state, memos) => (state.memos = memos),
    newMemo: (state, memo) => state.memos.unshift(memo),
    removeMemo: (state, id) => (state.memos = state.memos.filter((memo) => memo.id !== id)),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
