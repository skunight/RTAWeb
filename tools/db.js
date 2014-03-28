/**
 * Created by zzy on 3/3/14.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://172.16.0.15/zjy');
exports.mongoose = mongoose;