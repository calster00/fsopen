const totalLikes = require("../utils/list_helper").totalLikes;
const favoriteBlog = require("../utils/list_helper").favoriteBlog;
const mostBlogs = require("../utils/list_helper").mostBlogs;
const mostLikes = require("../utils/list_helper").mostLikes;

const blogs = [
  {
    _id: {
      $oid: "6055ce18f1113c72eaf5ddc3",
    },
    title:
      "A Rock Solid, Modern Web Stack—Rails 5 API + ActiveAdmin + Create React App on Heroku",
    author: "Charlie Gleason",
    url: "https://blog.heroku.com/a-rock-solid-modern-web-stack",
    likes: 6,
    __v: 0,
  },
  {
    _id: {
      $oid: "6055dc8b7406887a3080916c",
    },
    title: "Ruby on Rails vs Node.js – The Right Approach To Web Development",
    author: "Dawid Karczewski",
    url: "https://www.ideamotive.co/blog/ruby-on-rails-vs-node-js",
    likes: 9,
    __v: 0,
  },
  {
    _id: {
      $oid: "6055f5cf37b1bf8495e81f1d",
    },
    title:
      "Building the DOM faster: speculative parsing, async, defer and preload",
    author: "Milica Mihajlija",
    url:
      "https://hacks.mozilla.org/2017/09/building-the-dom-faster-speculative-parsing-async-defer-and-preload/",
    likes: 14,
    __v: 0,
  },
  {
    _id: {
      $oid: "605615bc07bbb589a49e6f80",
    },
    title: "Things I Don’t Know as of 2018",
    author: "Dan Abramov",
    url: "https://overreacted.io/things-i-dont-know-as-of-2018/",
    likes: 5,
    __v: 0,
  },
  {
    _id: {
      $oid: "605615bf07bbb589a49e6f81",
    },
    title: "Writing Resilient Components",
    author: "Dan Abramov",
    url: "https://overreacted.io/writing-resilient-components/",
    likes: 8,
    __v: 0,
  },
];

describe("total likes", () => {
  test("of empty list is zero", () => {
    expect(totalLikes([])).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    expect(totalLikes([blogs[0]])).toBe(6);
  });

  test("of a bigger list is calculated right", () => {
    expect(totalLikes(blogs)).toBe(42);
  });
});

describe("favorite blog", () => {
  test("is determined correctly when the list has only one blog", () => {
    expect(favoriteBlog([blogs[0]])).toEqual(blogs[0]);
  });

  test("is determined correctly when the list has a few blogs", () => {
    expect(favoriteBlog(blogs)).toEqual(blogs[2]);
  });

  test("zero is returned when the list is empty", () => {
    expect(favoriteBlog([])).toBe(0);
  });
});

describe("author with most blogs", () => {
  test("is determined correctly when the list has a few blogs", () => {
    expect(mostBlogs(blogs)).toEqual({ author: "Dan Abramov", blogs: 2 });
  });

  test("zero is returned when the list is empty", () => {
    expect(mostBlogs([])).toBe(0);
  });
});

describe("author with most likes", () => {
  test("is determined correctly when the list has a few blogs", () => {
    expect(mostLikes(blogs)).toEqual({ author: "Milica Mihajlija", likes: 14 });
  });

  test("zero is returned when the list is empty", () => {
    expect(mostLikes([])).toBe(0);
  });
});
