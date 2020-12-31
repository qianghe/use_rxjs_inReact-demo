const demo1 = `const { rxObserver, palette } = require('api/v0.3')
const { BehaviorSubject, timer, from } = require('rxjs')
const { take, zip } = require('rxjs/operators')

const subject = new BehaviorSubject('a')

const source$ = timer(100, 100).pipe(
  take(5),
  zip(from(palette.slice(1)), Marble)
)

source$.subscribe(subject)
subject.subscribe(rxObserver('observer$-a'))
setTimeout(() => {
 subject.subscribe(rxObserver('observer$-b'))
}, 300)

// helpers
// creates a colored Marble
function Marble(value,color) {
  return {
    valueOf: () => value,
    color
  }
}
`

const demo2 = `const { rxObserver, palette } = require('api/v0.3');
const { timer, from } = require('rxjs');
const { zip, shareReplay, take } = require('rxjs/operators');


// our source will be a basic timer
// making 5 ticks, every 5ms
const source$ = timer(0, 5).pipe(
  take(5),
  zip(from(palette), Marble) // add color to items
);

const shared$ = source$.pipe(
  shareReplay()
);


// subscriptions and visualisations:
// creating observers for source$
const a = rxObserver('source$');
const b = rxObserver('source$ — delayed subscription');
source$.subscribe(a);

// creating observers for shared$
const c = rxObserver('shared$');
const d = rxObserver('shared$ — delayed subscription');
shared$.subscribe(c);

// delayed subscriptions
setTimeout(()=>{
  source$.subscribe(b);
  shared$.subscribe(d);
}, 15);



// helpers
function Marble(value,color) {
  return {
    valueOf: ()=>value
    , color
  };
}`


// eslint-disable-next-line import/no-anonymous-default-export
export default [
  '',
  demo1,
  demo2
]