import BaseRequest from './base'

export const QUERY_PRODUCTS_URL = '/api/gxt/db/common/portlet?apiCode=gxt_brand_upc_rank'

export const QUERY_BRANDS_URL = '/api/gxt/supplier/getAllBrand/v2'
/**
 * 请求商品列表
 * @param {*} params 
 */
export const fetchProducts = (params) => BaseRequest.post(
  QUERY_PRODUCTS_URL,
  params
)
/**
 * 请求品牌列表
 */
export const fetchBrands = () => BaseRequest.post(QUERY_BRANDS_URL)
