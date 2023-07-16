import type { AsyncAppMounter } from "@/helpers/mount-component.types";

const mountRootApp = async () =>
  (await import("@/entrypoints/views/root/mount-apps")).mountRootApp;
const mountPandasZap = async () =>
  (await import("@/entrypoints/views/pandas/index/mount-apps")).mountZap;
const mountPandasMain = async () =>
  (await import("@/entrypoints/views/pandas/index/mount-apps")).mountPandasInfo;

const routes: {
  [routePath: string]: {
    [elementIdSelector: string]: AsyncAppMounter;
  };
} = {
  "/": {
    "#root-view": mountRootApp,
  },
  "/pandas": {
    "#pandas-view": mountPandasMain,
    "#lazy-load": mountPandasZap,
  },
};

export const getVueComponents = (
  url: string
): { [elementIdSelector: string]: AsyncAppMounter } => {
  const pattern = /^\/((?:[^\/]+\/)*[^\/]+)\/\d+(\/\w+)?$/;
  const result = url.match(pattern);

  if (result !== null) {
    url = result[2] ? `/${result[1]}/:id${result[2]}` : `/${result[1]}/:id`;
  }

  return routes[url];
};
