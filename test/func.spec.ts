import { createTsEnum, createCustomEnum } from '../src/func'

const originalEnum = [
  ['未开始', 0, 'UNDO'],
  ['进行中', 1, 'DOING'],
] as const

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

  test('createCustomEnum: invaild keys', () => {
    const invaildKeys = ['label', 'value', 'code', 'option'] as const

    expect(() => {
      const tsenum = createCustomEnum(originalEnum, invaildKeys)
    }).toThrow('keys 不可以包含 originalEnum, originalKeys, option')
  })
})
