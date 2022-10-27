export interface JSON_TSC_CONFIG {
  /** 以 O 开头 */
  prependWithO: boolean
  /** 按字母排序 */
  sortAlphabetically: boolean
  /** 添加导出开头 */
  prependExport: boolean
  /** 使用 Array<any> 代替 any[] */
  useArrayGeneric: boolean
  /** 可选参数 */
  optionalFields: boolean
  /** 前缀 */
  prefix: string
  /** 顶部 Object Name */
  rootObjectName: string
}

export type JSON_TSC_CONFIG_TYPE = Partial<JSON_TSC_CONFIG>
