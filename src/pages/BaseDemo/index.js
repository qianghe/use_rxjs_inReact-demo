
import React from 'react'
import _ from 'lodash'
import { useParams, useRouteMatch } from 'react-router-dom'
import { Playground } from '../../Playground/Playground'
import * as sourceCodes from './sourceCodes'

const BaseDemo = () => {
  const params = useParams()
  const { url } = useRouteMatch()
  const matched = url.match(/^\/(\w+)\/?/)
  const srouceCode = _.get(
    sourceCodes,
    [_.get(matched, 1), 'default', params?.id],
    _.get(sourceCodes, 'defaultDemo', '')
  )
  return (
    <Playground code={srouceCode} />
  )
}

export default BaseDemo

