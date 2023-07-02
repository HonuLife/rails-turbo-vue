const RootApp = async () =>
  (await import("@/entrypoints/views/root/App.vue")).default;

const routes = {
  "/": [["#root-view", RootApp]],
};

export const getVueComponents = (url: string) => routes[url];
