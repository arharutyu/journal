import React, { useState, useEffect } from 'react'
import Home from './Home'
import CategorySelection from './CategorySelection'
import NewEntry from './NewEntry'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import ShowEntry from './ShowEntry'
import { useParams } from 'react-router-dom'

// const seedEntries = [
//   {category: 'Food', content: 'Is energy'},
//   {category: 'Coding', content: 'Coding is fun'},
//   {category: 'Gaming', content: 'Animal Crossing is a game.'}
// ]

const App = () => {
  const nav = useNavigate()
  const [entries, setEntries] = useState([])

  useEffect(() => {
    // closure/ IIFE - declare anon fx, immediately call
      (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_HOST}/entries`)
      const data = await res.json()
      setEntries(data)
      })()
  }, [])

  // HOC (higher-order component)
  function ShowEntryWrapper() {
    const { id } = useParams()
    return <ShowEntry entry={entries[id]} />
  }

  async function addEntry(category, content) {
    const id = entries.length

    const returnedEntry = await fetch(`${import.meta.env.VITE_API_HOST}/entries`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ category, content })
    })

    setEntries([...entries, await returnedEntry.json()])
    nav(`/entry/${id}`)
  }

  return <>
    <NavBar />
    <Routes>
      <Route path='/' element={<Home entries={entries}/>} />
      <Route path='/category' element={<CategorySelection />} />
      <Route path='/entry' >
        <Route path=':id' element={<ShowEntryWrapper />}></Route>
        <Route path='new/:category' element={<NewEntry addEntry={addEntry} />} /> 
      </Route>
      <Route path='*' element={<h3>Page not found</h3>}></Route>
    </Routes>
  </>
}

export default App