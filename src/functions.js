//todo: add unit tests
var https = require("https");

export function equals(arg1, arg2) {
  return arg1 == arg2;
}

export function not(param) {
  return !param;
}

export function add(...params) {
  return params.reduce((a, b) => a + b, 0);
}

export function fetchGet(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => resolve(body));
      })
      .on("error", (er) => {
        reject();
      });
  });
}

export function contains(str, substring) {
  return str.then((s) => s.includes(substring));
}
