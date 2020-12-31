import _ from 'lodash'
import { tabelDimProperties } from './dim'
import renderMap from './render'

const baseColumns = [{
  title: '排名',
  dataIndex: 'rn',
  key: 'rn',
  align: 'center'
}, {
  title: '商品名称',
  key: 'info',
  render: renderMap['info'],
  align: 'center'
}]

const dynamicColumns = tabelDimProperties.map(dim => {
  const { label: title, value: key, type } = dim
  return ({
    title,
    key,
    render: renderMap['text'](type, key),
    align: 'center',
    sorter: true
  })
})

/**
 * 根据dims纬度的长度来适配其他col的宽度
 * @param {Number} 动态dim的长度
 * @return {Array} 基本col的宽度配置
 */
const getBaseColsWidthByDynamicCount = count => {
  let widths = []
  switch (count) {
    case 1:
    case 2:
      widths = [115, 570, 225]
      break
    case 3:
    case 4:
      widths = [92, 370, 130]
      break
    default:
      widths = [70, 290, 100]
  }
  return widths
}


/**
 * 对当前的columns合并需要的sort信息
 *
 * @param {Array} merged 合并后的columns
 * @param {Object} sort sort信息
 * @param {String} sort.sortField 排序指定的col列
 * @param {String} sort.sortType 排序的类型asc,desc
 * @return 组合sort信息的columns
 */
const mergeSortInfo = (merged, { sortField, sortType }) => {
  if (sortField && sortType) {
    const matchedColIndex = merged.findIndex(col => col.key === sortField)
    const matchedCol = merged[matchedColIndex]
    if (matchedColIndex !== -1 && sortType !== matchedCol.sortType) {
      merged[matchedColIndex] = _.merge({}, matchedCol, {
        sortType
      })
    }
  }
  return merged
}

const dynamicPropertyInsertIndex = 2

// TODO: 借鉴useMemo进行优化
/**
 * 根据动态dims和动态col插入的位置，获取最后的table columns的配置
 * 其中结果值缓存一次，为了降低不必要的计算
 * @param {Array} dims 用户选择的动态dim的value集合
 * @return {Arrray} table columns
 */
const cacheMemo = {
  key: null,
  value: null
}

export const getMemoMergedColumns = (dims, sort) => {
  const { key: cacheKey, value: cacheValue } = cacheMemo
  // sort.sortField为空时表示清空，此时重新渲染table
  if (sort.sortField && cacheKey && (cacheKey === dims.join(''))) {
    return mergeSortInfo(cacheValue, sort)
  }
  const filterDynamicCols = dims.map(dimKey => dynamicColumns.find(({ key }) => dimKey === key))
  const baseColStyles = getBaseColsWidthByDynamicCount(dims.length)
  const styledBaseCols = baseColumns.map((col, index) => {
    col.width = baseColStyles[index]
    return col
  })
  let merged = _.concat(
    styledBaseCols.slice(0, dynamicPropertyInsertIndex),
    filterDynamicCols,
    styledBaseCols.slice(dynamicPropertyInsertIndex, baseColumns.length)
  )
  merged = mergeSortInfo(merged, sort)
  cacheMemo.key = dims.join('')
  cacheMemo.value = merged
  return merged
}