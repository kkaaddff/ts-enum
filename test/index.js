import { TsEnum } from '../lib/index' //私有库
import { freeOptions } from './enum'

/**
 * 枚举值定义
 * @param {array[]} 二维数组，[label, value, key]
 */
const STATUS = new TsEnum(freeOptions) // 或 JsEnum.of(Array) 也可以

// 下拉框数据：
const options = STATUS.options()
console.log() // [ { "label": "未开始", "value": "0" }, { "label": "进行中", "value": "1" }, { "label": "已结束", "value": "2" } ]

// 通过 key 获取 value：
const codes = STATUS.codes
console.log(codes.UNDO) // 0
console.log(codes.DOING) // 1
console.log(codes.DONE) // 2

// 通过 value 获取 label：
const labels = STATUS.labels
console.log(labels[0]) // 未开始
console.log(labels[1]) // 进行中
console.log(labels[2]) // 已结束

// 获取枚举定义中所有的 value 值
console.log(STATUS.values) // [0,1,2]

// 获取枚举定义中所有的 key 值
console.log(STATUS.keys) // ['UNDO', 'DOING', 'DONE']
