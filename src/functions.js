import https from "https";

export const equals = (arg1, arg2) => arg1 === arg2;

export const not = (param) => !!!param;

export const add = (...params) => params.reduce((a, b) => a + b, 0);

export const fetchGet = (url = "") =>
  new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => resolve(body));
      })
      .on("error", (error) => {
        reject(error);
      });
  });

export const contains = (str, substring) => str && str.includes(substring);
