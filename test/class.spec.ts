import { TsEnum } from '../src/class'

const originalEnum = [
  ['未开始', 0, 'UNDO', true],
  ['进行中', 1, 'DOING', false],
] as const

describe('class type enum', () => {
  test('TsEnum: getOptions', () => {
    const tsenum = new TsEnum(originalEnum)

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
  test('TsEnum: getCodes', () => {
    const tsenum = new TsEnum(originalEnum)

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
  test('TsEnum: getValues', () => {
    const tsenum = new TsEnum(originalEnum)

    const values = tsenum.getValues()

    const sampleValues = {
      0: {
        label: '未开始',
        value: 0,
        code: 'UNDO',
      },
      1: {
        label: '进行中',
        value: 1,
        code: 'DOING',
      },
    }
    expect(values).toEqual(sampleValues)
  })
  test('TsEnum: getLabels', () => {
    const tsenum = new TsEnum(originalEnum)

    const labels = tsenum.getLabels()

    const sampleLabels = {
      未开始: {
        label: '未开始',
        value: 0,
        code: 'UNDO',
      },
      进行中: {
        label: '进行中',
        value: 1,
        code: 'DOING',
      },
    }
    expect(labels).toEqual(sampleLabels)
  })
})
