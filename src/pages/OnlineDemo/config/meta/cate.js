// import Enumify from 'enumify'

/**
 * 元数据——类别信息的描述
 */
class CateMetaData {
  // 销售指标
  static sale = new CateMetaData({
    id: 'sale',
    name: '销售'
  })
  // 铺货指标
  static supply = new CateMetaData({
    id: 'supply',
    name: '铺货'
  })

  constructor(options) {
    const {
      name = 'xx', id = ''
    } = options
    this.id = id
    this.name = name
  }
}

export default CateMetaData
