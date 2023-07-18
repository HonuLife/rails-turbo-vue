import PandasInfo from "@/entrypoints/views/pandas/index/PandaInfo.vue";
import { mountComponent } from "@/helpers/mount-component";

const mountPandasInfo = () => mountComponent("#pandas-view", PandasInfo);
const mountZap = () =>
  mountComponent(
    "#lazy-load",
    () => import("@/entrypoints/views/pandas/index/Zap.vue")
  );

export { mountPandasInfo, mountZap };
