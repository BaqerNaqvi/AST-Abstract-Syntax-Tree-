import * as functions from "./functions";

export class Evaluator {
  async evaluate(expression) {
    const { type = "", name = "", parameters = [], value } = expression;

    if (functions.equals(type, "literal")) {
      return value;
    }

    // Evaluate the function arguments asynchronously
    const args = await Promise.all(
      parameters.map((param) => this.evaluate(param))
    );

    switch (name) {
      case "add":
        return functions.add(...args);

      case "equals":
        return functions.equals(...args);

      case "not":
        return functions.not(...args);

      case "fetchGet":
        return functions.fetchGet(...args);

      case "contains":
        return functions.contains(...args);

      default:
        throw new Error("Unknown function");
    }
  }
}
