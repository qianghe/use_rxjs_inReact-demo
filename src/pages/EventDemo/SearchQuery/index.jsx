import React, { useEffect, useState, useRef } from 'react'
import _ from 'lodash'
import { fromEvent, of } from 'rxjs'
import { fromFetch } from 'rxjs/fetch'
import {
  tap, map, filter, distinctUntilChanged, pluck,
  switchMap, exhaustMap, mergeMap, retryWhen, catchError
} from 'rxjs/operators'
import { genericRetryStrategy } from 'src/utils'
import TopN from './TopN'
import styles from './index.module.scss'

const SearchQuery = () => {
  const textInput = useRef(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [options, setOptions] = useState([])

  const setState = ({
    list,
    error,
    loading
  }) => {
    setOptions(list)
    setError(error)
    setLoading(loading)
  }

  useEffect(() => {
    const inputChange$ = fromEvent(textInput.current, 'input')
      .pipe(
        pluck('target', 'value'),
        filter(val => !_.isEmpty(val)),
        distinctUntilChanged(_.isEqual)
      )

    const requestStream$ = inputChange$.pipe(
      tap(() => setLoading(true)),
      map(val => `https://npm.io/api/v1/search?query=${val}&page=1&per_page=10`),
      switchMap(url => fromFetch(url).pipe(
        mergeMap(response => response.json()),
        retryWhen(genericRetryStrategy({
          maxRetryAttempts: 2,
          scalingDuration: 500,
          excludedStatusCodes: [500]
        })),
        catchError(error => of({
          error: true,
          msg: error?.message || 'has fetch error~~'
        }))
      ))
    )
    
    const unFetchSubscription = requestStream$.subscribe({
      next: (result = {}) => {
        const { error } = result
        const newState = error ? {
          list: [],
          error: result?.msg,
          loading: false
        } : {
          list: (result.list || []).map(item => item.name),
          error: '',
          loading: false
        }
        setState(newState)
      },
      error: error => {
        console.log('sth has error...' + error)
      },
      complete: () => {
        console.log('completed~~')
      }
    })

    return () => {
      if (_.isFunction(unFetchSubscription)) {
        unFetchSubscription()
      }
    }
  }, [textInput])

  return (
    <div className={styles.SearchQuery}>
      <p className={styles.SearchQuery_Title}>NPM package search</p>
      <input type="text" placement="search query" ref={textInput} />
      {
        loading ? <p className={styles.SearchQuery_Loading}>loading...</p> : (
          !_.isEmpty(error) ? <p className={styles.SearchQuery_Error}>has error: { error }</p> : (
              <div className={styles.SearchQuery_Content}>
                <TopN options={options} />
              </div>
          )
        )
      }
    </div>
  )
}

export default SearchQuery