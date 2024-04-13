<template>
  <div class="book-list">
    <div class="flex flex-col">
      
      <div><h2 class="text-2xl font-semibold">Books</h2></div>
      <div class="mt-4">
        <input
          v-model="searchInput"
          type="text"
          name="search"
          id="search"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring focus:ring-blue-500 block w-60 p-2.5"
          placeholder="Search Book"
          required=""
        />
      </div>
    </div>
    <div class="mt-6 flex flex-wrap">
      <div
        v-for="book in filteredBooks"
        :key="book.id"
        class="flex flex-col w-60 mr-4 mb-4"
      >
        <img :src="book.image" class="w-60 h-60 object-cover rounded-lg" />

        <div class="flex flex-col w-60">
          <div>
            <h1 class="font-medium">{{ book.title }}</h1>
          </div>
          <div>
            <h1 class="text-xl">${{ book.price }}</h1>
          </div>
        </div>
        <button
          @click="addToCart(book)"
          class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["books"],
  data() {
    return {
      searchInput: "",
    };
  },
  computed: {
    filteredBooks() {
      if (!this.searchInput) {
        return this.books;
      } else {
        const searchTerm = this.searchInput.toLowerCase();
        return this.books.filter((book) =>
          book.title.toLowerCase().includes(searchTerm)
        );
      }
    },
  },
  methods: {
    addToCart(book) {
      this.$store.commit("addToCart", book);
    },
  },
};
</script>
