/*
 * @Author: Qic
 * @Description: TsEnum  支持 类型推导 和 IDE智能提示（type inference & intellisense）
 */

const originalOptions = [
  ['未开始', 0, 'UNDO'],
  ['进行中', 1, 'DOING'],
  ['已结束', 2, 'DONE'],
] as const

type Loop<S extends readonly any[], Count extends any[] = []> = S extends readonly [infer A, ...infer B]
  ? Loop<B, [...Count, 1]>
  : Count['length']

/**
 * 泛型定义 :
 * 入参: 数组
 * 出参: 数组长度
 */
type LengthOfArray<T extends readonly any[]> = Loop<T>

/**
 * 泛型定义 : 类似 lodash keyby 的方法
 * 入参：
 *     L：数组长度
 *     T：原枚举数组
 *     I：枚举取值索引
 *     A：记录原数据长度的数组 类似[0,1,2]
 * 返回值：key 和 value 对象
 */
type KeyBy<
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

let arr: KeyBy<LengthOfArray<typeof originalOptions>, typeof originalOptions, 0>
export class TsEnum<T extends readonly any[]> {
  /**
   * 泛型定义 :
   *  L: label 标签
   *  V: value 值
   *  C: code 代码
   */
  constructor(parametersP: T) {}

  getLabels(): KeyBy<LengthOfArray<T>, T, 0> {
    const arr = null
    return arr as any
  }
  getValues(): KeyBy<LengthOfArray<T>, T, 1> {
    const arr = null
    return arr as any
  }
  getCodes(): KeyBy<LengthOfArray<T>, T, 2> {
    const arr = null
    return arr as any
  }
}

export function createEnum<T>(params: T): Readonly<T> {
  return params
}
/**
 * 泛型定义 : 将 TsEnum 入参的二维数组转换为 options 对象 数组
 * 入参：enum 二维数组
 * 返回值：options 数组
 */
type EnumOptions<T extends readonly any[], Count extends any[] = []> = T extends readonly [infer A, ...infer B]
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
