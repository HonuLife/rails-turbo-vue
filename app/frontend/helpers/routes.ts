const RootApp = async () =>
  (await import("@/entrypoints/views/root/App.vue")).default;
const PandasApp = async () =>
  (await import("@/entrypoints/views/pandas/index/App.vue")).default;

const routes = {
  "/": [["#root-view", RootApp]],
  "/pandas": [["#pandas-view", PandasApp]],
};

export const getVueComponents = (url: string) => {
  const pattern = /^\/((?:[^\/]+\/)*[^\/]+)\/\d+(\/\w+)?$/;
  const result = url.match(pattern);

  if (result !== null) {
    url = result[2] ? `/${result[1]}/:id${result[2]}` : `/${result[1]}/:id`;
  }

  return routes[url];
};
