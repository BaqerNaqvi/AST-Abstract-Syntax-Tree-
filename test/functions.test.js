import { remoteUrl, remoteUrlContents } from "../src/Constants";
import { fetchGet, contains, equals, add, not } from "../src/functions";

describe("Functions", () => {
  it("fetchGet function should return remoteUrlContents", async () => {
    const responseData = await fetchGet(remoteUrl);
    expect(responseData).toEqual(remoteUrlContents);
  });

  it.each([
    ["This is goat", "goat", true],
    ["This is goat", "lion", false],
  ])("contains function: %s should return %s", (str, substring, expected) => {
    const response = contains(str, substring);
    expect(response).toEqual(expected);
  });

  it.each([
    [5, 5, true],
    [5, "5", false],
  ])(
    "equals function: %s equals %s should return %s",
    (arg1, arg2, expected) => {
      const response = equals(arg1, arg2);
      expect(response).toEqual(expected);
    }
  );

  it.each([[[1, 2, 3], 6]])(
    "add function: %s should return %s",
    (params, expected) => {
      const response = add(...params);
      expect(response).toEqual(expected);
    }
  );

  it.each([
    [true, false],
    ["true", false],
  ])("not function: not %s should return false", (param, expected) => {
    const response = not(param);
    expect(response).toEqual(expected);
  });
});
