/*
 * @Author: Qic
 * @Description: TsEnum  支持 类型推导 和 IDE智能提示（type inference & intellisense）
 */

export type Loop<S extends readonly any[], Count extends any[] = []> = S extends readonly [infer A, ...infer B]
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
 *     L：数组长度
 *     T：原枚举数组
 *     I：枚举取值索引
 *     A：记录原数据长度的数组 类似[0,1,2]
 * 返回值：key 和 value 对象
 */
export type KeyBy<
  L extends number,
  T extends readonly any[] = [],
  I extends number = 0,
  A extends number[] = [],
> = LengthOfArray<A> extends L
  ? {
      [K in A[number] as T[K][I]]: {
        label: T[K][0]
        value: T[K][1]
        code: T[K][2]
      }
    }
  : KeyBy<L, T, I, [...A, LengthOfArray<A>]>

/**
 * 泛型定义 : 将 TsEnum 入参的二维数组转换为 options 对象 数组
 * 入参：enum 二维数组
 * 返回值：options 数组
 */
export type EnumOptions<T extends readonly any[], Count extends any[] = []> = T extends readonly [infer A, ...infer B]
  ? A extends readonly any[]
    ? EnumOptions<
        B,
        [
          ...Count,
          {
            label: A[0]
            value: A[1]
          },
        ]
      >
    : never
  : Count

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
    this.originalEnum = param
  }

  getOptions(): EnumOptions<T> {
    return this.originalEnum.map(item => ({ label: item[0], value: item[1] })) as any
  }

  createEnum(key: 'label' | 'value' | 'code') {
    const result: {
      [k: string]: any
    } = {}

    this.originalEnum.map(item => {
      const _enum = { label: item[0], value: item[1], code: item[2] }
      result[_enum[key]] = _enum
    })

    return result as any
  }

  getLabels(): KeyBy<LengthOfArray<T>, T, 0> {
    return this.createEnum('label')
  }

  getValues(): KeyBy<LengthOfArray<T>, T, 1> {
    return this.createEnum('value')
  }

  getCodes(): KeyBy<LengthOfArray<T>, T, 2> {
    return this.createEnum('code')
  }
}
