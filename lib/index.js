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
var originalOptions = [
    ["未开始", 0, "UNDO"],
    ["进行中", 1, "DOING"],
    ["已结束", 2, "DONE"],
];
var arr;
function traverseBuild(arr) {
    return arr;
}
var tsEnum = traverseBuild(originalOptions);
var lab = tsEnum.labels[0];
