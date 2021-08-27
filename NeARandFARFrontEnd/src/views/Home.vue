<template>
  <div>
    <Dashboard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dashboard from "../views/Dashboard.vue";

export default defineComponent({
  name: "Home",
  components: {
    Dashboard,
  },
  data: function () {
    return {
      // shared: globalState
    };
  },
});
</script>
