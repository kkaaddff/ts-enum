/*
 * @Author: Qic
 * @Description: TsEnum  支持 类型推导 和 IDE智能提示（type inference & intellisense）
 */
/**
 * 泛型定义 :
 *  L: label 标签
 *  V: value 值
 *  C: code 代码
 */

const originalOptions = [
  ["未开始", 0, "UNDO"],
  ["进行中", 1, "DOING"],
  ["已结束", 2, "DONE"],
] as const;

/**
 * 泛型定义 :
 * 入参: 数组
 * 出参: 数组长度
 */
type LengthOfArray<T extends readonly any[]> = Loop<T>;
type Loop<
  S extends readonly any[],
  Count extends any[] = []
> = S extends readonly [infer A, ...infer B]
  ? Loop<B, [...Count, 1]>
  : Count["length"];

/**
 * 泛型定义 :
 * 入参：数组长度
 * 返回值：0-n的数组
 */
type LengthToArr<
  L extends number,
  Arr extends number[] = []
> = LengthOfArray<Arr> extends L
  ? Arr
  : LengthToArr<L, [...Arr, LengthOfArray<Arr>]>;

function traverseBuild<T extends readonly any[], Index extends number = 0>(
  arr: T
): {
  key: T;
  length: LengthToArr<LengthOfArray<T>>;
  // labels: UnwrapRef<T>;
  labels: {
    [K in keyof [1, 2, 3]]: ReadonlyArray<T[K]> extends ReadonlyArray<infer L>
      ? L
      : never;
  };
} {
  return arr as any;
}

const tsEnum = traverseBuild(originalOptions);
const lab = tsEnum.labels;

// 递归地获取嵌套数据的类型
// Recursively unwraps nested value bindings.
// 如果是数组，循环解套
export type UnwrapRef<T> = T extends Array<infer V> ? Array<UnwrapRef<V>> : T;
const tsEnum1 = null as UnwrapRef<typeof originalOptions>;
const lab1 = tsEnum1[1][2];
