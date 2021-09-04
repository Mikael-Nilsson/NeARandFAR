<template>
  <div>
    <template v-if="this.shared.camActive">
      <p>sceneview</p>
    </template>
    <template v-else>
      <Map />
    </template>
    <Dashboard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { globalState } from "../components/VuexAvoidanceStore";
import Map from "../views/Map.vue";
import Dashboard from "../views/Dashboard.vue";

export default defineComponent({
  name: "Home",
  components: {
    Dashboard,
    Map,
  },
  data: function () {
    return {
      shared: globalState,
    };
  },
});
</script>
