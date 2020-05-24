const express = require("express");
const router = express.Router();

const passport = require("passport");

const Post = require("../../models/Post");
const validatePostInput = require("../../validation/post");

// @route GET api/posts/test
// @desc Tests posts route
// @access public
router.get("/test", (req, res) => res.json({ msg: "post works" }));

// @route GET api/posts
// @desc Get posts
// @access public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostfound: err }));
});

// @route POST api/posts
// @desc Create post
// @access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      user: req.user.id,
      name: req.body.name,
      message: req.body.message,
    });

    newPost.save().then((post) => res.json(post));
  }
);

module.exports = router;
