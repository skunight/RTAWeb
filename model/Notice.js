/**
 * Created by zzy on 3/28/14.
 */
/**
 * Created by zzy on 3/14/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;


var noticeSchema = new Schema({
    'title': String,                                                //标题
    'content': String,                                              //内容
    'createTime': {'type':Number,'default':Date.now},               //发布时间
    'isEnable': Boolean,                                            //是否有效
    'type':Number,                                                  //类型 0：政府公告，
    'operator': {type:Schema.Types.ObjectId,ref:'Member'},          //操作员
    'auditor': {type:Schema.Types.ObjectId,ref:'Member'},           //审核员
    'auditorTime':Number,                                           //审核时间
    'order':Number                                                  //排序

});

var Notice = db.mongoose.model("Notice", noticeSchema);

module.exports = Notice;