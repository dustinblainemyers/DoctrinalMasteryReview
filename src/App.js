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
  const [bookValue, setBookValue] = useState('All Books')

  // start at first question
  const [questionNumber, setquestionNumber] = useState(0)

  //current card is what gets passed as a prop down to flashcard list component.
  // the question number sets the indice of flashcards array that will be assigned current card
  const [currentCard, setCurrentCard] = useState(flashcards[questionNumber])

  let workingCategoryKey = []
  let workingBookKey = []
  questions.forEach(questions => {
    const category = questions.category
    const book = questions.book

    if (workingCategoryKey.indexOf(category) === -1) {
      workingCategoryKey.push(category)
    }

    if (workingBookKey.indexOf(book) === -1) {
      workingBookKey.push(book)
    }
  })

  const [categoryKey, setCategoryKey] = useState(workingCategoryKey)
  const [bookKey, setBookKey] = useState(workingBookKey)
  const allCategories = workingCategoryKey
  const allBooks = workingBookKey

  //when question number or current card updates, run the function below and trigger
  // a re-render
  useEffect(() => {
    setCurrentCard(flashcards[questionNumber])
  }, [
    questionNumber,
    currentCard,
    flashcards,
    categoryKey,
    bookKey,
    categoryValue,
    bookValue
  ])

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

    setquestionNumber(0)
    setcategoryValue(e.target.value)

    if (e.target.value === 'All Categories') {
      setFlashcards(questions)
    } else {
      const filteredResults = []
      questions.forEach((question, index) => {
        if (question.category === e.target.value) {
          console.log(question)
          filteredResults.push(question)
        }
      })

      console.log('filteredresults', filteredResults)
      setFlashcards(filteredResults)
    }

    setBookValue('All Books')
  }

  function handleBookChange (e) {
    e.preventDefault()
    setquestionNumber(0)
    setBookValue(e.target.value)

    if (e.target.value === 'All Books') {
      setFlashcards(questions)
    } else {
      const filteredResults = []
      questions.forEach((question, index) => {
        if (question.book === e.target.value) {
          console.log(question)
          filteredResults.push(question)
        }
      })

      console.log('filteredresults', filteredResults)
      setFlashcards(filteredResults)
    }

    setcategoryValue('All Categories')
  }

  return (
    <>
      <form className='header'>
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
          <label htmlFor='book'>Book</label>
          <select id='book' value={bookValue} onChange={handleBookChange}>
            <option value='All Books'>All Books</option>
            {bookKey.map(bookValue => {
              return <option value={bookValue}>{bookValue}</option>
            })}
          </select>
        </div>

        <div className='form-group'></div>
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
