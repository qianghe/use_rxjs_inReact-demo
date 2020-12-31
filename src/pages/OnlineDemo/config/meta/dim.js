// import Enumify from 'enumify'
import CateMetaData from './cate'

const SALE_CATE = CateMetaData.sale
const SUPPLY_CATE = CateMetaData.supply

/**
 * 元数据信息的描述
 */
class DimMetaData {
  // 销量
  static saleNum = new DimMetaData({
    id: 'sale_num',
    name: '销量',
    category: SALE_CATE,
    type: 'integer'
  })
  // 销量环比
  static saleNumLp = new DimMetaData({
    id: 'sale_num_lp',
    name: '销量环比',
    category: SALE_CATE,
    type: 'ratio'
  })
  // 销量占比
  static saleNumRate = new DimMetaData({
    id: 'sale_num_rate',
    name: '销量占比',
    category: SALE_CATE,
    type: 'percent'
  })
  // 销售额
  static gtv = new DimMetaData({
    id: 'gtv',
    name: '销售额',
    category: SALE_CATE,
    type: 'money'
  })
  // 销售额环比
  static gtvLp = new DimMetaData({
    id: 'gtv_lp',
    name: '销售额环比',
    category: SALE_CATE,
    type: 'ratio'
  })
  // 销售额占比
  static gtvRate = new DimMetaData({
    id: 'gtv_rate',
    name: '销售额占比',
    category: SALE_CATE,
    type: 'percent'
  })

  // 铺货省份数
  static supplyProCnt = new DimMetaData({
    id: 'supply_prov_cnt',
    name: '铺货省份数',
    category: SUPPLY_CATE,
    type: 'integer'
  })
  // 铺货城市数
  static supplyCityCnt = new DimMetaData({
    id: 'supply_city_cnt',
    name: '铺货城市数',
    category: SUPPLY_CATE,
    type: 'integer'
  })
  // 铺货店铺数
  static supplyPoiCnt = new DimMetaData({
    id: 'supply_poi_cnt',
    name: '铺货店铺数',
    category: SUPPLY_CATE,
    type: 'integer'
  })
  // 动销店铺数
  static tradePoiCnt = new DimMetaData({
    id: 'trade_poi_cnt',
    name: '动销店铺数',
    category: SUPPLY_CATE,
    type: 'integer'
  })
  // 售罄店铺数
  static saleOutPoiCnt = new DimMetaData({
    id: 'sale_out_poi_cnt',
    name: '售罄店铺数',
    category: SUPPLY_CATE,
    type: 'integer'
  })
  // 售罄率
  static saleOutRate = new DimMetaData({
    id: 'sale_out_rate',
    name: '售罄率',
    category: SUPPLY_CATE,
    type: 'percent'
  })

  constructor(options) {
    const {
      id,
      name,
      category,
      ...rest
    } = options
    this.id = id
    this.name = name
    this.category = category
    this.properties = rest
  }
}

export default DimMetaData
