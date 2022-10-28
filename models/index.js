const User = require('./users');
const Post = require('./post');

User.hasMany(Post, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'id'
});

module.exports = { User, Post };