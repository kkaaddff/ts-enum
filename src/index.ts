/*
 * @Author: Qic
 * @Description: TsEnum 支持 类型推导 和 IDE智能提示（type inference & intellisense）
 */

export type Loop<S extends readonly any[], Count extends any[] = []> = S extends readonly [
  infer A,
  ...infer B
]
  ? Loop<B, [...Count, 1]>
  : Count['length']

/**
 * 泛型定义 :
 * 入参: 数组
 * 出参: 数组长度
 */
export type LengthOfArray<T extends readonly any[]> = Loop<T>

/**
 * 泛型定义 : 类似 lodash keyby 的方法
 * 入参：
 *     T：原枚举数组
 *     I：枚举取值索引
 *     A：记录原数据长度的数组 类似[0, 1, 2]
 * 返回值：key 和 value 对象
 */
export type KeyBy<
  T extends readonly any[],
  I extends number,
  A extends number[] = IndexArray<T>,
> = {
  [key in A[number] as T[key][I]]: {
    label: T[key][0]
    value: T[key][1]
    code: T[key][2]
  }
}
/**
 * 泛型定义 : 类似 lodash keyby 的方法
 * 入参：
 *     T：原枚举数组
 *     A：记录原数据长度的数组 类似[0, 1, 2]
 * 返回值：key 和 value 对象
 */
export type IndexArray<
  T extends readonly any[],
  A extends number[] = [],
> = LengthOfArray<A> extends LengthOfArray<T> ? A : IndexArray<T, [...A, LengthOfArray<A>]>

/**
 * 泛型定义 : 类似 lodash keyby 的方法
 * 入参：
 *     L：数组长度
 *     T：原枚举数组
 *     I：枚举取值索引
 *     A：记录原数据长度的数组 类似[0,1,2]
 * 返回值：key 和 value 对象
 */
export type ArrayToObject<
  L extends readonly any[],
  K extends readonly any[],
  V extends readonly any[],
  O extends { [key: string]: any } = {},
> = K extends readonly [infer K1, ...infer K2]
  ? K1 extends symbol | string | number
    ? ArrayToObject<K2, V2, V>
    : never
  : O

/**
 * 泛型定义 : 将 TsEnum 入参的二维数组转换为 options 对象 数组
 * 入参：enum 二维数组
 * 返回值：options 数组
 */
export type EnumOptions<
  T extends readonly any[] = [],
  K extends readonly string[] = [],
  R extends any[] = [],
> = LengthOfArray<R> extends LengthOfArray<K>
  ? R
  : EnumOptions<
      T,
      K,
      [
        ...R,
        ArrayToObject<K, T[LengthOfArray<R>]>,
        // {
        //   [key in K[number]]: T[LengthOfArray<R>]
        // },
      ]
    >

export class TsEnum<T extends readonly any[], K extends readonly string[]> {
  private originalEnum: T = null
  private _customKeys: K = null

  /**
   * 创建 TsEnum 实例
   * @param param 二维数组 必须使用 as const 断言 转换成类型 
   * @type {[

    ['label1', 'value1', 'code1'],
    ['label2', 'value2', 'code2'],
   ]}
   */
  constructor(param: T, keys: K) {
    this._customKeys = keys
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

  getOptions(): EnumOptions<T, K> {
    return this.originalEnum.map(item => ({ label: item[0], value: item[1] })) as any
  }

  getLabels(): KeyBy<T, 0> {
    return this.createEnum('label')
  }

  getValues(): KeyBy<T, 1> {
    return this.createEnum('value')
  }

  getCodes(): KeyBy<T, 2> {
    return this.createEnum('code')
  }

  public get customKeys(): K {
    return this._customKeys
  }
}
