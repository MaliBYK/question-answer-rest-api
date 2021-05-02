const mongoose = require("mongoose");
const { modelName } = require("./Question");
const Question = require("./Question");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  content: {
    type: String,
    required: [true, "Please provide a content"],
    minLength: [20, "Please provide a content at least 20 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: mongoose.Schema.ObjectId,
    ref: "Question",
    required: true,
  },
});

AnswerSchema.pre("save", async function (next) {
  if (!this.isModified("user")) return next();

  const question = await Question.findById(this.question);
  question.answers.push(this._id);
  question.answerCount = question.answers.length;
  await question.save();
  next();
});

module.exports = mongoose.model("Answer", AnswerSchema);
