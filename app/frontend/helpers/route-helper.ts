const routes = {
  "/": "#root-view",
  "/pandas": "#pandas-view",
};

export const getVueMountPoint = (url: string) => routes[url];
