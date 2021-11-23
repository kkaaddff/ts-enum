"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var enum_1 = require("./enum");
var STATUS = new index_1.TsEnum(enum_1.freeOptions);
var labels = STATUS.getLabels();
var values = STATUS.getValues();
var codes = STATUS.getCodes();
codes.DOING.label;
// 下拉框数据：
// let options = STATUS.options();
// console.log(options); // [ { "label": "未开始", "value": "0" }, { "label": "进行中", "value": "1" }, { "label": "已结束", "value": "2" } ]
// 获取枚举定义中所有的 value 值
// let values = STATUS.values;
// console.log(values); // [0,1,2]
// 获取枚举定义中所有的 key 值
// let keys = STATUS.keys;
// console.log(keys); // ['UNDO', 'DOING', 'DONE']
// 通过 key 获取 value：
// 通过 value 获取 label：
// let labels = STATUS.labels;
// console.log(labels[0]); // 未开始·
// console.log(labels[1]); // 进行中
// console.log(labels[2]); // 已结束
