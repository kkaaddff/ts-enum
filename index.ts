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

type NodeType = [string, number, string];

type buildArrToObj<L extends string, V extends number, C extends string> = {
  label: L;
  value: V;
  code: C;
};

// const tsEnum1 = buildArrToObj(["未开始", 0, "UNDO"]);
// tsEnum1.label;

type NodeType2 = ["label", "value", "code"];
let arr: Array<any>;
const traverseBuild = <L extends string, V extends number, C extends string>(
  arr: [L, V, C][]
): {
  [i in NodeType2[number]]: buildArrToObj<L, V, C>[i];
  // label: T[0];
}[] => {
  const res = arr.map((item) => buildArrToObj(item));
  return res;
};

const tsEnum = traverseBuild([
  ["未开始", 0, "UNDO"],
  ["进行中", 1, "DOING"],
  ["已结束", 2, "DONE"],
]);

tsEnum[0].label;

type If<N, S, R> = (<T>() => T extends N ? 1 : 2) extends <T>() => T extends S
  ? 1
  : 2
  ? R
  : never;

type GetReadonlyKeys<T> = Exclude<
  keyof T,
  {
    [K in keyof T]: If<{ [F in K]: T[F] }, { -readonly [F in K]: T[F] }, K>;
  }[keyof T]
>;
interface Todo {
  readonly title: string;
  description: string;
  completed: boolean;
}

type Keys = GetReadonlyKeys<Todo>; // expected to be "title" | "description"

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;
// your answers
type TupleToObject<T extends readonly any[]> = {
  [i in T[number]]: i;
};
let result: TupleToObject<typeof tuple>; // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
