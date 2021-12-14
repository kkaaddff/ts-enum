import { createTsEnum, createCustomEnum } from '../src/index.func'

const originalEnum = [
  ['未开始', 0, 'UNDO'],
  ['进行中', 1, 'DOING'],
] as const

const originalKeys = ['label', 'value', 'code', 'option'] as const

describe('function type enum', () => {
  test('createTsEnum: getOptions', () => {
    const tsenum = createTsEnum(originalEnum)

    const sampleOptions = [
      {
        label: '未开始',
        value: 0,
        code: 'UNDO',
      },
      {
        label: '进行中',
        value: 1,
        code: 'DOING',
      },
    ]

    const options = tsenum.getOptions()
    expect(options).toEqual(sampleOptions)
  })
  test('createTsEnum: getCodes', () => {
    const tsenum = createTsEnum(originalEnum)

    const codes = tsenum.getCodes()

    const sampleCodes = {
      UNDO: {
        label: '未开始',
        value: 0,
        code: 'UNDO',
      },
      DOING: {
        label: '进行中',
        value: 1,
        code: 'DOING',
      },
    }
    expect(codes).toEqual(sampleCodes)
  })

  // test('object assignment', () => {
  //   const data = { one: 1 }
  //   data['two'] = 2
  // })
})
