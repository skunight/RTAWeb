/**
 * Created by zzy on 3/14/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;


var citySchema = new Schema({
    'name': String,                                                 //城市名称
    'pinyin': String,                                               //城市拼音
    'firstLetter': String,                                          //城市首字母
    'isEnable': Boolean,                                            //是否有效
    'province': {'type':Schema.Types.ObjectId,'ref':'Province'},    //省份ID
    'image':[                                                       //图片
        {
            'url':String,                                           //图片地址
            'intro':String                                          //图片简介
        }
    ],
    'order':Number                                                  //排序值

});

var City = db.mongoose.model("City", citySchema);

module.exports = City;