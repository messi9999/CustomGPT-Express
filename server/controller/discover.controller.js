const saveImageData = async (imageData) => {
  await Image.create({ data: imageData });
  console.log("Image saved to database");
};
exports.uploadDiscoverImage = async (req, res) => {
  try {
    const file = req.file;
    // File is available in req.file
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    // Process the file or save the details to the database
    const fs = require("fs");
    const imageData = fs.readFileSync(file.path);
    saveImageData(imageData);

    res.status(200).send("File uploaded successfully.");
  } catch (error) {
    res.status(500).send("Error occurred: " + error.message);
  }
};
