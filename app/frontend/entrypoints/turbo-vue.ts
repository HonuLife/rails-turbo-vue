import { getVueComponents } from "@/helpers/routes";
import type { App } from "vue";

let mountedApps: Array<App | undefined> = [];

const mountVueComponents = async (e: Event) => {
  const vueAppsForPage = getVueComponents(window.location.pathname);
  let nodeToMountOn: HTMLElement;

  if (vueAppsForPage === undefined) {
    return;
  }

  const mountNewIntersectingVueComponents = (
    entries: IntersectionObserverEntry[]
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const rootContainer = entry.target as HTMLElement;
        const asyncAppLoader = vueAppsForPage[`#${rootContainer.id}`];

        if (asyncAppLoader !== undefined) {
          asyncAppLoader()
            .then(async (mountApp) => {
              mountedApps.push(await mountApp());
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

  for (const elementIdSelector in vueAppsForPage) {
    nodeToMountOn = (e.currentTarget as Document)?.querySelector(
      elementIdSelector
    ) as HTMLElement;

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
      app?.unmount();
    });

    mountedApps = [];
  }
});

function clearInitialPropsFromDOM(element: HTMLElement) {
  element.removeAttribute("data-props");
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
