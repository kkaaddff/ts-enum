/**
 * 泛型定义 :
 *  L: label 标签
 *  V: value 值
 *  C: code 代码
 */
declare const originalOptions: readonly [
  readonly ["未开始", 0, "UNDO"],
  readonly ["进行中", 1, "DOING"],
  readonly ["已结束", 2, "DONE"]
];
declare type Loop<
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
declare type LengthOfArray<T extends readonly any[]> = Loop<T>;
/**
 * 泛型定义 :
 * 入参：数组长度
 * 返回值：0-n的数组
 */
declare type LengthToArr<
  L extends number,
  A extends number[] = [],
  Obj extends {
    [K: number]: number;
  } = {}
> = LengthOfArray<A> extends L
  ? {
      [K in A[number]]: K;
    }
  : LengthToArr<L, [...A, LengthOfArray<A>]>;
declare let arr: LengthToArr<5>;
declare function traverseBuild<T extends readonly any[]>(
  arr: T
): {
  key: T;
  length: LengthToArr<LengthOfArray<T>>;
  labels: {
    [k in keyof LengthToArr<LengthOfArray<T>>]: ReadonlyArray<
      T[k]
    > extends ReadonlyArray<infer L>
      ? L
      : never;
  };
};
declare const tsEnum: {
  key: readonly [
    readonly ["未开始", 0, "UNDO"],
    readonly ["进行中", 1, "DOING"],
    readonly ["已结束", 2, "DONE"]
  ];
  length: {
    0: 0;
    1: 1;
    2: 2;
  };
  labels: {
    0: readonly ["未开始", 0, "UNDO"];
    1: readonly ["进行中", 1, "DOING"];
    2: readonly ["已结束", 2, "DONE"];
  };
};
declare const lab: readonly ["未开始", 0, "UNDO"];
