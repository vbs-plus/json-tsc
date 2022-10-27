<p align="center">
<img src="https://raw.githubusercontent.com/imageList/imglist/master/logo.png" style="width:200px" />
<h1 align="center">JSON-TSC</h1>
<p align="center">A plugin that makes it easier to convert JSON to Typescript types.</p>
</p>
<p align="center">
<a href="https://www.npmjs.com/package/json-tsc"><img src="https://img.shields.io/npm/v/json-tsc?color=c95f8b&amp;label=" alt="NPM version"></a></p>
<p align="center">
<a href="https://onu.zyob.top/">🤹‍♂️ Preview</a>
</p>

## Features

- 🌈 Simple - Provides the easiest API to convert JSON into Typescript interaface.
- 🎉 Ts Supported - Support TypeScript & type checked & type inference.

## Usage

```bash
npm i json-tsc -D
```

Import `JSON_TSC` into the file you want to convert.

```ts
import { JSON_TSC } from "json-tsc";

const JSON_TEST = {
  "a": 0,
  "b": {
    "c": "string",
    "d": [1, 2, 3],
    "e": {
      "f": true,
      "g": null,
    },
  },
};

const json_tsc = new JSON_TSC({
  prependWithO: true,
  sortAlphabetically: false,
  prependExport: true,
  useArrayGeneric: false,
  optionalFields: false,
  prefix: "",
});

const result = json_tsc.transform(JSON_TEST);

// result
type JSON_TSC = ORootObject;
export interface ORootObject {
  a: number;
  b: OB;
}
export interface OB {
  c: string;
  d: number[];
  e: OE;
}
export interface OE {
  f: boolean;
  g: any;
}
```

## Config

```ts
export interface JSON_TSC_CONFIG {
  /** 
   * zh-CN: 是否在生成的类型前面加上 O
   * en: Whether to add O in front of the generated type
   */
  prependWithO: boolean
  /** 
   * zh-CN: 是否按照字母顺序排序
   * en: Whether to sort in alphabetical order
   */
  sortAlphabetically: boolean
  /** 
   * zh-CN: 是否在生成的类型前面加上 export
   * en: Whether to add export in front of the generated type
   */
  prependExport: boolean
  /** 
   * zh-CN: 是否使用 ''Array<T>'' 代替 ''T[]'
   * en: Whether to use ''Array<T>'' instead of ''T[]''
  */
  useArrayGeneric: boolean
  /** 
   * zh-CN: 是否将所有字段设置为可选
   * en: Whether to set all fields to optional
   */
  optionalFields: boolean
  /** 
   * zh-CN: 生成的类型前面的前缀
   * en: Prefix in front of generated type
   */
  prefix: string
  /** 
   * zh-CN: 生成的类型后面的后缀
   * en: Suffix behind generated type
   */
  rootObjectName: string
}

```

## [Use it Now]()

![image](https://raw.githubusercontent.com/imageList/imglist/master/20221027234023.png)


## Development

You can see the preview of the following commands:

```bash
npm run build
```

Then you can run playground to see the result.

```bash
npm run play
```

If you want start the dev server, you can run:

```bash
npm run dev
```



## License

[MIT](./LICENSE) License © 2022 [yzh990918](https://github.com/yzh990918)
