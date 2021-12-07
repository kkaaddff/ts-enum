import { IndexArray, KeyBy, LengthOfArray, TsEnum } from '../src/index'

const originalOptions = [
  ['未开始', 0, 'UNDO'],
  ['进行中', 1, 'DOING'],
  ['已结束', 2, 'DONE'],
] as const

const originalKeys = ['label', 'value', 'code'] as const

const tsenum = new TsEnum(originalOptions, originalKeys)
const customKeys = tsenum.customKeys
const options = tsenum.getOptions()

customKeys
options
options[1].label
const codes = tsenum.getCodes()
console.log(codes)
codes.DOING.label
codes.DOING.value
codes.DOING.label === '进行中'

const labels = tsenum.getLabels()
console.log(labels)
labels.已结束.value

const values = tsenum.getValues()
console.log(values)
values[0].code
values[1].label === '进行中'

