const mountRootApp = async () =>
  (await import("@/entrypoints/views/root/mount-apps").mountRootApp);


const routes: {
  [routePath: string]: {
    [elementIdSelector: string]: AsyncAppMounter;
  };
} = {
  "/": {
    "#root-view": mountRootApp,
  },
  // new route entry here
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
