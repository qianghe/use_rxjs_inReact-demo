import React from 'react'
import classNames from 'classnames'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { num2RatioObj } from 'src/utils/format'
import './TrendUnit.scss'

const iconStyle = {
  fontSize: 16
}

const TrendUnit = ({ value }) => {
  const item = num2RatioObj(value, '%'  )
  return (
    <span className={
      classNames(['trend-unit', `trend-unit--${item.status}`])
    }>
      {
        item.status === 'up' ? <ArrowUpOutlined style={iconStyle} /> : (
          item.status === 'down' ? <ArrowDownOutlined style={iconStyle} /> : ''
        )
      }
      <span className="trend-unit-value">{ item.value || '--' }</span>
    </span>
  )
}

export default TrendUnit