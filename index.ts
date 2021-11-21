/*
 * @Author: Qic
 * @Description: TsEnum  支持 类型推导 和 IDE智能提示（type inference & intellisense）
 */

type Loop<
  S extends readonly any[],
  Count extends any[] = []
> = S extends readonly [infer A, ...infer B]
  ? Loop<B, [...Count, 1]>
  : Count["length"];

/**
 * 泛型定义 :
 * 入参: 数组
 * 出参: 数组长度
 */
type LengthOfArray<T extends readonly any[]> = Loop<T>;

/**
 * 泛型定义 :
 * 入参：数组长度
 * 返回值：0-n的数组
 */
type LengthToArr<
  L extends number,
  A extends number[] = []
> = LengthOfArray<A> extends L
  ? { [K in A[number]]: K }
  : LengthToArr<L, [...A, LengthOfArray<A>]>;

export class TsEnum<T extends readonly any[]> {
  /**
   * 泛型定义 :
   *  L: label 标签
   *  V: value 值
   *  C: code 代码
   */
  constructor(parametersP: T) {}

  getLabels(): {
    [k in keyof LengthToArr<LengthOfArray<T>>]: ReadonlyArray<
      T[k]
    > extends ReadonlyArray<infer L>
      ? L
      : never;
  } {
    const arr = null;
    return arr as any;
  }
}
