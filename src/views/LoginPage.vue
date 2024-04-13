<template>
  <div class="bg-gray-100">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="font-sans text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            Sign in to your account
          </h1>

          <form
            class="space-y-4 md:space-y-6"
            action="#"
            @submit.prevent="handleLogin"
          >
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white bg-"
                >Your email</label
              >
              <input
                v-model="email"
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring focus:ring-blue-500 block w-full p-2.5"
                placeholder="example@sample.com"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white bg-"
                >Password</label
              >
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring focus:ring-blue-500 block w-full p-2.5"
                placeholder="••••••••"
                required=""
              />
            </div>

            <button
              type="submit"
              class="w-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-blue-500 font-medium rounded-lg px-5 py-2.5 text-center"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/index";

export const mockUsers = [
  {
    email: "John@sample.com",
    password: "John@sample.com",
    name: "John",
  },
  {
    email: "Pedro@example.com",
    password: "Pedro",
    name: "Pedro",
  },
];
export default {
  name: "LoginPage",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    handleLogin() {
      this.$store
        .dispatch("login", { email: this.email, password: this.password })
        .then(() => {
          // Authentication successful, handle redirection or other logic here
          const token = this.generateToken();
          localStorage.setItem("email", JSON.stringify(this.email)); // Store the email
          localStorage.setItem("token", token);

          console.log("Authentication successful");
          this.$router.push("/home/books"); // Redirect to home page
        })
        .catch((error) => {
          // Handle authentication error here
          alert(`${error.message}`);
          // Optionally, display an error message to the user
        });
    },

    findUserByEmail(email) {
      // Simulated function to find user by email
      return store.getters.mockUsers.find((user) => user.email === email);
    },

    generateToken() {
      // Generate a unique token (simulated)
      return Math.random().toString(36).substr(2);
    },
  },
};
</script>
