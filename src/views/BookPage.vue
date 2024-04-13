<template>
  <div>
    <BookList :books="books" v-if="isAuthenticated" />
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";
export default {
  name: "BookPage",

  components: {
    BookList,
  },

  data() {
    return {
      books: [],
    };
  },

  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },

  created() {
    this.$store.dispatch("fetchBooks").then(() => {
      this.books = this.$store.getters.availableBooks;
    });
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
