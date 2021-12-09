# `ts-enum`

## [DEMO](https://codesandbox.io/embed/priceless-https-vv6my?fontsize=14&hidenavigation=1&theme=dark)

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

## 枚举值定义

**约定:** 枚举常量为二维数组（`[ label, value, code ]`）：

```json
[
  ["未开始", 0, "UNDO"],
  ["进行中", 1, "DOING"],
  ["已结束", 2, "DONE"]
]
```

需要使用借助 `typescript` 的 const 断言`const assertions`  
所以在 js 和 ts 中构建 enum 有一点差异，如下：

### in typescript

```ts
import { TsEnum } from 'type-enum'
/**
 * 枚举值定义
 * @param {array[]} 二维数组，[label, value, key]
 */
const workStatusEnum = new TsEnum([
  ['未开始', 0, 'UNDO'],
  ['进行中', 1, 'DOING'],
  ['已结束', 2, 'DONE'],
] as const) // 必须使用 as const ！！
```

### in javascript

最新的 typescript + vscode 已经支持采用 jsdoc 的方式 支持 `const assertions`  
`vs-code >= 1.63`
`typescript >= 4.5.2`

```js
import { TsEnum } from 'type-enum'

const WORK_STATUS = /** @type {const} */ ([
  ['未开始', 0, 'UNDO'],
  ['进行中', 1, 'DOING'],
  ['已结束', 2, 'DONE'],
])
/**
 * 枚举值定义
 * @param {array[]} 二维数组，[label, value, key]
 */
const workStatusEnum = new TsEnum(WORK_STATUS) // 必须使用 as const ！！
```

在旧版本中可以采用 `.d.ts` 补充类型提示

```js
// src/enum/enum.js
export const WORK_STATUS = [
  ["未开始", 0, "UNDO"],
  ["进行中", 1, "DOING"],
  ["已结束", 2, "DONE"],
];

// src/enum/enum.d.ts
export const WORK_STATUS = [
  ["未开始", 0, "UNDO"],
  ["进行中", 1, "DOING"],
  ["已结束", 2, "DONE"],
] as const;

// src/enum/index.js
import { TsEnum } from 'type-enum'
import { WORK_STATUS } from './enum'

const workStatusEnum = new TsEnum(WORK_STATUS)
```

```ts
/**
 * 下拉框数据：
 * 可以推导  options 类型
 *@type {[ { "label": "未开始", "value": "0" }, { "label": "进行中", "value": "1" }, { "label": "已结束", "value": "2" } ]}
 */
const options = workStatusEnum.options()

// 通过 key 获取 value：
const codes = workStatusEnum.getCodes()

codes.DOING.label // IDE 自动推导出 label is '进行中'
codes.DOING.value // IDE 自动推导出 value is 1
```
