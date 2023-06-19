//const mockFetchGet = jest.fn();

import { Evaluator } from "../src/evaluator";
import { fetchGet } from "../src/functions";

let evaluator;

// jest.doMock("../src/functions.js", () => ({
//   fetchGet: mockFetchGet,
// }));

describe("Evaluator", () => {
  it("evaluates a literal expression", function () {
    var r = evaluator.evaluate({ type: "literal", value: "true" });
    expect(r).toBe("true");
  });

  it("evaluates a function expression", () => {
    expect(
      evaluator.evaluate({
        type: "function",
        name: "add",
        parameters: [
          { type: "literal", value: 0.3 },
          { type: "literal", value: 0.6 },
        ],
      })
    ).toBeCloseTo(0.9);
  });

  it("evaluates a function expression", () => {
    expect(
      evaluator.evaluate({
        type: "function",
        name: "add",
        parameters: [
          { type: "literal", value: 0 },
          { type: "literal", value: 1 },
          { type: "literal", value: 5 },
        ],
      })
    ).toEqual(6);
  });

  it("throws an error for an invalid expression", () => {
    expect(() => evaluator.evaluate({ type: "" })).toThrow();
  });

  it("throws an error for an invalid function expression", () => {
    expect(() =>
      evaluator.evaluate({ type: "function", name: "toString", parameters: [] })
    ).toThrow();
  });

  it("testing fetchGet", async () => {
    const url =
      "https://www.learningcontainer.com/wp-content/uploads/2020/04/sample-text-file.txt";

    // Assuming the expected response data is a JSON string
    const expectedData = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

    // Make the actual request and receive the response
    const responseData = await fetchGet(url);

    // Assert that the received data matches the expected data
    expect(responseData).toEqual(expectedData);
  });

  it("testing contains with url", async () => {
    const actual = await evaluator.evaluate({
      type: "function",
      name: "contains",
      parameters: [
        {
          type: "function",
          name: "fetchGet",
          parameters: [
            {
              type: "literal",
              value:
                "https://www.learningcontainer.com/wp-content/uploads/2020/04/sample-text-file.txt",
            },
          ],
        },
        {
          type: "literal",
          value: "consectetur",
        },
      ],
    });

    expect(actual).toEqual(true);
  });

  afterAll(() => {
    evaluator = null;
  });

  beforeEach(() => {
    evaluator = new Evaluator();
  });
});
