/**
 * 泛型定义 : 字符串首字母大写
 * @param 'string'
 * @return 'String'
 */
export type Capitalize<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : S

/**
 * 泛型定义 :
 * @param 数组
 * @return 数组长度
 */
export type LengthOfArray<S extends readonly any[], Count extends any[] = []> = S extends readonly [
  infer A,
  ...infer B,
]
  ? LengthOfArray<B, [...Count, 1]>
  : Count['length']

/**
 * 泛型定义 : 类似 lodash keyby 的方法
 * @param   T：原枚举数组
 * @param   I：枚举取值索引
 * @param   A：记录原数据长度的数组 类似[0, 1, 2]
 * @return key 和 value 对象
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
 * 泛型定义 : 获取索引数组
 * @param  T：原枚举数组
 * @return 记录原数据长度的数组 类似[0, 1, 2]
 */
export type IndexArray<
  T extends readonly any[],
  A extends number[] = [],
> = LengthOfArray<A> extends LengthOfArray<T> ? A : IndexArray<T, [...A, LengthOfArray<A>]>

/**
 * 泛型定义 : 获取 { label: index } 的对象
 * @param K labels 数组
 * @return 记录原数据长度的数组 类似 { label: 0, value: 1, code: 2 }
 */
export type IndexObject<
  K extends readonly string[],
  key extends string,
  A extends number[] = [],
> = LengthOfArray<A> extends LengthOfArray<K>
  ? {
      [_key in A[number] as K[_key]]: A[_key]
    }[key]
  : IndexObject<K, key, [...A, LengthOfArray<A>]>

/**
 * 泛型定义 : 将 TsEnum 入参的二维数组转换为 options 对象 数组
 * @param  enum 二维数组
 * @return options 数组
 */
export type EnumOptions<
  T extends readonly any[],
  K extends readonly string[],
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

export type TTsEnum<T extends readonly any[], K extends readonly string[]> = TTsEnumKeys<T, K> &
  TTsEnumStatic<T, K> &
  void

export type TTsEnumKeys<T extends readonly any[], K extends readonly string[]> = {
  [key in K[number] as `get${Capitalize<key>}s`]: () => KeyBy<
    T,
    IndexObject<K, key> extends number ? IndexObject<K, key> : never
  >
}

export type TTsEnumStatic<T extends readonly any[], K extends readonly string[]> = {
  getOptions: () => EnumOptions<T, K>
  originalEnum: T
  originalKeys: K
}

/**
 * 将常量字符串数组转换为枚举类型
 */
export type ArrayTypes<T extends readonly any[]> = T[number]

/**
 * 将 T 中的除了 K 的属性都转换为可选属性
 */
export type PartialWithout<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>
