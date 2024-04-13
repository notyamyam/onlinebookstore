<template>
  <div
    class="w-full bg-white p-4 flex items-center justify-between border-b border-gray-200"
  >
    <div class="flex items-center">
      <v-icon
        name="md-subject-round"
        fill="#000"
        scale="1.5"
        @click="toggleOpen"
        class="cursor-pointer hover:bg-gray-200 hover:text-white rounded-lg"
        inverse
      />
      <div class="ms-2">
        <div>
          <h1 class="text-2xl font-semibold cursor-default p-2">
            Online Book Store
          </h1>
        </div>

        <div class="ms-2">
          <span
            v-if="isAuthenticated"
            class="text-sm font-medium text-green-500"
            >Authenticated</span
          >
          <span v-else class="text-sm font-medium text-red-500"
            >Not Authenticated</span
          >
        </div>
      </div>
    </div>

    <div>
      <div
        class="cursor-pointer hover:bg-blue-500 hover:text-white p-2 rounded-md"
      >
        <h1 class="text-sm font-medium" @click="handleSignOut">Sign Out</h1>
      </div>
    </div>
  </div>

  <div class="flex">
    <div
      :class="[
        'bg-white h-screen p-5 pt-7 duration-300 relative border-r border-gray-200',
        open ? 'w-72' : 'w-20',
      ]"
    >
      <ul
        class="pt-2"
        v-for="(menu, index) in mappedMenus"
        :key="'menu-' + index"
      >
        <router-link :to="{ name: menu.routeName }">
          <li
            class="text-gray-700 text-lg flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-500 hover:text-white rounded-lg"
          >
            <div>
              <span>
                <v-icon
                  v-if="menu.icon"
                  :name="menu.icon"
                  scale="1.5"
                  class="text-regular block float-left"
                />
                <v-icon
                  v-else
                  name="md-librarybooks-outlined"
                  scale="1.5"
                  class="block float-left"
                />
              </span>
              <div class="flex">
                <span
                  :class="[
                    'ms-4 text-base font-regular flex-1',
                    open
                      ? 'transition-all duration-300 ease-in-out'
                      : 'transition-none', // Apply transition only when open
                    open ? '' : 'opacity-0 translate-y-8', // Hide and move text when closed
                  ]"
                >
                  {{ menu.title }}
                </span>
              </div>
            </div>
          </li></router-link
        >
      </ul>
    </div>
    <div name="main" class="bg-gray-100 p-7 w-full">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import store from "../store/index";

export default {
  name: "HomePage",

  data() {
    return {
      open: true,

      menus: [
        {
          title: "Books",
          icon: "md-librarybooks-outlined",
          routeName: "books",
        },
        { title: "Cart", icon: "md-shoppingcart-outlined", routeName: "cart" },
      ],
    };
  },

  methods: {
    toggleOpen() {
      this.open = !this.open;
    },

    handleSignOut() {
      store.dispatch("logout").then(() => {
        localStorage.clear(); // clear the local storage
        this.$router.push("/login"); // Push the user to the home page
      });
    },

    showNavigationLinks() {
      // Check if the user is authenticated and not on the login page
      return (
        localStorage.getItem("token") !== null &&
        this.$route &&
        this.$route.name !== "login"
      );
    },
  },

  computed: {
    mappedMenus() {
      return this.menus;
    },

    isAuthenticated() {
      return store.getters.isAuthenticated;
    },
  },

  mounted() {
    // Check if user is authenticated
    if (!localStorage.getItem("token")) {
      // If user is not authenticated, redirect to login
      this.$router.push({ name: "login" });
    }
  },
};
</script>
