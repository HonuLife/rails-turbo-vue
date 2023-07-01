import { createApp, type Component } from "vue";
import TurbolinksAdapter from "vue-turbolinks";
import { getVueMountPoint } from "@/helpers/route-helper";

function mountComponentOnTurboLoad(
  component: Component,
  rootContainer: string,
) {
  let app;
  rootContainer = getVueMountPoint(window.location.pathname);

  const mountApp = (e) => {
    if (e.currentTarget.querySelector(rootContainer) !== null) {
      app = createApp(component);
      app.use(TurbolinksAdapter).mount(rootContainer);
    } else {
      console.log("No root container found");
    }
  };

  document.addEventListener("turbo:load", mountApp);

  document.addEventListener("turbo:before-cache", () => {
    app?.unmount();
  });

  // document.addEventListener("turbo:frame-render", () => {
  //   console.debug("root container", rootContainer);
  //   createApp(component).use(TurbolinksAdapter).mount(rootContainer);
  // });
}

export { mountComponentOnTurboLoad };
