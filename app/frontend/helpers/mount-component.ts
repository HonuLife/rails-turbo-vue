import type { Component } from "vue";
import { createApp, type App } from "vue";

export function mountComponent(querySelector: string, component: Component) {
  const rootContainer = document.querySelector(querySelector) as HTMLElement;
  let app: App | undefined;

  if (rootContainer !== null) {
    const props = rootContainer.dataset.props;
    app = createApp(component, props ? JSON.parse(props) : undefined);

    app.mount(rootContainer);
    localStorage.removeItem("dynamic import failed count");
  } else {
    console.error("No container found for Vue component: ", querySelector);
  }

  return app;
}
