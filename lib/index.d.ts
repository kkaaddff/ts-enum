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
/**
 * 泛型定义 :
 * 入参: 数组
 * 出参: 数组长度
 */
declare type LengthOfArray<T extends readonly any[]> = Loop<T>;
declare type Loop<
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
declare type LengthToArr<
  L extends number,
  Arr extends number[] = []
> = LengthOfArray<Arr> extends L
  ? Arr
  : LengthToArr<L, [...Arr, LengthOfArray<Arr>]>;
declare type TupleToObject<T extends number[]> = {
  [K in T[number]]: K;
};
declare function traverseBuild<T extends readonly any[]>(
  arr: T
): {
  key: T;
  length: LengthToArr<LengthOfArray<T>>;
  tuple: TupleToObject<LengthToArr<LengthOfArray<T>>>;
  labels: {
    [K in keyof TupleToObject<LengthToArr<LengthOfArray<T>>>]: ReadonlyArray<
      T[K]
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
  length: any;
  tuple: TupleToObject<any>;
  labels: {
    [x: string]: unknown;
  };
};
declare const lab: {
  [x: string]: unknown;
};
