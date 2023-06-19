import { add, equals, not, fetchGet, contains } from "./functions";

export class Evaluator {
  evaluate(expression) {
    const { type = "", name = "", parameters = [], value = "" } = expression;

    if (equals(type.toLowerCase(), "literal")) return value;

    switch (name) {
      case "add":
        const allParams = parameters.map((param) => this.evaluate(param));
        return add(...allParams);

      case "equals":
        return equals(parameters.length, 2)
          ? equals(this.evaluate(parameters[0]), this.evaluate(parameters[1]))
          : false;

      case "not":
        return equals(parameters.length, 1)
          ? not(this.evaluate(parameters[0]))
          : false;

      case "fetchGet":
        return equals(parameters.length, 1)
          ? fetchGet(this.evaluate(parameters[0]))
          : "";

      case "contains":
        return equals(parameters.length, 2)
          ? contains(this.evaluate(parameters[0]), this.evaluate(parameters[1]))
          : false;

      default:
        throw new Error("Unknown function");
    }
  }
}
