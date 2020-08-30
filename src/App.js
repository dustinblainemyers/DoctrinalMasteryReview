import React, { useState, useEffect } from 'react'
import FlashcardList from './FlashcardList'
import './App.css'

const questions = require('./jsontest.json')

function App () {
  const [flashcards, setFlashcards] = useState(questions)
  const [categoryValue, setcategoryValue] = useState('All Categories')
  const [bookValue, setbookValue] = useState([])
  const [questionNumber, setquestionNumber] = useState(0)
  let count = 0
  const [currentCard, setCurrentCard] = useState(questions[questionNumber])

  const categoryKey = []
  questions.forEach(questions => {
    const category = questions.category
    if (categoryKey.indexOf(category) === -1) {
      categoryKey.push(category)
    }
  })

  console.log(categoryKey)

  function decodeString (str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.categoryValue
  }

  function nextCard () {
    if (questions.length > questionNumber + 1) {
      setquestionNumber(questionNumber + 1)
    } else {
      setquestionNumber(0)
    }
  }
  useEffect(() => {
    setCurrentCard(questions[questionNumber])
  }, [questionNumber])

  function previousCard () {
    if (questionNumber > 0) {
      setquestionNumber(questionNumber - 1)
    } else {
      setquestionNumber(questions.length - 1)
    }
  }

  function handleCategoryChange (e) {
    e.preventDefault()
    setcategoryValue(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()

    if (categoryValue === 'All Categories' && bookValue === 'All Books') {
    }

    const currentDeck = []
    questions.forEach((questions, index) => {
      if (questions.category === categoryValue) {
        const answer = <pre>{questions.answer}</pre>

        const question = decodeString(questions.question)

        currentDeck.push({
          id: `${index}-${Date.now()}`,
          answer: answer,
          question: question
        })
      }
    })

    setFlashcards(currentDeck)
    if (currentDeck.length > 0) {
      setCurrentCard(currentDeck[0])
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
      <button onClick={previousCard}>Previous</button>
      <button onClick={nextCard}>Next</button>
    </>
  )
}

export default App
