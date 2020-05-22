const express = require("express");
const router = express.Router();
const passport = require("passport");
// const mongoose = require("mongoose");

// post model
const Post = require("../../models/Post");
// profile model

// Validation
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
    .catch((err) => res.status(404).json({ nopostfound: "No posts found" }));
});

// @route GET api/posts/:id
// @desc get post by id
// @access public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

// @route POST api/posts
// @desc Create post
// @access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("RUNNING POST", req.user.id);
    const { errors, isValid } = validatePostInput(req.body);
    console.log(errors, isValid);
    // check validation
    if (!isValid) {
      // if any errors, send 400 with errors object
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

// @route DELETE api/posts/:id
// @desc Delete post
// @access private
// router.delete(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id }).then((profile) => {
//       Post.findById(req.params.id)
//         .then((post) => {
//           // check for post owner
//           if (post.user.toString() !== req.user.id) {
//             return res
//               .status(401)
//               .json({ notauthorized: "User not authorized" });
//           }

//           // delete
//           post.remove().then(() => res.json({ success: true }));
//         })
//         .catch((err) =>
//           res.status(404).json({ postnotfound: "No post found" })
//         );
//     });
//   }
// );

// @route POST api/posts/like/:id
// @desc Like post
// @access private
// router.post(
//   "/like/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id }).then((profile) => {
//       Post.findById(req.params.id)
//         .then((post) => {
//           if (
//             post.likes.filter((like) => like.user.toString() === req.user.id)
//               .length > 0
//           ) {
//             return res
//               .status(400)
//               .json({ alreadyliked: "User already liked this post" });
//           }

//           // add user id to likes array
//           post.likes.unshift({ user: req.user.id });

//           post.save().then((post) => res.json(post));
//         })
//         .catch((err) =>
//           res.status(404).json({ postnotfound: "No post found" })
//         );
//     });
//   }
// );

// @route POST api/posts/unlike/:id
// @desc unlike post
// @access private
// router.post(
//   "/unlike/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id }).then((profile) => {
//       Post.findById(req.params.id)
//         .then((post) => {
//           if (
//             post.likes.filter((like) => like.user.toString() === req.user.id)
//               .length === 0
//           ) {
//             return res
//               .status(400)
//               .json({ notliked: "you have no yet liked this post" });
//           }

//           // get remove index
//           const removeIndex = post.likes
//             .map((item) => item.user.toString())
//             .indexOf(req.user.id);

//           // splice out of array
//           post.likes.splice(removeIndex, 1);

//           // save
//           post.save().then((post) => res.json(post));
//         })
//         .catch((err) =>
//           res.status(404).json({ postnotfound: "No post found" })
//         );
//     });
//   }
// );

// @route   POST api/posts/comment/:id
// @desc    add comment to post
// @access  private
// router.post(
//   "/comment/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const { errors, isValid } = validatePostInput(req.body);

//     // check validation
//     if (!isValid) {
//       // if any errors, send 400 with errors object
//       return res.status(400).json(errors);
//     }

//     Post.findById(req.params.id)
//       .then((post) => {
//         const newComment = {
//           avatar: req.body.avatar,
//           name: req.body.name,
//           message: req.body.message,
//           user: req.user.id,
//         };

//         // add to comments array
//         post.comments.unshift(newComment);

//         // save
//         post.save().then((post) => res.json(post));
//       })
//       .catch((err) => res.status(404).json({ postnotfound: "no post found" }));
//   }
// );

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    remove comment from post
// @access  private
// router.delete(
//   "/comment/:id/:comment_id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Post.findById(req.params.id)
//       .then((post) => {
//         // check to see if comment exists
//         if (
//           post.comments.filter(
//             (comment) => comment._id.toString() === req.params.comment_id
//           ).length === 0
//         ) {
//           return res
//             .status(404)
//             .json({ commentnotexists: "comment does not exist" });
//         }

//         // get remove index
//         const removeIndex = post.comments
//           .map((item) => item._id.toString())
//           .indexOf(req.params.comment_id);

//         // splice comment out of array
//         post.comments.splice(removeIndex, 1);

//         post.save().then((post) => res.json(post));
//       })
//       .catch((err) => res.status(404).json({ postnotfound: "no post found" }));
//   }
// );

module.exports = router;
