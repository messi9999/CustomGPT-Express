const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = require("path");

require("dotenv").config();

const app = express();

var corsOptions = {
  origin: process.env.DOMAIN,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));


const db = require("./server/models");
const Role = db.role;

// db.sequelize.sync();

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync DB.");
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "admin",
  });
}

//-----------Config Assistants----------------
// const chatGptUtils = require("./server/utils/chatgpt.utils")
// chatGptUtils.updatedAssistant()

require("./server/routes/chatbot.routes")(app);
require("./server/routes/auth.routes")(app);
require("./server/routes/user.routes")(app);
require("./server/routes/discover.routes")(app);
require("./server/routes/payment.routes")(app);

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
