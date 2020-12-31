import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Table, Pagination } from 'antd'
import { updateQueries } from '../actions'
import { getMemoMergedColumns } from '../config'
import styles from './Content.module.scss'

const TableContent = ({
  changePagination,
  changeSorter,
  ...restProps
}) => {
  const { pager, productInfo } = restProps
  const { total, list, loading, error } = productInfo
  const { pageNum: current, pageSize } = pager

  // 根据filters计算columns
  const columns = useMemo( 
    () => getMemoMergedColumns(restProps.filters, restProps.sorter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [restProps.filters]
  )
  
  // 更新query查询
  const handleSorterChange = (pagination, filters, sorter, extra) => {
    const { columnKey, order } = sorter
    changeSorter({
      sortKey: columnKey,
      sortOrder: order?.replace('end', '') ?? 'desc'
    })
  }
   
  return (
    <div className={styles.Content}>
      {/* 表格 */}
      {
        _.isEmpty(list) ? (
          <p className={styles.Content_Empty}>
            {error ? <span style={{ color: '#999' }}>网络异常，稍后在试～</span> : '数据暂无'}
          </p> 
        ) : <Table
          dataSource={list}
          columns={columns}
          loading={loading}
          scroll={{
            y: 300
          }}
          pagination={false}
          showSorterTooltip={false}
          onChange={handleSorterChange}
        />
      }
      {/* 分页 */}
      {
        total > 0 ? <Pagination
          current={current}
          pageSize={pageSize}
          total={total}
          showSizeChanger
          showQuickJumper
          showTotal={total => `共 ${total} 条`}
          onChange={(page, pageSize) => changePagination({
            pageNum: page,
            pageSize
          })}
        /> : ''
      }
    </div>
  )
}

const mapStateToProps = ({ queries, products }) => ({
  pager: queries.pager,
  filters: queries.filters,
  sorter: queries.sorter,
  productInfo: products
})

const mapDispatchToProps = (dispatch): IActionProps => ({
  changeSorter: (sorter) => dispatch(updateQueries({ sorter })),
  changePagination: (pager) => dispatch(updateQueries({ pager })),
})

export default connect(mapStateToProps, mapDispatchToProps)(TableContent)