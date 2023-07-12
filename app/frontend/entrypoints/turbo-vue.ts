import { getVueComponents } from "@/helpers/routes";
import { createApp, type App, type Component } from "vue";

let components: App[] = [];

const mountApp = async (e: Event) => {
  const vueComponentsForPage = getVueComponents(window.location.pathname);
  let app: App;
  let nodeToMountOn: HTMLElement;
  let props: string | undefined;

  if (vueComponentsForPage === undefined) {
    return;
  }

  const mountNewIntersectingVueComponents = (
    entries: IntersectionObserverEntry[]
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const rootContainer = entry.target;
        const component = vueComponentsForPage.find(
          (c) => c[0] === `#${rootContainer.id}`
        );

        if (component !== undefined) {
          component[1]()
            .then((c: Component) => {
              console.debug(c);
              props = rootContainer.dataset.props;
              app = createApp(c, props ? JSON.parse(props) : undefined);
              components.push(app);
              app.mount(rootContainer);
              localStorage.removeItem("dynamic import failed count");
            })
            .catch((error: Error) => {
              if (
                error instanceof TypeError &&
                // matches error in Chrome, Firefox, Edge and Opera
                (error.message.includes("dynamically imported module") ||
                  // matches error in Safari
                  error.message.includes("Importing a module script failed"))
              ) {
                handleDynamicImportFailure();
              } else {
                console.error(error);
              }
            })
            .finally(() => {
              observer.unobserve(rootContainer);
              clearInitialPropsFromDOM(rootContainer);
            });
        }
      }
    });
  };

  const observer = new IntersectionObserver(mountNewIntersectingVueComponents, {
    threshold: 0.1,
  });

  for (const [rootContainer] of vueComponentsForPage) {
    nodeToMountOn = (e.currentTarget as Document)?.querySelector(rootContainer);

    if (nodeToMountOn !== null) {
      observer.observe(nodeToMountOn);
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

function handleDynamicImportFailure() {
  const savedCount = localStorage.getItem("dynamic import failed count");
  const count = savedCount ? parseInt(savedCount, 10) : 0;

  if (count < 3 && count === 0) {
    localStorage.setItem("dynamic import failed count", count + 1);
    window.location.reload();
  } else if (count < 3 && count > 0) {
    localStorage.setItem("dynamic import failed count", count + 1);
  } else {
    console.error(
      `Dynamic import failed 3 times on ${window.location.href}. Redirecting home.`
    );
    localStorage.removeItem("dynamic import failed count");

    if (typeof Turbo !== "undefined") {
      Turbo.cache.clear();
      Turbo.visit(window.location.origin);
    } else {
      window.location.href = window.location.origin;
    }
  }
}
