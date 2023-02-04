import { helloWorld } from ".";

afterEach((): void => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe("this is a test", (): void => {
  it("does stuff to test", (): void => {
    expect.assertions(1);

    const consoleLogSpy = jest.spyOn(console, "log");

    helloWorld();

    expect(consoleLogSpy).toHaveBeenCalledWith("Hello World!");
  });
});
