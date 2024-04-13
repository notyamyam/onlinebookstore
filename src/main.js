import "./index.css"; //tailwind css
import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as MdIcons from "oh-vue-icons/icons/md";

const Md = Object.values({ ...MdIcons });
addIcons(...Md);

import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import { store } from "./store/index";

createApp(App)
  .use(router)
  .use(store)
  .component("v-icon", OhVueIcon)
  .mount("#app");
