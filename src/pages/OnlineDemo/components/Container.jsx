import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Checkbox, Input } from 'antd'
import Content from './Content'
import BrandPicker from './Picker'
import { updateQueries, queryBrands, startPolling, stopPolling } from '../actions'
import { allDimOptions as allOptions, defaultCheckedDimLabels } from '../config/dim'
import styles from './Container.module.scss'

const Container = ({ changeFilters, changeQuery, ...restProps}) => {
  const { fetchBrands, polling, endPolling } = restProps
  
  useEffect(() => {
    fetchBrands()
    polling()
    
    return () => {
      endPolling()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.Container}>
      {/* 品牌切换 */}
      <BrandPicker />
      {/* 搜索表单 */}
      <div className={styles.Container_Search}>
        <Checkbox.Group
          options={allOptions}
          defaultValue={defaultCheckedDimLabels}
          onChange={changeFilters}
        />
        <Input placeholder="search..." onPressEnter={e => changeQuery(e.target.value)} />
      </div>
      {/* 结果展示 */}
      <Content />
    </div>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  changeQuery: (query) => dispatch(updateQueries({ query })),
  changeFilters: (filters) => dispatch(updateQueries({ filters })),
  fetchBrands: () => dispatch(queryBrands()),
  polling: () => dispatch(startPolling()),
  endPolling: () => dispatch(stopPolling())
})

export default connect(mapStateToProps, mapDispatchToProps)(Container)

