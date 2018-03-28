import React from 'react'
import { canUseDOM } from 'exenv'

class Tournament extends React.Component {
  render () {
    return (
      <div className='view tournament-view'>
        <h1> Tournament </h1>
        <p className='tournament-intro'>
          {canUseDOM && 'Tournament view is this view that is a tournament view of a tournament'}
          {!canUseDOM && 'Loaded from the server, awaiting hydration'}
        </p>
      </div>
    )
  }
}

export default Tournament
