const multer = require("multer");
const path = require("path");

// Set up multer for storing uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "server/uploads/"); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // Filename format
  },
});

const upload = multer({ storage: storage }); //temporarily svae files to uploads folder.

uploadFile = (req, res, next) => {
  upload.single("image");
  return;
};

const uploadImage = {
  store: uploadFile,
};

module.exports = uploadImage;
