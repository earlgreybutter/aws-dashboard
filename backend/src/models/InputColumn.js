const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InputColumnSchema = new Schema(
  {
    Comment: String,
    CheckDate: Date,
  },
  { timestamps: true }
);

module.exports = InputColumnSchema;
