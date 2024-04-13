<template>
  <div>
    <div class="flex flex-col">
      <div><CartList v-if="isAuthenticated" /></div>
    </div>
  </div>
</template>

<script>
import CartList from "@/components/CartList.vue";
export default {
  name: "CartPage",
  components: { CartList },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
};
</script>
