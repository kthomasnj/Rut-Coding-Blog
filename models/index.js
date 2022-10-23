const User = require('./users');
const Blog = require('./blog');

User.hasMany(Blog, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreignKey: 'id'
});

module.exports = { User, Blog };