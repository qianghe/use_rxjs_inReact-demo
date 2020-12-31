import _ from 'lodash'
import { num2MatchedFormat } from 'src/utils/format'
import TrendUnit from '../components/Cells/TrendUnit'
import ItemInfo from '../components/Cells/ItemInfo'

// 基本信息
const renderInfo = (text, record) => {
  const {
    'upc_name': upcName,
    'upc_code': upcCode,
    'upc_pic': upcPic
  } = record
  const item = {
    img: upcPic,
    title: upcName,
    upc: upcCode
  }
  return (<ItemInfo item={item} />)
}


// 格式化text-unit
const renderMatchedType = (type, key) => {
  return (text, record, index) => {
    const value = _.get(record, key)
    if (type === 'ratio') return <TrendUnit value={value} />
    const formatText = num2MatchedFormat(value, type)
    return (
      <div className="rank-dynamic-dim">
        {type === 'money' ? <span className="money-icon">&yen;</span> : ''}
        <span>{formatText}</span>
      </div>
    )
  }
}

// render set map
const renderMap = {
  text: renderMatchedType,
  info: renderInfo
}

export default renderMap
