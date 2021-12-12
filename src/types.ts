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
 * 返回值：记录原数据长度的数组 类似[0, 1, 2]
 */
export type IndexArray<
  T extends readonly any[],
  A extends number[] = [],
> = LengthOfArray<A> extends LengthOfArray<T> ? A : IndexArray<T, [...A, LengthOfArray<A>]>

/**
 * 泛型定义 : 将 TsEnum 入参的二维数组转换为 options 对象 数组
 * 入参：enum 二维数组
 * 返回值：options 数组
 */
export type EnumOptions<
  T extends readonly any[] = [],
  K extends readonly string[] = [],
  R extends any[] = [],
> = LengthOfArray<R> extends LengthOfArray<T>
  ? R
  : EnumOptions<
      T,
      K,
      [
        ...R,
        IndexArray<K> extends number[]
          ? { [key in IndexArray<K>[number] as K[key]]: T[LengthOfArray<R>][key] }
          : never,
      ]
    >

export type Capitalize<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : S
