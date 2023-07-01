import { createApp, type Component } from "vue";
import TurbolinksAdapter from "vue-turbolinks";

function mountComponentOnTurboLoad(
  component: Component,
  rootContainer = "#vue-app"
) {
  document.addEventListener("turbo:load", () => {
    createApp(component).use(TurbolinksAdapter).mount(rootContainer);
  });
}

export { mountComponentOnTurboLoad };
