const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => blog.likes + sum, 0);
};

module.exports = {
  totalLikes,
};
