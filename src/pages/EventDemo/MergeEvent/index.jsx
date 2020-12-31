import React, { useRef, useState, useEffect } from 'react'
import { NEVER, interval, merge } from 'rxjs'
import { map, mapTo, scan, tap, switchMap, startWith } from 'rxjs/operators'
import { fromClick, fromEnter } from 'src/utils/event'
import styles from './index.module.scss'

const fromClickWithMapTo = (id, obj) => fromClick(id).pipe(mapTo(obj))
const fromEnterWithMap = ($input, key) => fromEnter($input).pipe(
  map((val) => ({ [key]: parseInt(val) || 0 }))
)

const defaultVal = 0

const MergeEventDemo = () => {
  const speedInput = useRef(null)
  const incInput = useRef(null)
  const valInput = useRef(null)
  const [value, setValue] = useState(defaultVal)

  const initState = {
    start: false,
    speed: 1000,
    value: defaultVal,
    countup: true,
    increase: 1
  }

  useEffect(() => {
    // interval time
    const speedChange$ = fromEnterWithMap(speedInput.current, 'speed')
    // increase
    const incChange$ = fromEnterWithMap(incInput.current, 'increase')
    // set value
    const initValChange$ = fromEnterWithMap(valInput.current, 'value')
    // count-down or count-up
    const countDownChange$ = fromClickWithMapTo('count-down', { countup: false })
    const countUpChange$ = fromClickWithMapTo('count-up', { countup: true })
    // start、pause、reset
    const start$ = fromClickWithMapTo('start', { start: true })
    const pause$ = fromClickWithMapTo('pause', { start: false })
    const reset$ = fromClickWithMapTo('reset', { value: defaultVal })

    const mergeEvent$ = merge(
      speedChange$,
      countDownChange$,
      countUpChange$,
      initValChange$,
      incChange$,
      start$,
      pause$,
      reset$
    )

    const stopWatch$ = mergeEvent$.pipe(
      startWith(initState),
      scan((state, curr) => ({ ...state, ...curr }), {}),
      tap((state) => setValue(state.value)),
      switchMap(state => 
        state.start ?
          interval(state.speed)
            .pipe(
              tap(() => state.value += state.countup ? state.increase : -state.increase),
              tap(() => setValue(state.value))
            ) : NEVER
      )
    )
    // 触发
    stopWatch$.subscribe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={styles.MergeEventDemo}>
      <div>
        <div>
          <span>Speed</span><input ref={speedInput} defaultValue={initState.speed} /></div>
        <div>
          <span>Excution</span>
          <button id="count-up">Count-up</button>
          <button id="count-down">Count-down</button>
        </div>
        <div>
          <span>Increase</span><input ref={incInput} defaultValue={initState.increase} />
        </div>
        <div>
          <span>Set-Value</span><input ref={valInput} defaultValue={initState.value} />
        </div>
      </div>
      <div>
        <div>
          <button id="start">Start</button>
          <button id="pause">Pause</button>
          <button id="reset">Reset</button>
        </div>
        <div className={styles.MergeEventDemo_Result}>
          Current value
          <p>{ value }</p>
        </div>
      </div>
    </div>
  )
}

export default MergeEventDemo