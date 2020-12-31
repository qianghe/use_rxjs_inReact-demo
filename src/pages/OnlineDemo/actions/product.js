import * as ActionTypes from '../store/actionTypes'

// 更新prodcuts 
export const updateProducts = (payload) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload
  }
}

// 请求开始
export const startFetch = () => {
  return {
    type: ActionTypes.FETCH_START,
    payload: {}
  }
}

// 请求出错
export const errorFetch = (msg) => {
  return {
    type: ActionTypes.FETCH_ERROR,
    payload: {}
  }
}

