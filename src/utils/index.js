import { Observable, throwError, timer } from 'rxjs'
import {
  finalize, mergeMap
} from 'rxjs/operators'
import Axios from 'axios'
import _ from 'lodash'

// retry
export const genericRetryStrategy = ({
  maxRetryAttempts = 3,
  scalingDuration = 1000,
  excludedStatusCodes = []
} = {}) => (attempts) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1
      // 在满足code的条件下，尝试的最大次数
      if (
        retryAttempt > maxRetryAttempts ||
        excludedStatusCodes.find(e => e === error.status)
      ) {
        return throwError(error)
      }
      console.log(
        `Attempt ${retryAttempt}: retrying in ${retryAttempt *
          scalingDuration}ms`
      );
      // retry after xxs, xxs etc
      return timer(retryAttempt * scalingDuration)
    }),
    finalize(() => console.log('Retry excution has done!'))
  )
}

// use axios as observable
export const getAxiosObservable = (url, options = {}) => {
  return Observable.create((observer) => {
    const cancelToken = Axios.CancelToken.source()
    const { method = 'post', params = {}, restProps } = options
    const axiosOption = {
      method,
      url,
      ...(!_.isEmpty(params)) ? {
        [method === 'post' ? 'data' : 'params']: params
      } : {},
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      withCredentials: true,
      cancelToken: cancelToken.token,
      ...restProps
    }
    // 发送请求
    Axios(axiosOption).then(result => {
      observer.next(_.get(result, 'data.data', {}))
      observer.complete()
    }, err => {
      if (Axios.isCancel(err)) {
        observer.complete()
      } else {
        observer.error(err)
      }
    })

    return () => cancelToken.cancel()
  })
}