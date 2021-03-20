const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => blog.likes + sum, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.length && blogs.reduce((favBlog, currentBlog) => {
    if (currentBlog.likes > favBlog.likes) {
      return currentBlog;
    } else {
      return favBlog;
    }
  });
};

module.exports = {
  totalLikes,
  favoriteBlog,
};
