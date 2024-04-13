<template>
  <div class="grid h-screen place-content-center bg-white px-4">
    <h1 class="uppercase tracking-widest text-gray-500">404 | Not Found</h1>

    <button
      class="p-2 bg-blue-500 text-white mt-2 rounded-lg hover:bg-blue-600"
      @click="handleBack"
    >
      Go back
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    handleBack() {
      // Check if user is authenticated
      if (localStorage.getItem("token")) {
        // If authenticated, navigate back to dashboard
        this.$router.push({ name: "dashboard" });
      } else {
        // If not authenticated, navigate back to login
        this.$router.push({ name: "login" });
      }
    },
  },
};
</script>
