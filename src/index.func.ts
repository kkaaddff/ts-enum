/*
 * @Author: Qic
 * @Description: TsEnum 支持 类型推导 和 IDE智能提示（type inference & intellisense）
 */

import { TTsEnum, TTsEnumStatic } from './types'

const customKeys = ['label', 'value', 'code'] as const
/**
 * 创建自定义枚举 ： keys 为自定义的 key
 * @param param 二维数组 必须使用 as const 断言 转换成类型 
 * @type {[

    ['label1', 'value1', 'code1'],
    ['label2', 'value2', 'code2'],
   ]}
 * @param keys ['label', 'value', 'code'] as const
 * @returns
 */
function createCustomEnum<T extends readonly any[], K extends readonly string[]>(
  param: T,
  keys: K,
): TTsEnum<T, K> {
  const originalEnum = param
  return {} as TTsEnum<T, K>
}

/**
   * 创建 支持类型的枚举
   * @param param 二维数组 必须使用 as const 断言 转换成类型 
   * @type {[

    ['label1', 'value1', 'code1'],
    ['label2', 'value2', 'code2'],
   ]}
   */
function createTsEnum<T extends readonly any[]>(param: T) {
  const originalKeys = ['label', 'value', 'code'] as const
  return createCustomEnum(param, originalKeys)
}

const originalOptions = [
  ['未开始', 0, 'UNDO', true],
  ['进行中', 1, 'DOING', false],
  ['已结束', { ll: 1 }, 'DONE', true],
] as const

const crmEnum = createCustomEnum(originalOptions, customKeys)
const tsEnum = createTsEnum(originalOptions)
const getLabels = tsEnum.getLabels()
tsEnum.getLabels()
getLabels.未开始.code
const options = tsEnum.getOptions()
