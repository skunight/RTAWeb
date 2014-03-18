/**
 * Created by zzy on 3/7/14.
 */
var db = require('./../tools/db');
var Schema = db.mongoose.Schema;//Schema;
var productSchema = new Schema({
    relatedProductID: [                                                 //关联产品
        {
            'product': {'type':Schema.Types.ObjectId,'ref':'Product'},  //关联产品ID
            'day': Number,                                              //第几天
            'qty': Number                                               //数量
        }
    ],
    name: String,                                                       //产品名称
    content: String,                                                    //产品内容
    intro: String,                                                      //产品简介
    image: [                                                            //产品图片
        {
            url: String,                                                //产品图片地址
            intro: String                                               //产品图片简介
        }
    ],
    city: {'type':Schema.Types.ObjectId,'ref':'City'},                  //产品所在城市ID
    addr: String,                                                       //产品地址（文字)
    gps: {                                                              //产品地址(经纬度)
        lat: Number,                                                    //产品地址维度
        lon: Number                                                     //产品地址经度
    },
    level: Number,                                                      //产品级别
    openTime: String,                                                   //产品使用时间
    bookRule: String,                                                   //预定须知
    useRule: String,                                                    //使用须知
    cancelRule: String,                                                 //退改规则
    transportation: String,                                             //交通指南
    effectDate: Number,                                                 //有效期开始
    expiryDate: Number,                                                 //有效期结束
    isEnable: Boolean,                                                  //产品状态
    contactName: String,                                                //产品联系人
    tel: String,                                                        //产品联系电话
    fax: String,                                                        //产品联系传真
    type: Number,                                                       //产品大类 ticket:1,hotel:2,voture:3,package:4,ticketPackage:5
    subType: Number,                                                    //产品子类 PACKAGE 1 电子票 2 实体票
    status: {'type': Number, 'default': 1},                             //产品状态
    operator: {'type':Schema.Types.ObjectId,'ref':'Member'},            //操作员
    createTime: {type: Number, default: Date.now},                      //产品创建时间
    updateTime: Number                                                  //产品修改时间
});

var Product = db.mongoose.model("Product", productSchema);

module.exports = Product;