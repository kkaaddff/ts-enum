import { TsEnum } from './lib/index'
import { freeOptions } from './enum'

const STATUS = new TsEnum(freeOptions)

let labels = STATUS.getLabels()
