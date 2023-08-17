import React, { useEffect, useReducer } from 'react'
import Home from './Home'
import CategorySelection from './CategorySelection'
import NewEntry from './NewEntry'
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom'
import NavBar from './NavBar'
import ShowEntry from './ShowEntry'

// const seedEntries = [
//   {category: 'Food', content: 'Is energy'},
//   {category: 'Coding', content: 'Coding is fun'},
//   {category: 'Gaming', content: 'Animal Crossing is a game.'}
// ]

function reducer(currentState, action) {
  switch(action.type) {
    case 'setEntries':
      return {
      // deconstruct into key value pairs (entries & categories keys)
      ...currentState,
      // update entries value with entries from action
      entries: action.entries
    }
    case 'addEntry':
      return {
        ...currentState,
        entries: [...currentState.entries, action.entry]
      }
    default:
      return currentState
  }
}

const initialState = {
  entries: [],
  categories: []
}

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