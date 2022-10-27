import { describe, expect, test } from 'vitest'
import { JSON_TSC } from 'json-tsc'

const JSON_TEST = {
  BigIntSupported: 99581589,
  date: '20180322',
  message: 'Success !',
  status: 200,
  city: '北京',
  count: 632,
  data: {
    shidu: '34%',
    pm25: 73,
    pm10: 91,
    quality: '良',
    wendu: '5',
    ganmao: '极少数敏感人群应减少户外活动',
    yesterday: {
      date: '21日星期三',
      sunrise: '06:19',
      high: '高温 11.0℃',
      low: '低温 1.0℃',
      sunset: '18:26',
      aqi: 85,
      fx: '南风',
      fl: '<3级',
      type: '多云',
      notice: '阴晴之间，谨防紫外线侵扰',
    },
    forecast: [
      {
        date: '22日星期四',
        sunrise: '06:17',
        high: '高温 17.0℃',
        low: '低温 1.0℃',
        sunset: '18:27',
        aqi: 98,
        fx: '西南风',
        fl: '<3级',
        type: '晴',
        notice: '愿你拥有比阳光明媚的心情',
      },
    ],
  },
}

describe('json-tsc transform', () => {
  test('show work with default config', () => {
    const json_tsc = new JSON_TSC({
      prependWithO: true,
      sortAlphabetically: false,
      prependExport: true,
      useArrayGeneric: false,
      optionalFields: false,
      prefix: '',
    })

    const result = json_tsc.transform(JSON_TEST)

    expect(result).toMatchSnapshot()
  })

  test('show work with custom config', () => {
    const json_tsc = new JSON_TSC({
      prependWithO: true,
      sortAlphabetically: true,
      prependExport: false,
      useArrayGeneric: true,
      optionalFields: true,
      prefix: 'TEST',
    })
    const result = json_tsc.transform(JSON_TEST)

    expect(result).toMatchSnapshot()
  })
})
