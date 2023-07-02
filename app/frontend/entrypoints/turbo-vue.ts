import { getVueComponents } from "@/helpers/routes";
import { createApp } from "vue";

let components = [];

const mountApp = async (e) => {
  const vueComponentsForPage = getVueComponents(window.location.pathname);
  let app;

  if (vueComponentsForPage === undefined) {
    return;
  }

  for (const [rootContainer, component] of vueComponentsForPage) {
    if (e.currentTarget.querySelector(rootContainer) !== null) {
      component().then((c) => {
        app = createApp(c);
        components.push(app);
        app.mount(rootContainer);
      });
    } else {
      console.log("No root container found");
    }
  }
};

document.addEventListener("turbo:load", mountApp);

document.addEventListener("turbo:visit", () => {
  if (components.length > 0) {
    components.forEach((app) => {
      app.unmount();
    });

    components = [];
  }
});
