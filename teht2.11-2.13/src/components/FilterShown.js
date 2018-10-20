import React from 'react'

const FilterShown = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <form >
        find countries: <input
          value={filter}
          onChange={handleFilterChange}
        />
      </form>
    </div>
  )
}

export default FilterShown