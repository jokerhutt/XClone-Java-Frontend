import React from 'react'
import ReactTimeAgo from 'react-time-ago'

export default function LastSeen({ date }) {
    const utcDate = new Date(Date.parse(date + 'Z'));
  return (
    <div>
      <ReactTimeAgo date={utcDate} locale="en-US"/>
    </div>
  )
}   