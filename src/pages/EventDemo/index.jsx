import React from 'react'
import { useParams } from 'react-router-dom'
import MergeEvent from './MergeEvent'
import SearchQueryDemo from './SearchQuery'

const EventDemo = () => {
  const params = useParams()
  const id = parseInt(params?.id ?? 0)
  const ActiveDemoSlot = id === 2 ? SearchQueryDemo : MergeEvent
  
  return <ActiveDemoSlot />
}

export default EventDemo