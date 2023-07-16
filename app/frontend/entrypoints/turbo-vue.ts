import { getVueComponents } from "@/helpers/routes";
import { createApp, defineAsyncComponent, type App, type Component } from "vue";

let mountedApps: App[] = [];

const components = import.meta.glob<boolean, string, Component>(
  "@/components/**/*.vue"
);

const mountVueComponents = async (e: Event) => {
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
        const rootContainer = entry.target as HTMLElement;
        const component = vueComponentsForPage.find(
          (c) => c[0] === `#${rootContainer.id}`
        );

        if (component !== undefined) {
          component[1]()
            .then((c: Component) => {
              console.debug(c);
              props = rootContainer.dataset.props;
              app = createApp(c, props ? JSON.parse(props) : undefined);
              registerComponents(app);
              mountedApps.push(app);
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

// Mount Vue components when Turbo has finished loading a view.
// Find details about the turbo:load event here: https://turbo.hotwired.dev/reference/events
document.addEventListener("turbo:load", mountVueComponents);

// Unmount Vue components when there is a requested navigation to a new page.
// Find details about the turbo:visit event here: https://turbo.hotwired.dev/reference/events
document.addEventListener("turbo:visit", () => {
  if (mountedApps.length > 0) {
    mountedApps.forEach((app) => {
      app.unmount();
    });

    mountedApps = [];
  }
});

function clearInitialPropsFromDOM(element: HTMLElement) {
  element.removeAttribute("data-props");
}

function registerComponents(app: App) {
  // INFO: I have concerns about this approach. It seems like it could lead to
  //      slow performance since we have to loop over and register all Vue components.
  //      as the number of Vue components used in the app grows, this could take quite a while.
  //      since this is happening dynamically on every page load, it could lead to a poor user experience.
  //      Also not every app requires all components to be available globally on it.
  //      This is something that should be revisited in the future.
  //      One alternative would be to have each app declare its dependencies, however, that
  //      Feels like it would be a lot of work to maintain for developers.
  // Make all components available globally on the app so that imports are not necessary
  // in the script tag of components.
  // https://vuejs.org/guide/components/registration.html#global-registration
  // This avoids the need to handle dynamic imports in the script tag of components.
  for (const [path, asyncComponentLoader] of Object.entries(components)) {
    const componentName = path.split("/").pop()?.split(".")[0];
    if (componentName !== undefined) {
      app.component(componentName, defineAsyncComponent(asyncComponentLoader));
    }
  }
}

function handleDynamicImportFailure() {
  const savedCount = localStorage.getItem("dynamic import failed count");
  const count = savedCount ? parseInt(savedCount, 10) : 0;

  if (count < 3 && count === 0) {
    localStorage.setItem("dynamic import failed count", `${count + 1}`);
    window.location.reload();
  } else if (count < 3 && count > 0) {
    localStorage.setItem("dynamic import failed count", `${count + 1}`);
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
