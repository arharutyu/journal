import React, { useEffect, useReducer, createContext } from 'react'
import Home from './Home'
import CategorySelection from './CategorySelection'
import NewEntry from './NewEntry'
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom'
import NavBar from './NavBar'
import ShowEntry from './ShowEntry'
import { reducer, initialState } from '../reducer.js'
import JournalContext from '../context'

const App = () => {
  const nav = useNavigate()
  // const [entries, setEntries] = useState([])

  const [store, dispatch] = useReducer(reducer, initialState)
  const {entries} = store

  useEffect(() => {
    // closure/ IIFE - declare anon fx, immediately call
      (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_HOST}/entries`)
      const data = await res.json()
      dispatch({
        type: 'setEntries',
        entries: data,
      })
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

    dispatch({
      type: 'addEntry',
      entry: await returnedEntry.json()
    })

    nav(`/entry/${id}`)
  }

  return (
    <JournalContext.Provider value={{ entries, addEntry }}>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/category' element={<CategorySelection />} />
        <Route path='/entry' >
          <Route path=':id' element={<ShowEntryWrapper />}></Route>
          <Route path='new/:category' element={<NewEntry addEntry={addEntry} />} /> 
        </Route>
        <Route path='*' element={<h3>Page not found</h3>}></Route>
      </Routes>
    </JournalContext.Provider>
  )
}

export default App