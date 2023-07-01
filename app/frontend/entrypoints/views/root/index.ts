import { mountComponentOnTurboLoad } from "@/helpers/mount-component-on-turbo-load";
import App from "@/entrypoints/views/root/App.vue";

mountComponentOnTurboLoad(App, "#root-view");
