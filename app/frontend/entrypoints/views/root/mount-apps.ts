import RootApp from "@/entrypoints/views/root/RootApp.vue";
import { mountComponent } from "@/helpers/mount-component";

const mountRootApp = () => {
  const componentDependencies = {
    WelcomeItem: () => import("@/components/WelcomeItem.vue"),
    IconDocumentation: () => import("@/components/icons/IconDocumentation.vue"),
    IconTooling: () => import("@/components/icons/IconTooling.vue"),
    IconEcosystem: () => import("@/components/icons/IconEcosystem.vue"),
    IconCommunity: () => import("@/components/icons/IconCommunity.vue"),
  };

  return mountComponent("#root-view", RootApp, componentDependencies);
};

export { mountRootApp };
