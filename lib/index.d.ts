declare type Loop<S extends readonly any[], Count extends any[] = []> = S extends readonly [infer A, ...infer B] ? Loop<B, [...Count, 1]> : Count["length"];
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
declare type LengthToArr<L extends number, T extends readonly any[] = [], A extends number[] = []> = LengthOfArray<A> extends L ? {
    [K in T[A[number]][0]]: T[K];
} : LengthToArr<L, T, [...A, LengthOfArray<A>]>;
export declare class TsEnum<T extends readonly any[]> {
    /**
     * 泛型定义 :
     *  L: label 标签
     *  V: value 值
     *  C: code 代码
     */
    constructor(parametersP: T);
    getLabels(): LengthToArr<LengthOfArray<T>, T>;
}
export {};
