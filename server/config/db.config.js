require("dotenv").config();

module.exports = {
  HOST: process.env.DBHOST,
  USER: process.env.DBUSER,
  PASSWORD: process.env.DBPASSWORD,
  DB: process.env.DBNAME,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  ssl: true,
  dialectOptions: {
    ssl: {
      // require: true, // This will help you connect to the RDS instance using SSL
      rejectUnauthorized: false // You might want to set this to true in production
    }
  }
};
