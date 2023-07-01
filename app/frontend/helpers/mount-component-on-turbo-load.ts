import { createApp, type Component } from "vue";
import TurbolinksAdapter from "vue-turbolinks";

function mountComponentOnTurboLoad(
  component: Component,
  rootContainer = "#vue-app"
) {
  // let app;

  // const mountApp = () => {
  //   app = createApp(component);
  //   app.use(TurbolinksAdapter).mount(rootContainer);
  // };

  // document.addEventListener("turbo:load", mountApp);

  // document.addEventListener("turbo:before-cache", () => {
  //   app?.unmount();
  //   document.removeEventListener("turbo:load", mountApp);
  // });

  // document.addEventListener("turbo:frame-render", () => {
  //   console.debug("root container", rootContainer);
  //   createApp(component).use(TurbolinksAdapter).mount(rootContainer);
  // });
}

export { mountComponentOnTurboLoad };
