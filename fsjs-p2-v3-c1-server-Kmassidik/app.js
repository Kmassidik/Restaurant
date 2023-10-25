if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  // console.log(process.env);
}

const express = require("express");
const app = express();
// const port = process.env.PORT || 3000;
const cors = require("cors");
const index = require("./routes/index");
const auth = require("./routes/auth");
const pub = require("./routes/pub");
const errorHandler = require("./midddleware/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from RMT40 - Kurnia Massidik!");
});

app.use(auth);
app.use("/pub", pub);
app.use(index);
app.use(errorHandler);

module.exports = app;

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
