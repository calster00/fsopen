const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => blog.likes + sum, 0);
};

const favoriteBlog = (blogs) => {
  return (
    blogs.length &&
    blogs.reduce((favBlog, currentBlog) => {
      if (currentBlog.likes > favBlog.likes) {
        return currentBlog;
      } else {
        return favBlog;
      }
    })
  );
};

const mostBlogs = (blogs) => {
  if (!blogs.length) return 0;

  const blogsCount = blogs.reduce((count, blog) => {
    if (count[blog.author]) {
      count[blog.author] += 1;
    } else {
      count[blog.author] = 1;
    }
    return count;
  }, {});


  return Object.entries(blogsCount).reduce((topAuthor, author) => {
    const [name, blogs] = author;

    if (!topAuthor.blogs || blogs > topAuthor.blogs) {
      topAuthor = { author: name, blogs };
    }

    return topAuthor;
  }, {});
};

const mostLikes = (blogs) => {
  if (!blogs.length) return 0;

  const likesCount = blogs.reduce((count, blog) => {
    if (count[blog.author]) {
      count[blog.author] += blog.likes;
    } else {
      count[blog.author] = blog.likes;
    }
    return count;
  }, {});


  return Object.entries(likesCount).reduce((topAuthor, author) => {
    const [name, likes] = author;

    if (!topAuthor.likes || likes > topAuthor.likes) {
      topAuthor = { author: name, likes };
    }

    return topAuthor;
  }, {});
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
