import React from 'react'
import Flashcard from './Flashcard'

export default function FlashcardList ({ currentCard }) {
  return (
    <div className='card-grid'>
      <Flashcard currentCard={currentCard} flip='false' />
    </div>
  )
}
