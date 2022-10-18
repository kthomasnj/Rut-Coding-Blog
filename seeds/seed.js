const sequelize = require('../config/connection');
const { Posts } = require('../models/Posts.js');

const blogPosts= require('./blogPosts.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const creatPosts = await Posts.bulkCreate(blogPosts);
  console.log(blogPosts);
}

seedDatabase();