const totalLikes = require("../utils/list_helper").totalLikes;

describe("total likes", () => {
  const blogs = [
    {
      _id: {
        $oid: "6055ce18f1113c72eaf5ddc3",
      },
      title:
        "A Rock Solid, Modern Web Stack—Rails 5 API + ActiveAdmin + Create React App on Heroku",
      author: "CHARLIE GLEASON",
      url: "https://blog.heroku.com/a-rock-solid-modern-web-stack",
      likes: 1036,
      __v: 0,
    },
    {
      _id: {
        $oid: "6055dc8b7406887a3080916c",
      },
      title: "Ruby on Rails vs Node.js – The Right Approach To Web Development",
      author: "Dawid Karczewski",
      url: "https://www.ideamotive.co/blog/ruby-on-rails-vs-node-js",
      likes: 1886,
      __v: 0,
    },
  ];

  test("of empty list is zero", () => {
    expect(totalLikes([])).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    expect(totalLikes([blogs[0]])).toBe(1036);
  });

  test("of a bigger list is calculated right", () => {
    expect(totalLikes(blogs)).toBe(2922);
  });
});
