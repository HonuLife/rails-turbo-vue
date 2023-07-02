import { getVueComponents } from "@/helpers/routes";
import { createApp, type App, type Component } from "vue";

let components: App[] = [];

const mountApp = async (e: Event) => {
  const vueComponentsForPage = getVueComponents(window.location.pathname);
  let app;

  if (vueComponentsForPage === undefined) {
    return;
  }

  for (const [rootContainer, component] of vueComponentsForPage) {
    if ((e.currentTarget as Document)?.querySelector(rootContainer) !== null) {
      component().then((c: Component) => {
        app = createApp(c);
        components.push(app);
        app.mount(rootContainer);
      });
    } else {
      console.error("No container found for Vue component");
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
