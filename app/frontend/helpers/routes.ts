const RootApp = async () =>
  (await import("@/entrypoints/views/root/App.vue")).default;
const PandasApp = async () =>
  (await import("@/entrypoints/views/pandas/index/App.vue")).default;

const routes = {
  "/": [["#root-view", RootApp]],
  "/pandas": [["#pandas-view", PandasApp]],
};

export const getVueComponents = (url: string) => routes[url];
