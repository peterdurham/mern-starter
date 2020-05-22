const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = Post = mongoose.model("post", PostSchema);
