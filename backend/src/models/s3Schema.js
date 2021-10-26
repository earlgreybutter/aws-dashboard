var mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define Schema
var s3Schema = new Schema(
  {
    Name: String,
    CreationDate: Date,
    Comment: String,
    CheckDate: Date,
  },
  {
    timestamps: true,
  }
);

// compile schema to model
var S3Model = mongoose.model("S3", s3Schema, "s3Collection");

module.exports = { S3Model };
