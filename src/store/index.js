import { createStore } from "vuex";
import memo from "./modules/memo";

const store = createStore({
    modules: {
        memo
    }
});

// Create store
export default store;
