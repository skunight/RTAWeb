/**
 * Created by zzy on 3/3/14.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/zjy');
exports.mongoose = mongoose;