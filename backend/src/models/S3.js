var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const InputColumn = require('./InputColumn');

// define Schema
var s3Schema = new Schema(
  {
    Name: {
      type: String,
      required: [true, 'Name field is required'],
    }, // pk 비슷한 것
    CreationDate: Date,
    InputValue: InputColumn,
  },
  {
    timestamps: true,
  }
);

// Name, CreationDate 문자열 연결해서 pk로 쓰자.

// compile schema to model
var S3Model = mongoose.model('S3', s3Schema, 's3Collection');

module.exports = { S3Model };
