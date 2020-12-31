import React from 'react'
import { Provider } from 'react-redux'
import createStore from './store/configureStore'
import Container from './components/Container'

const store = createStore()

const OnlineDemo = () => {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  )
}

export default OnlineDemo

