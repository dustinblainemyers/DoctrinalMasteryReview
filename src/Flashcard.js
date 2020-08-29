import React, { useState, useEffect, useRef } from 'react'

export default function Flashcard ({ currentCard }) {
  const [flip, setFlip] = useState(false)
  const [height, setHeight] = useState('initial')

  // const frontEl = useRef()
  // const backEl = useRef()

  // function setMaxHeight () {
  //   const frontHeight = frontEl.current.getBoundingClientRect().height
  //   const backHeight = backEl.current.getBoundingClientRect().height
  //   setHeight(Math.max(frontHeight, backHeight, 100))
  // }

  // useEffect(setMaxHeight, [
  //   flashcard.question,
  //   flashcard.answer,
  //   flashcard.options
  // ])
  // useEffect(() => {
  //   window.addEventListener('resize', setMaxHeight)
  //   return () => window.removeEventListener('resize', setMaxHeight)
  // }, [])

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      onClick={() => setFlip(!flip)}
    >
      <div></div>
      <div className='front'>{currentCard.question}</div>
      <div className='back'>
        <div className='back-image'>
          {/* <img src={require('./images/flashCard1.webp')} alt='House image' /> */}
        </div>
        <div>{currentCard.answer}</div>
      </div>
    </div>
  )
}
