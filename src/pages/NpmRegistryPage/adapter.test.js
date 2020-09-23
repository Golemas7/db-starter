import { adaptNpmRegistryPackage } from "./adapter";

describe("npm registry adapter", () => {
  test("should return adapted response data", () => {
    const response = {
      homepage: "homepage",
      name: "name",
      description: "description",
      keywords: ["key", "words"],
      time: {
        created: "2020-05-20",
      },
    };

    const adaptedResult = {
      homepage: "homepage",
      name: "name",
      description: "description",
      keywords: ["key", "words"],
      creationTime: "2020-05-20",
    };

    expect(adaptNpmRegistryPackage(response)).toStrictEqual(adaptedResult);
  });

  test("creation time should be undefined", () => {
    const response = {
      homepage: "homepage",
      name: "name",
      description: "description",
      keywords: ["key", "words"],
    };

    expect(adaptNpmRegistryPackage(response).creationTime).toBeUndefined();
  });
});
