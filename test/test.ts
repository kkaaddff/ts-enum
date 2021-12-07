import { KeyBy, LengthOfArray, TsEnum } from '../src/index'

const originalOptions = [
  ['未开始', 0, 'UNDO', true],
  ['进行中', 1, 'DOING', false],
  ['已结束', { ll: 1 }, 'DONE', true],
] as const

const originalKeys = ['label', 'value', 'code', 'option'] as const

const tsenum = new TsEnum(originalOptions, originalKeys)
const customKeys = tsenum.customKeys
const options = tsenum.getOptions()
tsenum.getOK
customKeys
const options1 = options[1]
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
