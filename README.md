# `ts-enum`

- 借助 ts 类型系统，获得枚举值的 IDE 提示
- 改善开发体验
- 工具类库

  枚举值定义

```js
import { TsEnum } from 'TsEnum' //私有库

/**
 * 枚举值定义
 * @param {array[]} 二维数组，[label, value, key]
 */
const STATUS = new TsEnum([
  ['未开始', 0, 'UNDO'],
  ['进行中', 1, 'DOING'],
  ['已结束', 2, 'DONE'],
] as const) // 或 JsEnum.of(Array) 也可以

// 下拉框数据：
console.log(STATUS.options()) // [ { "label": "未开始", "value": "0" }, { "label": "进行中", "value": "1" }, { "label": "已结束", "value": "2" } ]

// 通过 key 获取 value：
const codes = STATUS.codes
console.log(codes.UNDO) // 0
console.log(codes.DOING) // 1
console.log(codes.DONE) // 2

// 通过 value 获取 label：
const labels = STATUS.labels
console.log(labels[0]) // 未开始
console.log(labels[1]) // 进行中
console.log(labels[2]) // 已结束

// 获取枚举定义中所有的 value 值
console.log(STATUS.values) // [0,1,2]

// 获取枚举定义中所有的 key 值
console.log(STATUS.keys) // ['UNDO', 'DOING', 'DONE']
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
