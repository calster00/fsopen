const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const blogs = [
  {
    title: "Ruby on Rails vs Node.js – The Right Approach To Web Development",
    author: "Dawid Karczewski",
    url: "https://www.ideamotive.co/blog/ruby-on-rails-vs-node-js",
    likes: 9,
  },
  {
    title:
      "Building the DOM faster: speculative parsing, async, defer and preload",
    author: "Milica Mihajlija",
    url:
      "https://hacks.mozilla.org/2017/09/building-the-dom-faster-speculative-parsing-async-defer-and-preload/",
    likes: 14,
  },
  {
    title: "Things I Don’t Know as of 2018",
    author: "Dan Abramov",
    url: "https://overreacted.io/things-i-dont-know-as-of-2018/",
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  for (const blog of blogs) {
    await new Blog(blog).save();
  }
});

describe("when there are some blogs saved in a database", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all saved blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(blogs.length);
  });

  test("the first blog is about Rails", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].title).toMatch(/Rails/);
  });

  test("the first blog has an id property", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
  });
});

describe("addition of a new blog", () => {
  test("succeeds with valid data", async () => {
    const blog = {
      title: "Writing Resilient Components",
      author: "Dan Abramov",
      url: "https://overreacted.io/writing-resilient-components/",
      likes: 8,
    };

    await api
      .post("/api/blogs")
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(blogs.length + 1);

    const blogTitles = response.body.map((blog) => blog.title);
    expect(blogTitles).toContain("Writing Resilient Components");
  });

  test("succeeds with no likes value provided, set to 0 by default", async () => {
    await Blog.deleteMany({});

    const blog = {
      title: "Writing Resilient Components",
      author: "Dan Abramov",
      url: "https://overreacted.io/writing-resilient-components/",
    };

    await api.post("/api/blogs").send(blog);
    const response = await api.get("/api/blogs");
    expect(response.body[0].likes).toBe(0);
  });

  test("fails when the title or url are missing", async () => {
    await Blog.deleteMany({});

    const blog = {
      title: "Writing Resilient Components",
      author: "Dan Abramov",
    };

    let response = await api.post("/api/blogs").send(blog);
    expect(response.status).toBe(400);

    blog.url = "";
    delete blog.title;
    response = await api.post("/api/blogs").send(blog);
    expect(response.status).toBe(400);
  });
});

describe("deletion of a blog", () => {
  test("succeeds if the id is valid", async () => {
    const blogsBefore = await Blog.find({});

    const blogToDelete = blogsBefore[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAfter = await Blog.find({});
    const ids = blogsAfter.map((blog) => blog.id);
    expect(ids).not.toContain(blogToDelete.id);
  });
});

describe("updating a blog", () => {
  test("succeeds if the id is valid", async () => {
    const blogs = await Blog.find({});

    const blogToUpdate = blogs[0];
    await api
      .post(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 33 })
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        res.body.likes = 33;
      });

    const updatedBlog = await Blog.findById(blogToUpdate.id);
    expect(updatedBlog.likes).toBe(33);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
