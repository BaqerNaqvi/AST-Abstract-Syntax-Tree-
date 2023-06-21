import { remoteUrl } from "../src/Constants";
import { Evaluator } from "../src/evaluator";

let evaluator;

describe("Evaluator", () => {
  beforeEach(() => {
    evaluator = new Evaluator();
  });

  it("evaluates a literal expression", async () => {
    const result = await evaluator.evaluate({ type: "literal", value: "true" });
    expect(result).toBe("true");
  });

  it("evaluates a function expression - add - close", async () => {
    const result = await evaluator.evaluate({
      type: "function",
      name: "add",
      parameters: [
        { type: "literal", value: 0.3 },
        { type: "literal", value: 0.6 },
      ],
    });
    expect(result).toBeCloseTo(0.9);
  });

  it("evaluates a function expression - add - equal", async () => {
    const result = await evaluator.evaluate({
      type: "function",
      name: "add",
      parameters: [
        { type: "literal", value: 0 },
        { type: "literal", value: 1 },
        { type: "literal", value: 5 },
      ],
    });
    expect(result).toEqual(6);
  });

  it("throws an error for an invalid expression", async () => {
    await expect(() =>
      evaluator.evaluate({ type: "", name: "" })
    ).rejects.toThrow();
  });

  it("throws an error for an invalid function expression", async () => {
    await expect(() =>
      evaluator.evaluate({
        type: "function",
        name: "toString",
        parameters: [],
      })
    ).rejects.toThrow();
  });

  it("evaluates contains with url", async () => {
    const result = await evaluator.evaluate({
      type: "function",
      name: "contains",
      parameters: [
        {
          type: "function",
          name: "fetchGet",
          parameters: [
            {
              type: "literal",
              value: remoteUrl,
            },
          ],
        },
        {
          type: "literal",
          value: "how",
        },
      ],
    });

    expect(result).toBe(true);
  });

  it("evaluates contains", async () => {
    const result = await evaluator.evaluate({
      type: "function",
      name: "contains",
      parameters: [
        { type: "literal", value: "hello" },
        { type: "literal", value: "ell" },
      ],
    });

    expect(result).toBe(true);
  });

  afterAll(() => {
    evaluator = null;
  });
});
