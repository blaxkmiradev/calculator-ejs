const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let history = [];

app.get("/", (req, res) => {
  res.render("index", { result: null, history });
});

app.post("/calculate", (req, res) => {
  const { num1, num2, operator } = req.body;

  const a = parseFloat(num1);
  const b = parseFloat(num2);

  let result;

  if (operator === "+") result = a + b;
  else if (operator === "-") result = a - b;
  else if (operator === "*") result = a * b;
  else if (operator === "/") result = b !== 0 ? a / b : "Cannot divide by 0";
  else result = "Error";

  const record = `${a} ${operator} ${b} = ${result}`;
  history.unshift(record);

  res.render("index", { result, history });
});

app.listen(3000, () => {
  console.log("Server running http://localhost:3000");
});
