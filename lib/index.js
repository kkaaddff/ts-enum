"use strict";
/*
 * @Author: Qic
 * @Description: TsEnum  支持 类型推导 和 IDE智能提示（type inference & intellisense）
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsEnum = void 0;
var originalOptions = [
    ['未开始', 0, 'UNDO'],
    ['进行中', 1, 'DOING'],
    ['已结束', 2, 'DONE'],
];
var arr;
var TsEnum = /** @class */ (function () {
    /**
     * 泛型定义 :
     *  L: label 标签
     *  V: value 值
     *  C: code 代码
     */
    function TsEnum(parametersP) {
    }
    TsEnum.prototype.getLabels = function () {
        var arr = null;
        return arr;
    };
    TsEnum.prototype.getValues = function () {
        var arr = null;
        return arr;
    };
    TsEnum.prototype.getCodes = function () {
        var arr = null;
        return arr;
    };
    return TsEnum;
}());
exports.TsEnum = TsEnum;
