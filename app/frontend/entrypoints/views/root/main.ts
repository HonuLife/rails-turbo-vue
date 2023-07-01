import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/entrypoints/views/root/App.vue";

const app = createApp(App);

app.use(createPinia());

app.mount("#app");
