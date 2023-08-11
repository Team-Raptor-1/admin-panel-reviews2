const mongoose = require("mongoose");

const postreview = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "Title is required"],
  },
  name: {
    type: String,
    required: [true, "Description is required"],
  },
  rating: {
    type: int,
    required: [true, "Rating is required"],
  },
  comment: {
    type: String,
    required: [true, "Comment is required"],
  },
  blogId: {
    type: int,
    ref: "Image",
  },
});

module.exports = {
  Post: mongoose.model("Review", postreview),
};
