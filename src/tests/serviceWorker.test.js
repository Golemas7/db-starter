import {
  register,
  // checkValidServiceWorker,
  registerValidSW,
} from "serviceWorker";
// import * as serviceWorker from "serviceWorker";

const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules(); // this is important - it clears the cache
  jest.clearAllMocks();
  process.env = { ...OLD_ENV };
  delete process.env.NODE_ENV;
});

afterEach(() => {
  process.env = OLD_ENV;
});

describe("ServiceWorker", () => {
  test("It should add event listener for load", () => {
    global.addEventListener = jest.fn();

    process.env.NODE_ENV = "production";
    process.env.PUBLIC_URL = window.location.origin;

    global.navigator.serviceWorker = jest
      .fn()
      .mockImplementationOnce(() => ({}));

    const config = {};

    register(config);

    expect(global.addEventListener).toHaveBeenCalled();

    global.addEventListener.mockReset();
  });

  test("It should call navigator.serviceWorker.register", async () => {
    const p = Promise.resolve();
    const responseObject = () => ({
      installing: null,
    });

    Object.defineProperty(global.navigator, "serviceWorker", {
      value: {
        register: jest.fn().mockImplementation(() => p.then(responseObject)),
      },
    });

    const serviceWorkerUrl = "http://testUrl";
    const config = {};

    await registerValidSW(serviceWorkerUrl, config);

    expect(global.navigator.serviceWorker.register).toHaveBeenCalledWith(
      serviceWorkerUrl
    );
  });

  test("It should not add event listener for load if public url origin does not equal window location origin", () => {
    global.addEventListener = jest.fn();
    global.window = Object.create(window);
    const url = "http://test.com";
    Object.defineProperty(window, "location", {
      value: {
        origin: "Test origin",
        href: url,
      },
    });

    process.env.NODE_ENV = "production";

    process.env.PUBLIC_URL = "";

    global.navigator.serviceWorker = jest
      .fn()
      .mockImplementationOnce(() => ({}));

    const config = {};

    register(config);

    expect(global.addEventListener).not.toHaveBeenCalled();
  });
});
