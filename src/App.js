import React, { useState, useEffect } from 'react'
import FlashcardList from './FlashcardList'
import './App.css'

// pull in the questions json
const questions = require('./jsontest.json')

function App () {
  // set flashcards array to all of the questions initially
  const [flashcards, setFlashcards] = useState(questions)

  // make sure at first the app shows all categories.
  const [categoryValue, setcategoryValue] = useState('All Categories')
  // const [bookValue, setbookValue] = useState([])

  // start at first question
  const [questionNumber, setquestionNumber] = useState(0)

  //current card is what gets passed as a prop down to flashcard list component.
  // the question number sets the indice of flashcards array that will be assigned current card
  const [currentCard, setCurrentCard] = useState(flashcards[questionNumber])

  const categoryKey = []

  // find all unique categories in the questions and put them into category object
  questions.forEach(questions => {
    const category = questions.category
    if (categoryKey.indexOf(category) === -1) {
      categoryKey.push(category)
    }
  })

  //when question number or current card updates, run the function below and trigger
  // a re-render
  useEffect(() => {
    setCurrentCard(flashcards[questionNumber])
  }, [questionNumber, currentCard, flashcards])

  function nextCard () {
    if (flashcards.length > questionNumber + 1) {
      setquestionNumber(questionNumber + 1)
    } else {
      setquestionNumber(0)
    }
  }

  function previousCard () {
    if (questionNumber > 0) {
      setquestionNumber(questionNumber - 1)
    } else {
      setquestionNumber(flashcards.length - 1)
    }
  }

  function handleCategoryChange (e) {
    e.preventDefault()
    setcategoryValue(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()

    setquestionNumber(0)
    setFlashcards(questions)
    if (categoryValue !== 'All Categories') {
      const filteredByCategory = []

      questions.forEach(question => {
        if (question.category === categoryValue) {
          filteredByCategory.push(question)
        }
      })
      setquestionNumber(0)
      setFlashcards(filteredByCategory)
    }
  }

  return (
    <>
      <form className='header' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='category'>Category</label>
          <select
            id='category'
            value={categoryValue}
            onChange={handleCategoryChange}
          >
            <option value='All Categories'>All Categories</option>
            {categoryKey.map(categoryValue => {
              return <option value={categoryValue}>{categoryValue}</option>
            })}
          </select>
        </div>

        <div className='form-group'>
          <button className='btn'>Update Deck</button>
        </div>
      </form>
      <div className='container'>
        <FlashcardList currentCard={currentCard} />
      </div>
      <div className='carousel-buttons'>
        <button className='btn' onClick={previousCard}>
          Previous
        </button>
        <button className='btn' onClick={nextCard}>
          Next
        </button>
      </div>
    </>
  )
}

export default App
