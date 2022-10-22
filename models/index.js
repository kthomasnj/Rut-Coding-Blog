const User = require('./users');
const Posts = require('./posts');

User.hasMany(Posts, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});

Posts.belongsTo(User, {
    foreignKey: 'id'
});

module.exports = { User, Posts };