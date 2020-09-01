import React, { useState, useEffect } from 'react'
export default function Flashcard ({ currentCard }) {
  const [flip, setFlip] = useState(false)
  const backgroundImage = require('./images/flashCard' +
    currentCard.id +
    '.png')
  const [nextCard, setNextCard] = useState(false)
  useEffect(() => {
    if (flip === true) {
      setFlip(!flip)
      setNextCard(true)
    }
  }, [currentCard])

  return (
    <div
      className={`card ${flip ? 'flip' : ''} + ${nextCard ? 'noFlip' : ''}`}
      onClick={e => {
        if (e.target.id === 'back') {
        } else {
          setFlip(!flip)
          setNextCard(false)
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
        ></div>
        <div className='answer-placeholder'>{currentCard.answer}</div>
      </div>
    </div>
  )
}
