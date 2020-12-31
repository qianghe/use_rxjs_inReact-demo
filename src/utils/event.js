import { fromEvent } from 'rxjs'
import { filter, map, distinctUntilChanged } from 'rxjs/operators'

const getElem = (id) => document.getElementById(id)

export const fromClick = (id) => fromEvent(getElem(id), 'click')

export const fromEnter = ($input, key) => fromEvent($input, 'keyup')
  .pipe(
    filter(event => event.keyCode === 13),
    map(event => event.target.value),
    distinctUntilChanged()
  )