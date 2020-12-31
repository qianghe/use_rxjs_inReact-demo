const demo1 = `const { rxObserver, palette } = require('api/v0.3')
const { timer, from } = require('rxjs')
const { zip, map, retry } = require('rxjs/operators')

const error$ = timer(0, 5).pipe(
    map(x => {
      if (x > 2) { throw 'Bam!' }
      return x
    }),
    zip(from(palette), Marble) // colorize the stream
  )

// retry 2 times
const retry$ = error$.pipe(
  retry(2)
)


error$.subscribe(rxObserver());
retry$.subscribe(rxObserver());

// helpers
// creates a colored Marble
function Marble(value,color) {
  return {
    valueOf: () => value,
    color
  }
}`

const demo2 = `const { rxObserver, palette } = require('api/v0.3')
const { from, timer, pipe } = require('rxjs')
const { zip, take, map, switchMap, delayWhen } = require('rxjs/operators')


// our source$ will emit values at 5ms, 10ms, 20ms
const source$ = from([5, 10, 20]).pipe(
  delayWhen(x => timer(x)),
  zip(
    from(palette),
    Marble
  ) // colorize each item
)

const switchMap$ = source$.pipe(
    switchMap(x => timer(0, 3).pipe(
        take(3),
        map(y => Marble(y, x.color))
      )  // colorize as source$ value
    )
  )

// visualization
source$.subscribe(rxObserver('source$'))
switchMap$.subscribe(rxObserver('switchMap( timer(0, 3).take(3) )'))


// creates a colored Marble
function Marble(value, color) {
  return {
    valueOf: () => value,
    color
  }
}
`

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  '',
  demo1,
  demo2
]