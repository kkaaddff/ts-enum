import { TsEnum } from '../lib/index' //私有库

const freeOptions =
  /** @type {const} */
  ([
    ['未开始', 0, 'UNDO'],
    ['进行中', 1, 'DOING'],
    ['已结束', 2, 'DONE'],
  ])
/**
 * 枚举值定义
 * @param {array[]} 二维数组，[label, value, key]
 */
const jsEnum = new TsEnum(freeOptions) // 或 JsEnum.of(Array) 也可以

// 下拉框数据：
const options = jsEnum.getOptions()

const codes = jsEnum.getCodes()
codes.DOING.value

const labels = jsEnum.getLabels()
labels.已结束.code

const values = jsEnum.getValues()