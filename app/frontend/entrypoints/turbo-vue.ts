import { getVueComponents } from "@/helpers/routes";
import { createApp, type App, type Component } from "vue";

let components: App[] = [];

const mountApp = async (e: Event) => {
  const vueComponentsForPage = getVueComponents(window.location.pathname);
  let app;
  let nodeToMountOn;
  let props = {};

  if (vueComponentsForPage === undefined) {
    return;
  }

  for (const [rootContainer, component] of vueComponentsForPage) {
    nodeToMountOn = (e.currentTarget as Document)?.querySelector(rootContainer);

    if (nodeToMountOn !== null) {
      component()
        .then((c: Component) => {
          props = nodeToMountOn.dataset.props;
          app = createApp(c, props ? JSON.parse(props) : undefined);
          components.push(app);
          app.mount(rootContainer);
        })
        .finally(() => {
          clearInitialPropsFromDOM(nodeToMountOn);
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

function clearInitialPropsFromDOM(element: HTMLElement) {
  element.removeAttribute("data-props");
}
