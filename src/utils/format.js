/* eslint-disable no-unused-expressions */
/**
 * server + db 数据最小单元为空的情况
 * @param {*} val 
 */
export const isCellEmpty = val => [undefined, null, 'null', Infinity, ''].includes(val)

/**
 * percent/integer格式化
 * @param {*} num 需要格式化的参数
 * @param {*} format 格式化形式
 */
export const num2MatchedFormat = (num, format) => {
  if (isCellEmpty(num)) return '--'
  
  if (format === 'percent') {
    const { status, value } = num2RatioObj(num)
    return status === 'equal' ? '0.0%' : value
  }
  return num2LocalString(num)
}

/**
 * 数字格式化为小数点后一位，并添加百分号
 * @param num
 * @param fixedDecimal 保留小数点后几位
 * @returns {string}
 */
export const num2Ratio = (num, fixedDecimal = 1, showPercent = true) => {
  let value
  if (isNaN(num)) {
    value = null
  } else {
    value = (num * 100).toFixed(fixedDecimal)
  }
  return showPercent ? value + '%' : value
}

// pipeline管道
const formatToPercent = (val, fixedDecimal = 1, unit = '%') => val
  |> Math.abs
  |> (_ => _ * 100)
  |> (_ => _.toFixed(fixedDecimal))
  |> (_ => `${_}${unit}`)

/**
 * 用于处理带正负的小数，比如同比/环比，并返回数据状态
 * @param {*} num 需要处理的数据
 * @param {*} fixedDecimal 保留的小数位数
 */
export const num2RatioObj = (num, unit = '%', fixedDecimal = 1) => {
  if (isCellEmpty(num)) return '--'
  const number = Number(num)
  // do-expression + nullish-coalescing-operator
  const status = do {
    if (number > 0) { 'up' } 
    else if (number < 0) { 'down' }
    else if (number === 0) { 'equal' }
  } ?? 'empty'
  const isSmall = number !== 0 && Math.abs(number) < 0.001
  const formatVal = do { 
    if (status === 'empty') { '--' }
    else if (status === 'equal') { '持平' }
    else if (!['%', 'pp'].includes(unit)) { `${Math.abs(number)}${unit}` }
    else `${isSmall ? '约' : ''}${formatToPercent(isSmall ? 0.001 : number, fixedDecimal, unit)}`
  }
  return  {
    status,
    value: formatVal
  }
}

/**
 * 将数据5123123转换为5,123,123 类似于Number.prototype.toLocaleString的功能
 * @param {*} num 需要处理的数据
 */
export const num2LocalString = num => `${parseInt(num)}`.replace(/(?=(?!^)(?:\d{3})+(?:\.|$))(\d{3}(\.\d+$)?)/g, ',$1')

