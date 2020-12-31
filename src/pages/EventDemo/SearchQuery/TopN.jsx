import React from 'react'

const TopN = ({ options = [] }) => {
  if (options.length === 0) return ''
  return (
    <div>
      <p>Top {options.length}:</p>
      <ul>
        {
          options.map((option, index) => (
            <li key={index}>{option}</li>
          ))
        }
      </ul>
    </div>
  ) 
}

export default TopN