const sequelize = require('../config/connection');
const Blog = require("../models/blog");

const blogPosts= require('./blogPosts.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const creatPosts = await Blog.bulkCreate(blogPosts);
  console.log(blogPosts);
}

seedDatabase();