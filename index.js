//MODULE IMPORTS
const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

//ROUTE IMPORTS
const api = require("./routes/api");
const user = require("./routes/user");

(async function connectDB() {
  try {
    const connect = await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(
      "INFO:: CONNECTION ESTABLISHED TO DATABASE:",
      connect.connections[0].name
    );
  } catch (err) {
    console.log("ERROR:: CONNECTION ESTABLISHMENT FAILED\n", err);
  }
})();

const app = express();
app.use(express.json());
app.use("/api", api);
app.use("/user", user);

app.listen(process.env.PORT, () => {
  console.log(
    "INFO:: STARTING THE DEVELOPMENT SERVER ON PORT:",
    process.env.PORT
  );
});
