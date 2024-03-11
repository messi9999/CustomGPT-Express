module.exports = {
  secret: "nourish-secret",
  options: {
    algorithm: "HS256",
    // allowInsecureKeySizes: true,
    expiresIn: 86400, // 24 hours
  }
};
