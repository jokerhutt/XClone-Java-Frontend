import React from 'react'
import ReactTimeAgo from 'react-time-ago'

export default function LastSeen({ date }) {
    const utcDate = new Date(Date.parse(date + 'Z'));
  return (
    <div>
      <ReactTimeAgo className="text-twitterBorder text-sm" date={utcDate} timeStyle="twitter" locale="en-US"/>
    </div>
  )
}   