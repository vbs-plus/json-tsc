import prettier from 'prettier'
import prettierJson from 'prettier/parser-babel'
import prettierTs from 'prettier/parser-typescript'

export const usePrettier = (code: string) => {
  return prettier.format(code, {
    parser: 'json-stringify',
    plugins: [prettierJson],
    singleQuote: true,
    semi: false,
  })
}

export const useTsPrettier = (code: string) => {
  return prettier.format(code, {
    parser: 'typescript',
    plugins: [prettierTs],
    singleQuote: true,
    semi: false,
  })
}
