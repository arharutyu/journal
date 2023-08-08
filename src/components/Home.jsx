import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({ entries }) => {
  return (
    <>
      <h2>Journal Entries</h2>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>
            <Link to={`/entry/${index}`}>{entry.content}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Home