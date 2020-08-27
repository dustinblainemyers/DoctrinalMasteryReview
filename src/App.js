import React, { useState } from 'react'
import FlashcardList from './FlashcardList'
import './App.css'

const questions = require('./jsontest.json')

function App () {
  const [flashcards, setFlashcards] = useState([])
  const [value, setValue] = useState([])
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

  function handleCategoryChange (e) {
    e.preventDefault()
    setValue(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()

    questions.forEach((questions, index) => {
      if (questions.category === value) {
        const answer = decodeString(questions.answer)
        const question = decodeString(questions.question)
        setFlashcards([
          ...flashcards,
          {
            id: `${index}-${Date.now()}`,
            answer: answer,
            question: question
          }
        ])
      }
    })
  }

  return (
    <>
      <form className='header' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='category'>Category</label>
          <select id='category' value={value} onChange={handleCategoryChange}>
            <option value='Select Category'>Select Category</option>
            {categoryKey.map(category => {
              return <option value={category}>{category}</option>
            })}
          </select>
        </div>

        <div className='form-group'>
          <button className='btn'>Show Cards</button>
        </div>
      </form>
      <div className='container'>
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  )
}

export default App
