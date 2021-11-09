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
const buildArrToObj = <L extends string, V extends number, C extends string>([
  label,
  value,
  code,
]: [L, V, C]): {
  label: L;
  value: V;
  code: C;
} => {
  return { label, value, code };
};

const tsEnum1 = buildArrToObj(["未开始", 0, "UNDO"]);
tsEnum1.label;

const traverseBuild = <L extends string, V extends number, C extends string>(
  arr: Array<[string, number, string]>
) => {
  return arr.map((item) => buildArrToObj(item));
};
const tsEnum = traverseBuild([
  ["未开始", 0, "UNDO"],
  ["进行中", 1, "DOING"],
  ["已结束", 2, "DONE"],
]);

tsEnum[0].label;
