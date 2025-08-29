import { Router } from "express";
import multer from "multer";
import Post from "../models/Post.js";
import auth from "../middleware/auth.js";
import User from "../models/User.js";

const router = Router();

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, "public/media"),
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

const notify = (id, text, link) =>
  User.findByIdAndUpdate(id, {
    $push: { notifications: { text, link } }
  });

router.post("/", [auth, upload.single("media")], async (req, res) => {
  const post = await Post.create({
    author: req.user,
    text: req.body.text,
    media: req.file ? `/media/${req.file.filename}` : null,
    tags: req.body.tags?.split(",").map(t => t.trim())
  });

  const me = await User.findById(req.user);
  me.followers.forEach(f => notify(f, `${me.name} posted something`, "/feed.html"));
  res.json(post);
});

router.get("/", auth, async (_, res) => {
  const posts = await Post.find().sort({ date: -1 }).populate("author", "name avatar");
  res.json(posts);
});

router.put("/:id/like", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  const i = post.likes.indexOf(req.user);
  i === -1 ? post.likes.push(req.user) : post.likes.splice(i, 1);
  await post.save();
  res.json({ likes: post.likes.length });
});

router.post("/:id/comment", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push({ user: req.user, text: req.body.text });
  await post.save();
  res.json(post.comments);
});

router.get("/trending", auth, async (_, res) => {
  const posts = await Post.find().sort({ "likes.length": -1 }).limit(10).populate("author");
  res.json(posts);
});

export default router;