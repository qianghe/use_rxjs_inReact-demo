// checkbox options
import _ from 'lodash'
import DimMetaData from './meta/dim'

const getPickDims = dims => dims.map(({
  dim,
  checked = false,
  type,
  tooltip
}) => {
  const { properties, name, id } = dim
  return ({
    label: name,
    value: id,
    type: properties.type || 'integer',
    checked,
    ...tooltip ? {
      tooltip
    } : {}
  })
})

// 销售指标
const sortedSaleDims = [{
  dim: DimMetaData.saleNum,
  checked: true
}, {
  dim: DimMetaData.saleNumRate,
  checked: false
}, {
  dim: DimMetaData.saleNumLp,
  checked: false
}, {
  dim: DimMetaData.gtv,
  checked: true
}, {
  dim: DimMetaData.gtvRate,
  checked: false
}, {
  dim: DimMetaData.gtvLp,
  checked: false
}]

// 铺货指标
const sortedSupplyDims = [{
  dim: DimMetaData.supplyProCnt,
  checked: false,
  tooltip: {
    content: '$global.$tips.online_province_nums'
  }
}, {
  dim: DimMetaData.supplyCityCnt,
  checked: false,
  tooltip: {
    content: '$global.$tips.online_city_nums'
  }
}, {
  dim: DimMetaData.supplyPoiCnt,
  checked: true,
  tooltip: {
    content: '$global.$tips.upc_online_shop_nums'
  }
}, {
  dim: DimMetaData.tradePoiCnt,
  checked: false,
  tooltip: {
    content: '$global.$tips.upc_sale_poi_nums'
  }
}, {
  dim: DimMetaData.saleOutPoiCnt,
  checked: true,
  tooltip: {
    content: '$global.$tips.upc_sellout_nums'
  }
}, {
  dim: DimMetaData.saleOutRate,
  checked: false,
  tooltip: {
    content: '$global.$tips.upc_sellout_rate'
  }
}]

const saleDims = getPickDims(sortedSaleDims)
const supplyDims = getPickDims(sortedSupplyDims)

export const allDimOptions = saleDims.concat(supplyDims)
const defaultCheckedDims = allDimOptions.filter(({ checked }) => checked)
const pickDimsWithProperties = (dims, properties, flatten = false) => dims.map(dim => flatten ? _.get(dim, properties) : _.pick(dim, properties))

// 默认选中的指标
export const defaultCheckedDimLabels = pickDimsWithProperties(defaultCheckedDims, ['value'], true)

// 所有的指标
export const defaultDimLabels = pickDimsWithProperties(allDimOptions, ['label'], true)

// table相关
export const tabelDimProperties = pickDimsWithProperties(allDimOptions, ['value', 'label', 'type'])
