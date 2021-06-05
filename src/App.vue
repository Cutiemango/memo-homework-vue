<template>
    <div class="app">
        <h1>Memo Tracker</h1>
        <AddMemo />
        <Memos />
    </div>
</template>

<script>
import Memos from "./components/Memos";
import AddMemo from "./components/AddMemo";

export default {
    name: "App",
    components: {
        Memos,
        AddMemo,
    },
};
</script>

<style>
#app {
    font-family: Montserrat, Helvetica, Arial, sans-serif;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    margin: 0 30%;
}
</style>
