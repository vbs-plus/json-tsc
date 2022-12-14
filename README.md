<p align="center">
<img src="https://raw.githubusercontent.com/imageList/imglist/master/logo.png" style="width:200px" />
<h1 align="center">JSON-TSC</h1>
<p align="center">A plugin that makes it easier to convert JSON to Typescript types.</p>
</p>
<p align="center">
<a href="https://www.npmjs.com/package/json-tsc"><img src="https://img.shields.io/npm/v/json-tsc?color=c95f8b&amp;label=" alt="NPM version"></a></p>
<p align="center">
<a href="https://json-tsc.netlify.app/#/">π€ΉββοΈ Preview</a>
</p>

## Features

- π Simple - Provides the easiest API to convert JSON into Typescript interaface.
- π Ts Supported - Support TypeScript & type checked & type inference.

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
   * zh-CN: ζ―ε¦ε¨ηζηη±»εει’ε δΈ O
   * en: Whether to add O in front of the generated type
   */
  prependWithO: boolean
  /** 
   * zh-CN: ζ―ε¦ζη§ε­ζ―ι‘ΊεΊζεΊ
   * en: Whether to sort in alphabetical order
   */
  sortAlphabetically: boolean
  /** 
   * zh-CN: ζ―ε¦ε¨ηζηη±»εει’ε δΈ export
   * en: Whether to add export in front of the generated type
   */
  prependExport: boolean
  /** 
   * zh-CN: ζ―ε¦δ½Ώη¨ ''Array<T>'' δ»£ζΏ ''T[]'
   * en: Whether to use ''Array<T>'' instead of ''T[]''
  */
  useArrayGeneric: boolean
  /** 
   * zh-CN: ζ―ε¦ε°ζζε­ζ?΅θ?Ύη½?δΈΊε―ι
   * en: Whether to set all fields to optional
   */
  optionalFields: boolean
  /** 
   * zh-CN: ηζηη±»εει’ηεηΌ
   * en: Prefix in front of generated type
   */
  prefix: string
  /** 
   * zh-CN: ηζηη±»εει’ηεηΌ
   * en: Suffix behind generated type
   */
  rootObjectName: string
}

```

## [Use it Now](https://json-tsc.netlify.app/#/)

<img width="1713" alt="image" src="https://user-images.githubusercontent.com/46418596/206120026-f591d280-0ec8-4e1e-8237-2faecfa1bec7.png">


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

[MIT](./LICENSE) License Β© 2022 [yzh990918](https://github.com/yzh990918)
