const sequelize = require('../config/connection');
const Post = require("../models/Post");
const Comments = require("../models/Comment");

const blogPosts = require('./blogPosts.json');
const comments = require('./comments.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const creatPosts = await Post.bulkCreate(blogPosts);
  const addComments = await Comments.bulkCreate(comments);
  console.log(blogPosts);
  console.log(comments);
}

seedDatabase();