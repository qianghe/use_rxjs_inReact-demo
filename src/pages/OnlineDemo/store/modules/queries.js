import { ofType } from 'redux-observable'
import _ from 'lodash'
import { of, interval } from 'rxjs'
import {
  startWith, map, distinctUntilChanged, combineLatest, filter, tap,
  catchError, switchMap, mergeMap, takeUntil
} from 'rxjs/operators'
import { QUERY_PRODUCTS_URL, QUERY_BRANDS_URL } from 'src/api'
import { defaultCheckedDimLabels } from '../../config/dim'
import { updateQueries, updateBrands, updateProducts, startFetch } from '../../actions'
import * as ActionTypes from '../actionTypes'
import { getAxiosObservable } from 'src/utils'

const defaultProps = {
  timePoints: [1607270400],
  timeType: 'dot',
  timeUnit: 'day'
}

const initState = {
  brands: [],
  query: '',
  filters: defaultCheckedDimLabels,
  sorter: {
    sortKey: _.get(defaultCheckedDimLabels, 0),
    sortOrder: 'desc'
  },
  pager: {
    pageSize: 20,
    pageNum: 1
  }
}

const queriesReducer = (state = initState, action) => {
  switch(action.type) {
    case ActionTypes.UPDATE_DIM: 
      return {
        ...state,
        ...(action.payload || {})
      }
    case ActionTypes.SET_BRANDS: {
      const brands = action.payload || []
      return {
        ...state,
        brands
      }
    }
    default:
      return state
  }
}

export default queriesReducer

// 请求品牌数据
export const fetchBrandsEpic = (action$, state$) => {
  return action$.pipe(
    ofType(ActionTypes.QUERY_BRANDS),
    switchMap(() => getAxiosObservable(QUERY_BRANDS_URL).pipe(
      mergeMap(response => of(
        updateBrands(_.get(response, 'brands', [])),
        updateQueries({
          brandId: _.get(response, 'brands.0.brandId')
        })
      )),
      catchError(error => of({
        type: ActionTypes.FETCH_ERROR,
        payload: error.statusText
      }))
    ))
  )
}

// 请求商品数据
export const fetchByQueriesEpic = (action$, state$) => {
  const stopPolling$ = action$.ofType(ActionTypes.POLLING_STOP)
  const paramsChange$ = state$.pipe(
    map(({ queries }) => {
      const { brands, sorter, pager, filters, ...restProps } = queries
      const { pageSize = 20, pageNum = 1} = pager
      const { sortKey, sortOrder = 'asc' } = sorter
      return {
        measureCode: filters.join(','),
        pageSize,
        pageNum,
        sortField: sortKey,
        sortType: sortOrder,
        ...restProps,
        ...defaultProps
      }
    }),
    distinctUntilChanged(_.isEqual),
    filter(params => !_.isEmpty(_.get(params, 'brandId')))
  )
  // 操作数据流
  return action$.pipe(
    ofType(ActionTypes.POLLING_START),
    combineLatest(paramsChange$, (action, params) => params),
    switchMap((params) => {
      const polling$ = interval(5 * 60 * 1000).pipe(
        takeUntil(stopPolling$),
        startWith(null),
        switchMap(() => getAxiosObservable(QUERY_PRODUCTS_URL, {
          params
        }).pipe(
          mergeMap(data => of(updateProducts(data))),
          startWith(startFetch()),
          catchError(error => of({
            type: ActionTypes.FETCH_ERROR,
            payload: error.statusText
          }))
        ))
      )
      return polling$
    })
  )
}

