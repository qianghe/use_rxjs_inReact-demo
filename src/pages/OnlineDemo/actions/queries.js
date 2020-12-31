import * as ActionTypes from '../store/actionTypes'

// 请求品牌
export const queryBrands = payload => {
  return {
    type: ActionTypes.QUERY_BRANDS,
    payload
  }
}
// 更新queris
export const updateQueries = (payload) => {
  return {
    type: ActionTypes.UPDATE_DIM,
    payload
  }
}

// 轮询
export const startPolling = () => {
  return {
    type: ActionTypes.POLLING_START,
    payload: {}
  }
}

export const stopPolling = () => {
  return {
    type: ActionTypes.POLLING_STOP,
    payload: {}
  }
}

export const updateBrands = (payload) => {
  return {
    type: ActionTypes.SET_BRANDS,
    payload
  }
}