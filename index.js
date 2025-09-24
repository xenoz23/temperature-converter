import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { celsius: "", fahrenheit: "", kelvin: "" });
});

app.post("/convert", (req, res) => {
  const { celsius, fahrenheit, kelvin } = req.body;

  let c, f, k;

  if (celsius) {
    c = parseFloat(celsius);
    f = (c * 1.8 + 32).toFixed(2);
    k = (c + 273.32).toFixed(2);
  } else if (fahrenheit) {
    f = parseFloat(fahrenheit);
    c = ((f - 32) / 1.8).toFixed(2);
    k = ((f - 32) / 1.8 + 273.32).toFixed(2);
  } else if (kelvin) {
    k = parseFloat(kelvin);
    c = (k - 273.32).toFixed(2);
    f = ((k - 273.32) * 1.8 + 32).toFixed(2);
  } else {
    c = f = k = "";
  }

  res.render("index.ejs", {celsius: c, fahrenheit: f, kelvin: k});
});


app.listen(port, () => {
    console.log(`Server is Running on port: ${port}`);
})