const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let posts = []; // In-memory storage for blog posts

// Home Route - Display all posts
app.get("/", (req, res) => {
    res.render("home", { posts });
});

// New Post Form
app.get("/new", (req, res) => {
    res.render("new");
});

// Create Post
app.post("/posts", (req, res) => {
    const { title, content } = req.body;
    const id = posts.length + 1;
    posts.push({ id, title, content });
    res.redirect("/");
});

// Edit Post Form
app.get("/posts/:id/edit", (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render("edit", { post });
});

// Update Post
app.put("/posts/:id", (req, res) => {
    const { title, content } = req.body;
    const post = posts.find(p => p.id == req.params.id);
    post.title = title;
    post.content = content;
    res.redirect("/");
});

// Delete Post
app.delete("/posts/:id", (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect("/");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
