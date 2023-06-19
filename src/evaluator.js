import { add, equals, not, fetchGet, contains } from "./functions";

// // todo: refactor and improve.
// export class Evaluator {
//   evaluate(expression) {
//     if (expression.type == "literal") {
//       var val = expression.value;
//       return val;
//     } else {
//       if (expression.name == "add") {
//         const allParams = expression.parameters.map((param) =>
//           this.evaluate(param)
//         );

//         return add(...allParams);
//       } else if (expression.name == "equals") {
//         const param1 = this.evaluate(expression.parameters[0]);
//         const param2 = this.evaluate(expression.parameters[1]);
//         return equals(param1, param2);
//       } else if (expression.name == "not") {
//         return not(expression.parameters[0]);
//       } else if (expression.name == "fetchGet") {
//         return fetchGet(this.evaluate(expression.parameters[0]));
//       } else if (expression.name == "contains") {
//         return contains(
//           this.evaluate(expression.parameters[0]),
//           this.evaluate(expression.parameters[1])
//         );
//       }
//     }
//     throw "Unknown function";
//   }
// }

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
