import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { rootEpic, rootReducer } from './root'

const epicMiddleware = createEpicMiddleware()

export default function configureStore() {
  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose

  const enhancer = composeEnhancers(
    applyMiddleware(epicMiddleware),
    // other store enhancers if any
  )
  const store = createStore(
    rootReducer,
    enhancer
  );

  epicMiddleware.run(rootEpic)

  return store
}