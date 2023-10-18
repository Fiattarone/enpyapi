const express = require("express");
const app = express();
const routes = require("./routes");

const PORT = process.env.PORT || 3000;
app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello World -- ENPY API here!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
