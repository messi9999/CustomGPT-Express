const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const methodOverride = require('method-override');

const fs = require('fs');
const path = require("path");

require("dotenv").config();

const app = express();

app.use(methodOverride('X-HTTP-Method-Override'));

var corsOptions = {
  origin: process.env.DOMAIN,
};

// app.use(cors(corsOptions));

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));


const fileUpload = require('express-fileupload');
app.use(fileUpload());

const db = require("./server/models");
const Role = db.role;

//////////////// 1. Initial sync
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync DB.");
//   initial();
// });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user",
//   });

//   Role.create({
//     id: 2,
//     name: "admin",
//   });
// }

//////////////// 2. Chat sync
// const Chat = db.chat
// try {
//   Chat.sync();
// } catch (error) {
//   console.error('Error:', error);
// }
// db.sequelize.sync();


/////////////// 3. Community sync
// const Post = db.post
// const Avatar = db.avatar
// const Comment = db.comment
// const PostLike = db.postLike
// const CommentLike = db.commentLike

// try {
//   db.post.sync()
//   .then(() => db.comment.sync())
//   .then(() => db.avatar.sync())
//   .then(() => db.postLike.sync())
//   .then(() => db.commentLike.sync())
  
// } catch (error) {
//   console.error('Error:', error)
// }
// db.sequelize.sync();



//-----------Config Assistants----------------
// const chatGptUtils = require("./server/utils/chatgpt.utils")
// chatGptUtils.updatedAssistant()


/////////////////////// Folder maker
// function ensureDirSync (dirpath) {
//   try {
//       fs.mkdirSync(dirpath, { recursive: true });
//   } catch (err) {
//       if (err.code !== 'EEXIST') throw err
//   }
// }

// // Usage
// ensureDirSync(path.join(__dirname, '/server/storage'));
// ensureDirSync(path.join(__dirname, '/server/storage/community'));
// ensureDirSync(path.join(__dirname, '/server/storage/community/files'));
// ensureDirSync(path.join(__dirname, '/server/storage/community/images'));
// ensureDirSync(path.join(__dirname, '/server/storage/user'));
// ensureDirSync(path.join(__dirname, '/server/storage/user/avatar'));


require("./server/routes/chatbot.routes")(app);
require("./server/routes/auth.routes")(app);
require("./server/routes/user.routes")(app);
require("./server/routes/discover.routes")(app);
require("./server/routes/payment.routes")(app);
require("./server/routes/community.routes")(app);

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "./client/build")));
app.use('/server/storage/', express.static(path.join(__dirname, 'server/storage/')))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
