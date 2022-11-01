const User = require('./users');
const Post = require('./post');
const Comments = require('./comment')

User.hasMany(Post, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'id'
});

User.hasMany(Comments, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});

Comments.belongsTo(User, {
    foreignKey: 'id'
})

module.exports = { User, Post };