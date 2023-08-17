import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CategorySelection = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    (async () => {
      const res = await fetch(`${import.meta.env.VITE_API_HOST}/categories`)
      const data = await res.json()
      setCategories(data)
      })()
  }, [])

  return <>
    <h3>Please select a category: </h3>
    <ul>
      {categories.map(category => (
        <li key={category._id}>
          <Link to={`/entry/new/${category.name}`}>{category.name}</Link>
        </li>
      ))}
    </ul>
  </>
}

export default CategorySelection