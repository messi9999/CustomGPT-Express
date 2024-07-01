const config = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

////// 1. Initial model
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
});

//////// 2. chat model
db.chat = require("../models/chat.model.js")(sequelize, Sequelize)



//////// 3. Community model
db.commentLike = require("../models/community.comment.like.model.js")(sequelize, Sequelize);
db.comment = require("../models/community.comment.model.js")(sequelize, Sequelize);
db.postLike = require("../models/community.post.like.model.js")(sequelize, Sequelize);
db.post = require("../models/community.post.model.js")(sequelize, Sequelize);



db.user.hasMany(db.post, { foreignKey: "userId", as: "posts" });
db.post.belongsTo(db.user, { foreignKey: "userId", as: "user" });

db.user.hasMany(db.comment, { foreignKey: "userId", as: "comments" });
db.comment.belongsTo(db.user, { foreignKey: "userId", as: "user" });


db.post.hasMany(db.comment, { as: "comments" });
db.comment.belongsTo(db.post, {
  foreignKey: "postId",
  as: "postComments"
})


db.post.hasMany(db.postLike, { as: "postLikes" });
db.postLike.belongsTo(db.post, { foreignKey: "postId", as: "likesPost" });


db.comment.hasMany(db.commentLike, { as: "commentLikes" });
db.commentLike.belongsTo(db.comment, { foreignKey: "commentId", as: "likesComment" });


// db.user.hasOne(db.avatar, { foreignKey: "userId", as: "avatar" });
// db.avatar.belongsTo(db.user, { foreignKey: "userId", as: "user" });

db.ROLES = ["user", "admin"];

module.exports = db;
