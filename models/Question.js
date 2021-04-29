const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QuestionSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    minLenght: [10, "Please provide a title at least 10 characters"],
  },
  content: {
    type: String,
    required: [true, "Please provide a content"],
    minLength: [20, "Please provide a content at least 20 characters"],
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
