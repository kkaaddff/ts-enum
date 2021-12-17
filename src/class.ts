/*
 * @Author: Qic
 * @Description: TsEnum 支持 类型推导 和 IDE智能提示（type inference & intellisense）
 */

import { EnumOptions, KeyBy } from './types'

const customKeys = ['label', 'value', 'code'] as const
export class TsEnum<T extends readonly any[]> {
  private originalEnum: T = null

  /**
   * 创建 TsEnum 实例
   * @param param 二维数组 必须使用 as const 断言 转换成类型 
   * @type {[

    ['label1', 'value1', 'code1'],
    ['label2', 'value2', 'code2'],
   ]}
   */
  constructor(param: T) {
    // this._customKeys = keys
    this.originalEnum = param
  }

  private createEnum(key: 'label' | 'value' | 'code') {
    const result: {
      [k: string]: any
    } = {}

    this.originalEnum.map(item => {
      const _enum = { label: item[0], value: item[1], code: item[2] }
      result[_enum[key]] = _enum
    })

    return result as any
  }

  getOptions(): EnumOptions<T, typeof customKeys> {
    return this.originalEnum.map(item => ({ label: item[0], value: item[1], code: item[2] })) as any
  }

  getLabels(): KeyBy<T, typeof customKeys, 0> {
    return this.createEnum('label')
  }

  getValues(): KeyBy<T, typeof customKeys, 1> {
    return this.createEnum('value')
  }

  getCodes(): KeyBy<T, typeof customKeys, 2> {
    return this.createEnum('code')
  }

  // public get customKeys(): K {
  //   return this._customKeys
  // }
}
