import React, { useState } from 'react'
import FlashcardList from './FlashcardList'
import './App.css'

const questions = require('./jsontest.json')

function App () {
  const [flashcards, setFlashcards] = useState(questions)
  const [value, setValue] = useState([])
  const [currentCard, setCurrentCard] = useState(questions[0])

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
    return textArea.value
  }

  function nextCard () {}

  function previousCard () {}

  function handleCategoryChange (e) {
    e.preventDefault()
    setValue(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    const currentDeck = []
    questions.forEach((questions, index) => {
      if (questions.category === value) {
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
          <select id='category' value={value} onChange={handleCategoryChange}>
            <option value='All Categories'>All Categories</option>
            {categoryKey.map(category => {
              return <option value={category}>{category}</option>
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
