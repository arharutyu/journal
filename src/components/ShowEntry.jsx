import React from 'react'

const ShowEntry = ({ entry } ) => {
  return entry ? (
  <>
    <h5>{entry.content}</h5>
    <p>Posted in {entry.category.name}</p>
  </>
) : (
  <p>Entry not found!</p>
)
}

export default ShowEntry