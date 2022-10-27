import type { JSON_TSC_CONFIG, JSON_TSC_CONFIG_TYPE } from './type'

export class JSON_TSC {
  private config: JSON_TSC_CONFIG
  private interfaces: Record<string, Record<string, string>> = {}
  private result = ''

  constructor(config: JSON_TSC_CONFIG_TYPE = {}) {
    this.config = {
      prependWithO: true,
      sortAlphabetically: false,
      prependExport: true,
      useArrayGeneric: false,
      optionalFields: false,
      prefix: '',
      rootObjectName: 'RootObject',
      ...config,
    }
  }

  public transform(json: {}) {
    this.interfaces = {}
    this.result = `type JSON_TSC = ${this.transformUnknowType(json)}\n\n`

    this.result += this.interfacesToString()
    return this.result
  }

  private transformUnknowType(target: {}, key: string | undefined = undefined) {
    let type: string = typeof target
    if (type === 'object') {
      if (Array.isArray(target))
        type = this.transformArray(target, key)
      else
        type = this.transformObject(target, key && this.capitalizeFirst(key))
    }
    return type
  }

  private transformArray(target: Record<string, Record<string, string>>[], key: string | undefined) {
    let type = target.length ? undefined : 'any'
    for (const item of target) {
      // 寻找 Array 的 JSON Key
      const itemType = this.transformUnknowType(item, this.keyToTypeName(key))

      if (type && itemType !== type) {
        type = 'any'
        break
      } else {
        type = itemType
      }
    }
    return this.config.useArrayGeneric ? `Array<${type}>` : `${type}[]`
  }

  private transformObject(obj: Record<string, Record<string, string>>, type: string = this.config.rootObjectName) {
    if (obj === null)
      return 'any'

    const { prependWithO, prefix } = this.config

    if (prependWithO)
      type = `O${prefix || ''}${type}`

    if (!this.interfaces[type])
      this.interfaces[type] = {}

    const interfaceName = this.interfaces[type]

    Object.keys(obj).forEach((key) => {
      const value = obj[key]
      const fieldType = this.transformUnknowType(value, key)
      /** 这里就是递归到最后的基础类型 */
      if (!interfaceName[key] || interfaceName[key].indexOf('any') === 0)
        interfaceName[key] = fieldType
    })
    return type
  }

  /** 转为驼峰首字母大写 */
  private keyToTypeName(key: string | undefined) {
    if (!key || key.length < 2)
      return key

    const [first, ...rest]: string[] = Array.prototype.slice.apply(key)
    const last = rest.pop()
    return [first.toUpperCase(), ...rest, last === 's' ? '' : last].join('')
  }

  private capitalizeFirst(str: string) {
    const [first, ...rest]: string[] = Array.prototype.slice.apply(str)
    return [first.toUpperCase(), ...rest].join('')
  }

  private interfacesToString() {
    const { sortAlphabetically, prependExport, optionalFields } = this.config
    return Object.keys(this.interfaces).map((name) => {
      const interfaceStr = [`${prependExport ? 'export ' : ''}interface ${name} {`]
      const fields = Object.keys(this.interfaces[name])
      if (sortAlphabetically)
        fields.sort()

      fields
        .forEach((field) => {
          const type = this.interfaces[name][field]
          interfaceStr.push(`  ${field}${optionalFields ? '?' : ''}: ${type};`)
        })
      interfaceStr.push('}\n')
      return interfaceStr.join('\n')
    }).join('\n')
  }
}
