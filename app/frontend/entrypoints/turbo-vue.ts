import { getVueApps } from "@/helpers/route-helper";
import { createApp } from "vue";

let apps = [];

const mountApp = async (e) => {
  const vueAppsForPage = getVueApps(window.location.pathname);
  let app;

  if (vueAppsForPage === undefined) {
    return;
  }

  for (const [rootContainer, component] of vueAppsForPage) {
    if (e.currentTarget.querySelector(rootContainer) !== null) {
      component().then((c) => {
        app = createApp(c);
        apps.push(app);
        app.mount(rootContainer);
      });
    } else {
      console.log("No root container found");
    }
  }

};

document.addEventListener("turbo:load", mountApp);

document.addEventListener("turbo:visit", () => {
  if (apps.length > 0) {
    apps.forEach((app) => {
      app.unmount();
    });

    apps = [];
  }
});
