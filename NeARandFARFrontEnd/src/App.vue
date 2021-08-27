<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  <Home />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Home from "./views/Home.vue";
// import HelloWorld from "./components/HelloWorld.vue";

@Options({
  components: {
    // HelloWorld,
    Home,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
