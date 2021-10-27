const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create instance Schema
var UserinputSchema = new Schema(
  {
    JoinDocId: {
        type: String, 
        required: [true, "JoinDocId field is required"],
    },  // not null 처리 해주어야 함. 
    Comment: String,
    CheckDate: Date
  },
  {
    timestamps: true,
  }
);

var UserinputModel = mongoose.model(
    "Userinput",
    UserinputSchema,
    "userinputCollection"
); 

module.exports = { UserinputModel };