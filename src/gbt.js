function fetchGet(url) {
  // Assume an asynchronous implementation using fetch API
  return fetch(url)
    .then((response) => response.text())
    .catch((error) => {
      console.error("Error fetching URL:", url);
      throw error;
    });
}

function contains(str, substring) {
  return str.includes(substring);
}

function evaluateAST(node) {
  if (node.type === "literal") {
    return node.value;
  } else if (node.type === "function") {
    switch (node.name) {
      case "add":
        return (
          evaluateAST(node.parameters[0]) + evaluateAST(node.parameters[1])
        );
      case "equals":
        return (
          evaluateAST(node.parameters[0]) === evaluateAST(node.parameters[1])
        );
      case "not":
        return !evaluateAST(node.parameters[0]);
      case "fetchGet":
        return fetchGet(evaluateAST(node.parameters[0]));
      case "contains":
        return contains(
          evaluateAST(node.parameters[0]),
          evaluateAST(node.parameters[1])
        );
      default:
        throw new Error("Unknown function: " + node.name);
    }
  }
}

// Example: contains(fetchGet("https://google.com"), "Bing")
const ast = {
  type: "function",
  name: "contains",
  parameters: [
    {
      type: "function",
      name: "fetchGet",
      parameters: [
        {
          type: "literal",
          value: "https://google.com",
        },
      ],
    },
    {
      type: "literal",
      value: "Bing",
    },
  ],
};

evaluateAST(ast)
  .then((result) => console.log("Expression Result:", result))
  .catch((error) => console.error("Error evaluating AST:", error));
