import React, { lazy, Suspense } from 'react'
import { useLocation, Switch, Route } from 'react-router-dom'
import { Card } from 'antd'
import BaseDemo from '../BaseDemo'

const EventDemo = lazy(() => import('../EventDemo'))
const OnlineDemo = lazy(() => import('../OnlineDemo'))

const Loading = <div>Loading...</div>
const RouterView = () => {
  let location = useLocation()
  const { pathname = ''} = location
  const cardTitle = pathname.replaceAll('/', '-').slice(1)
  
  return (
    <Card title={cardTitle || 'Demo'} type="inner" style={{ margin: '20px 40px'}}>
      <Switch>
        <Route path={["/operator/:id", "/subject/:id"]}>
          <BaseDemo />
        </Route>
        <Route path="/event/:id">
          <Suspense fallback={Loading}>
            <EventDemo />
          </Suspense>
        </Route>
        <Route path="/example/1">
          <Suspense fallback={Loading}>
            <OnlineDemo />
          </Suspense>
        </Route>
        <Route path="*">
          <BaseDemo />
        </Route>
      </Switch>
    </Card>
  )
}

export default RouterView