export const defaultDemo = `const { rxObserver, palette } = require('api/v0.3')
const { from } = require('rxjs')

// helpers
// creates a colored Marble
function Marble(value,color) {
  return {
    valueOf: () => value,
    color
  }
}
`

export * as operator from './operators'
export * as subject from './subject'
