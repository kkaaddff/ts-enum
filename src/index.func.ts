/*
 * @Author: Qic
 * @Description: TsEnum 支持 类型推导 和 IDE智能提示（type inference & intellisense）
 */

import { EnumOptions, KeyBy } from './types'

type TTsEnum<T extends readonly any[], K extends readonly string[]> = {
  [key in K[number] as `get${Capitalize<key>}`]?: any
}

const customKeys = ['label', 'value', 'code'] as const

function tsEnumFunc<T extends readonly any[], K extends readonly string[]>(
  param: T,
  keys: K,
): TTsEnum<T, K> {
  const originalEnum = param
  return {}
}

const originalOptions = [
  ['未开始', 0, 'UNDO', true],
  ['进行中', 1, 'DOING', false],
  ['已结束', { ll: 1 }, 'DONE', true],
] as const
// const originalKeys = ['label', 'value', 'code', 'option'] as const

const tsenum = tsEnumFunc(originalOptions, customKeys)
tsenum.getCode()
