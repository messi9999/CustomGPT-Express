const fs = require("fs").promises;

const saveImageData = async (imageData) => {
  try {
    await Image.create({ data: imageData });
    console.log("Image saved to database");
  } catch (error) {
    throw error; // Propagate the error
  }
};

exports.uploadDiscoverImage = (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  fs.readFile(file.path)
    .then((imageData) => {
      // Using the Promise returned by saveImageData
      return saveImageData(imageData);
    })
    .then(() => {
      // This block executes after saveImageData resolves
      res.status(200).send("File uploaded successfully.");
    })
    .catch((error) => {
      // This block handles any errors in the entire chain
      res.status(500).send("Error occurred: " + error.message);
    });
};
