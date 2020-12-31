import React from 'react'
import { connect } from 'react-redux'
import { Select } from 'antd'
import { updateQueries } from '../actions'

const { Option } = Select

const BrandPicker = ({ brands = [], changeBrand, brandId }) => {
  return (
    <Select onChange={changeBrand} value={brandId} style={{ width: 160 }}>
      {
        brands.map((brand, index) => (
          <Option key={index} value={brand.brandId}>{brand.brandName}</Option>
        ))
      }
    </Select>
  )
}

const mapStateToProps = ({ queries }) => ({
  brands: queries.brands,
  brandId: queries.brandId
})
const mapDispatchToProps = (dispatch) => ({
  changeBrand: (brandId) => dispatch(updateQueries({ brandId })),
})
export default connect(mapStateToProps, mapDispatchToProps)(BrandPicker)