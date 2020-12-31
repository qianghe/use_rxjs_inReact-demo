import * as ActionTypes from '../actionTypes'

const initState = {
  list: [],
  total: 0,
  loading: false,
  error: false
}

const productsReducer = (state = initState, action) => {
  switch(action.type) {
    case ActionTypes.SET_PRODUCTS: {
      const { body, total } = action.payload || {}
      return {
        ...state,
        list: (body || []).map((item, index) => ({
          key: item.rn || index,
          ...item
        })),
        loading: false,
        total
      }
    }
    case ActionTypes.FETCH_START: {
      return {
        ...state,
        loading: true,
        error: false
      }
    }
    case ActionTypes.FETCH_ERROR: 
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return state
  }
}

export default productsReducer