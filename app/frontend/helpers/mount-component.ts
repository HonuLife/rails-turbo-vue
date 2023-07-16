import type { AsyncComponentLoader, Component } from "vue";
import { createApp, type App, defineAsyncComponent } from "vue";

export function mountComponent(
  querySelector: string,
  component: Component,
  componentDependencies?: Record<string, AsyncComponentLoader<Component>>
) {
  const rootContainer = document.querySelector(querySelector) as HTMLElement;
  let app: App | undefined;

  if (rootContainer !== null) {
    const props = rootContainer.dataset.props;
    app = createApp(component, props ? JSON.parse(props) : undefined);

    if (componentDependencies !== undefined) {
      globallyRegisterComponentsOnApp(app, componentDependencies);
    }

    app.mount(rootContainer);
    localStorage.removeItem("dynamic import failed count");
  } else {
    console.error("No container found for Vue component: ", querySelector);
  }

  return app;
}

function globallyRegisterComponentsOnApp(
  app: App,
  components: Record<string, AsyncComponentLoader<Component>>
) {
  for (const [name, asyncComponentLoader] of Object.entries(components)) {
    app.component(name, defineAsyncComponent(asyncComponentLoader));
  }
}
