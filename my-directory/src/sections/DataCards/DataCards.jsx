import React from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import Cards from '../../components/cards/Cards'

const DataCards = () => {
  return (
    <>
    <div className=' flex justify-center items-center p-10'>    <SearchBar/>
</div>

<div>
   <Cards/>
</div>
    </>
  )
}

export default DataCards
