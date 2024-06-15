const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const uploadImage = require("./storeImage");
const paymentCheck = require("./paymentCheck");

module.exports = {
  authJwt,
  verifySignUp,
  uploadImage,
  paymentCheck,
};
