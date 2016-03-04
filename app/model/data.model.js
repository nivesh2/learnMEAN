'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataSchema = new Schema({
   key:String,
   value:String
});

mongoose.model('Data',DataSchema);