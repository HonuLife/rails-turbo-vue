import RootApp from "@/entrypoints/views/root/RootApp.vue";
import { mountComponent } from "@/helpers/mount-component";

const mountRootApp = () => {
  return mountComponent("#root-view", RootApp);
};

export { mountRootApp };
