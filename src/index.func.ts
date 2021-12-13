/*
 * @Author: Qic
 * @Description: TsEnum 支持 类型推导 和 IDE智能提示（type inference & intellisense）
 */

import { EnumOptions, IndexArray, LengthOfArray, TTsEnum, TTsEnumStatic } from './types'

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
export function createCustomEnum<T extends readonly any[], K extends readonly string[]>(
  param: T,
  keys: K,
): TTsEnum<T, K> {
  if (keys.find(key => ['originalEnum', 'originalKeys', 'options'].some(k => k === key))) {
    throw new Error('keys 不可以包含 originalEnum, originalKeys, options')
  }
  const _enum = {} as TTsEnum<T, K>

  _enum.originalEnum = Object.freeze(param)
  _enum.originalKeys = Object.freeze(keys)

  _enum.getOptions = () => {
    const options: unknown[] = []
    _enum.originalEnum.forEach(item => {
      const option: { [key: string]: any } = {}
      _enum.originalKeys.forEach((key, index) => {
        option[key] = item[index]
      })

      options.push(option)
    })
    return options as EnumOptions<T, K>
  }

  _enum.originalKeys.forEach((key, index) => {
    // @ts-ignore
    _enum[`get${capitalize(key)}s`] = () => {
      const result: {
        [k: string]: any
      } = {}

      _enum.originalEnum.forEach(item => {
        const values: {
          [k: string]: any
        } = {}

        _enum.originalKeys.forEach((k, i) => {
          values[k] = item[index]
        })

        result[key] = values
      })

      return result
    }
  })

  return _enum
}

/**
   * 创建 支持类型的枚举
   * @param param 二维数组 必须使用 as const 断言 转换成类型 
   * @type {[

    ['label1', 'value1', 'code1'],
    ['label2', 'value2', 'code2'],
   ]}
   */
export function createTsEnum<T extends readonly any[]>(param: T) {
  const originalKeys = ['label', 'value', 'code'] as const
  return createCustomEnum(param, originalKeys)
}

export const capitalize = (str: string) =>
  str.toLocaleLowerCase().replace(/\b[a-z]/g, char => char.toUpperCase())
