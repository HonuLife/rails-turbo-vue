import {
  createApp,
  defineAsyncComponent,
  type App,
  type AsyncComponentLoader,
  type Component,
} from "vue";

export async function mountComponent(
  querySelector: string,
  component: AsyncComponentLoader | Component
) {
  const rootContainer = document.querySelector(querySelector) as HTMLElement;
  let app: App | undefined;

  if (rootContainer !== null) {
    const props = rootContainer.dataset.props;

    if (typeof component === "function") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - this is an AsyncComponentLoader, not a Component in this case
      component = defineAsyncComponent(component);
    }

    app = createApp(component, props ? JSON.parse(props) : undefined);

    app.mount(rootContainer);
    localStorage.removeItem("dynamic import failed count");
  } else {
    console.error("No container found for Vue component: ", querySelector);
  }

  return app;
}
