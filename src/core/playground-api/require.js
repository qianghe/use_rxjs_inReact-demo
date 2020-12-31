/**
 * Naive implementation of require mock for playground scripts
 * TODO: find a better way to do proper requires on the fly
 */

// RxJS {{{
// import * as rxrql from 'rx-rql'
import * as Rx from 'rxjs'
// import * as rxjsautorun from 'rxjs-autorun'
// import * as rxjsproxify from 'rxjs-proxify'
// Lettable operators
// https://github.com/ReactiveX/rxjs/blob/master/doc/lettable-operators.md
import * as RxOperators from 'rxjs/operators'
// Compatibility package
// https://github.com/ReactiveX/rxjs/tree/master/compat
import * as RxCompat from 'rxjs/Rx'
import * as colors from './colors'
// }}}
import { api as apiV0_3 } from './v0.3'


const availablePackages = [
    { // RxJS
        name: 'rxjs',
        load: () => Rx
    },
    { // RxJS Compat
        name: 'rxjs/Rx',
        load: () => RxCompat
    },
    { // RxJS lettable operators
        name: 'rxjs/operators',
        load: () => RxOperators
	},
    // { // My libs
    //     name: 'rxjs-autorun',
    //     load: () => rxjsautorun
	// },
    // {
    //     name: 'rxjs-proxify',
    //     load: () => rxjsproxify
	// },
    // {
    //     name: 'rx-rql',
    //     load: () => rxrql
	// },
	// /Mylibs

    {
        name: 'api/v0.3',
        load: () => apiV0_3
    },
    {
        name: 'rp-api/colors',
        load: () => colors
    }
]

class PackageNotSupportedError extends Error {
    constructor(name){
        const availablePackageNames = availablePackages.map(p => p.name)
        const errorMessage = `Currently package "${name}" is not supported. Please, use one of these: ${availablePackageNames}`
        super(errorMessage)
    }
}

const _require = name => {
    const pkg = availablePackages.find(x => x.name === name)
    if (pkg === undefined) {
        throw new PackageNotSupportedError(name)
    }
    return pkg.load()
}

export { _require }
