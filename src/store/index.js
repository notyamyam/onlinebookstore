import { createStore } from "vuex";

export const store = createStore({
  state: {
    books: [],
    cart: [],
    isAuthenticated: false,
    user: null,
  },

  mutations: {
    addToCart(state, book) {
      state.cart.push(book);
    },
    removeFromCart(state, index) {
      state.cart.splice(index, 1);
    },
    updateAuthenticationStatus(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setUser(state, user) {
      state.user = user;
    },
    addMockBooks(state, books) {
      state.books = books;
    },
    emptyCart(state) {
      state.cart = [];
    },
  },

  actions: {
    // Actions to perform asynchronous operations
    async purchase({ commit }) {
      // Simulating purchase transaction
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("emptyCart");
          resolve(); // Resolve the promise after the transaction
        }, 1000);
      });
    },

    async login({ commit, getters }, { email, password }) {
      // Simulating user authentication
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const user = getters.mockUsers.find(user => user.email === email && user.password === password);
          if (user) {
            commit("updateAuthenticationStatus", true);
            commit("setUser", user);
            resolve();
          } else {
            reject(new Error("Invalid email or password"));
          }
        }, 500);
      });
    },

    logout({ commit }) {
      // Simulating user logout
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("updateAuthenticationStatus", false);
          commit("setUser", null); // Clear user data
          resolve();
        }, 500);
      });
    },

    async fetchBooks({ commit }) {
      // Mock data for 10 books
      const mockBooks = [
        {
          id: 1,
          title: "Book 1",
          price: 10,
          image: "https://covers.openlibrary.org/b/id/0000000003.jpg",
        },
        {
          id: 2,
          title: "Book 2",
          price: 15,
          image: "https://covers.openlibrary.org/b/id/0000000001.jpg",
        },
        {
          id: 3,
          title: "Book 3",
          price: 20,
          image: "https://covers.openlibrary.org/b/id/0000000004.jpg",
        },
        {
          id: 4,
          title: "Book 4",
          price: 25,
          image: "https://covers.openlibrary.org/b/id/0000000006.jpg",
        },
        {
          id: 5,
          title: "Book 5",
          price: 30,
          image: "https://covers.openlibrary.org/b/id/0000000007.jpg",
        },
        {
          id: 6,
          title: "Book 6",
          price: 35,
          image: "https://covers.openlibrary.org/b/id/0000000008.jpg",
        },
        {
          id: 7,
          title: "Book 7",
          price: 40,
          image: "https://covers.openlibrary.org/b/id/0000000134.jpg",
        },
        {
          id: 8,
          title: "Book 8",
          price: 45,
          image: "https://covers.openlibrary.org/b/id/0000000009.jpg",
        },
        {
          id: 9,
          title: "Book 9",
          price: 50,
          image: "https://covers.openlibrary.org/b/id/0000000010.jpg",
        },
        {
          id: 10,
          title: "Book 10",
          price: 55,
          image: "https://covers.openlibrary.org/b/id/0000000050.jpg",
        },
      ];
      commit("addMockBooks", mockBooks);
    },
  },

  getters: {
    // Getters to retrieve data from the state
    availableBooks: (state) => state.books,
    cartItems: (state) => state.cart,
    totalPrice: (state) => {
      return state.cart.reduce((total, book) => total + book.price, 0);
    },
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.user,
    mockUsers: () => [
      {
        email: "John@sample.com",
        password: "John@sample.com",
        name: "John",
      },
      {
        email: "Pedro@example.com",
        password: "Pedro@example.com",
        name: "Pedro",
      },
    ],
  },
});

export default store;
