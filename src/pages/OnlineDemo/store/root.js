import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import products from './modules/products'
import queries, { fetchBrandsEpic, fetchByQueriesEpic } from './modules/queries'

export const rootEpic = combineEpics(
  fetchBrandsEpic,
  fetchByQueriesEpic
)

export const rootReducer = combineReducers({
  products,
  queries
})