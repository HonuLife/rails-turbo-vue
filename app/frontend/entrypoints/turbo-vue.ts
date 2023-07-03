import { getVueComponents } from "@/helpers/routes";
import { createApp, type App, type Component } from "vue";

let components: App[] = [];

const mountApp = async (e: Event) => {
  const vueComponentsForPage = getVueComponents(window.location.pathname);
  const pageHasVueComponents = vueComponentsForPage.length > 0;
  let app: App;
  let nodeToMountOn: HTMLElement;
  let props = {};

  if (!pageHasVueComponents) {
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
          localStorage.removeItem("dynamic import failed count");
        })
        .catch((error: Error) => {
          if (
            error instanceof TypeError &&
            error.message.includes("dynamically imported module")
          ) {
            handleDynamicImportFailure();
          } else {
            console.error(error);
          }
        })
        .finally(() => {
          clearInitialPropsFromDOM(nodeToMountOn);
        });
    } else {
      console.error("No container found for Vue component");
    }
  }
};

// turbo:load fires once after the initial page load, and again after every Turbo visit.
// Access visit timing metrics with the event.detail.timing object.
// Source: https://turbo.hotwired.dev/reference/events
document.addEventListener("turbo:load", mountApp);

// turbo:visit fires immediately after a visit starts.
// Access the requested location with event.detail.url and action with event.detail.action
// Source: https://turbo.hotwired.dev/reference/events
document.addEventListener("turbo:visit", () => {
  if (components.length > 0) {
    components.forEach((app) => {
      app.unmount();
    });

    components = [];
  }
});

function clearInitialPropsFromDOM(element: HTMLElement) {
  // Remove the data-props attribute from the DOM element so that it doesn't
  // show up in the DOM anymore since it is not longer useful.
  element.removeAttribute("data-props");
}

function handleDynamicImportFailure() {
  const savedCount = localStorage.getItem("dynamic import failed count");
  const count = savedCount ? parseInt(savedCount, 10) : 0;

  if (count < 3 && count === 0) {
    localStorage.setItem("dynamic import failed count", count + 1);
    window.location.reload();
  } else if (count < 3 && count > 0) {
    localStorage.setItem("dynamic import failed count", count + 1);
    setTimeout(() => window.location.reload(), 500);
  } else {
    console.error(`Dynamic import failed 3 times on ${window.location.href}. Redirecting home.`);
    localStorage.removeItem("dynamic import failed count");

    if (typeof Turbo !== "undefined") {
      Turbo.cache.clear();
      Turbo.visit(window.location.origin);
    } else {
      window.location.href = window.location.origin;
    }
  }
}
