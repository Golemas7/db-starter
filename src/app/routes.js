const routes = {
  home: {
    path: "/",
    getComponent: () => import("pages/HomePage"),
  },
  counter: {
    path: "/counter",
    getComponent: () => import("pages/CounterPage"),
  },
  npmApi: {
    path: "/npm-api",
    getComponent: () => import("pages/NpmRegistryPage"),
  },
  npmApiPackage: {
    path: "/npm-api/:package",
    getComponent: () => import("pages/NpmRegistryPage"),
  },
};

export default routes;
