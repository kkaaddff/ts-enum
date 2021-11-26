# `ts-enum`

## **问题 | Motivation**

在 `ts/js` 的前端中后台项目中存在大量的枚举值，需要在各种地方引用！  
因为`js`没有类型系统 `ts`的`enum`类型没有很强大的`api`，导致在很多情况下在各业务代码之间引用枚举时不知道此枚举的期望值是多少，可读性和`CR`体验很差

## 做了什么

基于业务场景，锻炼了类型体操

- 借助 ts 类型系统，获得枚举值的 IDE 提示
- 改善开发体验
- 工具类库

## 安装

```bash
$ npm install type-enum
```

枚举值定义

```js
import { TsEnum } from 'type-enum'

/**
 * 枚举值定义
 * @param {array[]} 二维数组，[label, value, key]
 */
const tsenum = new TsEnum([
  ['未开始', 0, 'UNDO'],
  ['进行中', 1, 'DOING'],
  ['已结束', 2, 'DONE'],
] as const) // 或 JsEnum.of(Array) 也可以

// 下拉框数据：
console.log(tsenum.options()) // [ { "label": "未开始", "value": "0" }, { "label": "进行中", "value": "1" }, { "label": "已结束", "value": "2" } ]

// 通过 key 获取 value：
const codes = tsenum.getCodes()
console.log(codes)
codes.DOING.label // 进行中
codes.DOING.value // 1

```

## VUE/js 项目添加`typescript`支持

- 项目安装`typescript`依赖 yarn add typescript -D
- 项目 root 目录下新建配置文件`tsconfig.json` 配置如下：

```json
{
  "compilerOptions": {
    "allowJs": true, // 允许 ts server 校验 js 文件
    "baseUrl": ".", //项目的根路径
    "paths": {
      "src/*": ["src/*"] //设置项目中配置的 webpack 别名（alias）具体配置视项目而定
    }
  },
  "exclude": ["node_modules", "dist"], // 排除校验的文件目录
  "include": ["src/"] //需要校验的文件目录
}
```
