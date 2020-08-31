import React, { useState } from 'react'
export default function Flashcard ({ currentCard }) {
  const [flip, setFlip] = useState(false)
  const backgroundImage = require('./images/flashCard' +
    currentCard.id +
    '.png')
  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      onClick={e => {
        if (e.target.id === 'back') {
          console.log('back')
        } else {
          setFlip(!flip)
        }
      }}
    >
      <div className='front'>{currentCard.question}</div>
      <div className='back'>
        <div
          className='back-image'
          style={{
            backgroundImage: 'url(' + backgroundImage + ')'
          }}
          id='back'
          onClick={console.log('hello')}
        ></div>
        <div>{currentCard.answer}</div>
      </div>
    </div>
  )
}
