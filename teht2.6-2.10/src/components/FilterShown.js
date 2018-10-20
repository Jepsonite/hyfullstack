import React from 'react'

const FilterShown = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <form >
        rajaa näytettäviä: <input
          value={filter}
          onChange={handleFilterChange}
        />
      </form>
    </div>
  )
}

export default FilterShown