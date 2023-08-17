import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import JournalContext from '../context'

const NewEntry = () => {
  const { category } = useParams()
  const [content, setContent] = useState('')
  const { addEntry } = useContext(JournalContext)

  function submit(event) {
    event.preventDefault()
    addEntry(category, content)
  }

  return <>
    <h3>New entry in {category} category</h3>
    <form className="container" onSubmit={submit}>
      <div>
        <textarea value={content} onChange={event => setContent(event.target.value)} className="form-control" rows="8"></textarea>
      </div>
      <button className="btn btn-primary mt-2">Create Entry</button>  
    </form>
  </>
}

export default NewEntry