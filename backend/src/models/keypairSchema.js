var mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define Schema
var keypairSchema = new Schema(
  {
    KeyPairId: String,
    KeyFingerprint: String,
    KeyName: String,
    KeyType: String,
    Tags: Array,
    Comment: String,
    CheckDate: Date,
  },
  {
    timestamps: true,
  }
);

// compile schema to model
var KeypairModel = mongoose.model(
  "Keypair",
  keypairSchema,
  "keypairCollection"
);

module.exports = { KeypairModel };
