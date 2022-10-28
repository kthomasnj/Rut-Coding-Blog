const sequelize = require('../config/connection');
const Post = require("../models/Post");

const blogPosts = require('./blogPosts.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const creatPosts = await Post.bulkCreate(blogPosts);
  console.log(blogPosts);
}

seedDatabase();