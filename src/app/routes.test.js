import routes from "./routes";

describe("routes", () => {
  Object.entries(routes).forEach(([key, route]) => {
    test(`${key} has getComponent function that returns a promise`, () => {
      expect(typeof route.getComponent).toBe("function");
      expect(typeof route.getComponent().then).toBe("function");
    });
  });
});
