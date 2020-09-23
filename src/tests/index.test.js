import ReactDOM from "react-dom";

import { moduleHotAccept } from "index";

jest.mock("react-dom");

require("index");

const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules(); // this is important - it clears the cache
  process.env = { ...OLD_ENV };
  delete process.env.NODE_ENV;
});

afterEach(() => {
  process.env = OLD_ENV;
});

describe("Index", () => {
  test("Renders the application", () => {
    expect(ReactDOM.render).toHaveBeenCalled();
  });

  test("It should call hot.accept() if hot is defined", () => {
    process.env.NODE_ENV = "development";

    const accept = jest.fn();
    const mockModule = { hot: { accept: accept } };
    moduleHotAccept(mockModule);

    expect(accept).toHaveBeenCalled();
  });

  test("It should not call hot.accept() if env is not dev defined", () => {
    process.env.NODE_ENV = "stg";

    const accept = jest.fn();
    const mockModule = { hot: { accept: accept } };
    moduleHotAccept(mockModule);

    expect(accept).not.toHaveBeenCalled();
  });

  test("It should not call hot.accept() if hot is not defined", () => {
    process.env.NODE_ENV = "development";

    const accept = jest.fn();
    const mockModule = { hot: "" };
    moduleHotAccept(mockModule);

    expect(accept).not.toHaveBeenCalled();
  });

  test("It should not throw if module is undefined", () => {
    const mockModule = undefined;
    moduleHotAccept(mockModule);

    expect(moduleHotAccept).not.toThrow();
  });

  test("should not throw if module.hot is undefined", () => {
    expect(() => moduleHotAccept({ notHot: -273 })).not.toThrow();
  });
});
