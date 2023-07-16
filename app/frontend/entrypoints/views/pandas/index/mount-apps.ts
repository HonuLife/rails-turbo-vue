import PandaInfo from "@/entrypoints/views/pandas/index/PandaInfo.vue";
import Zap from "@/entrypoints/views/pandas/index/Zap.vue";
import { mountComponent } from "@/helpers/mount-component";

const mountPandasInfo = () => mountComponent("#pandas-view", PandaInfo);
const mountZap = () => mountComponent("#lazy-load", Zap);

export { mountPandasInfo, mountZap };
