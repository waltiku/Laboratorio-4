const mongoose = require('mongoose');
mongoose.connect("mongodb://172.26.0.3:27017/lab4");
module.exports = mongoose;