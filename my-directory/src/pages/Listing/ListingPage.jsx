import React from 'react'
import { DarkModeProvider } from '../../components/DarkModeContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Hero from '../../sections/Listing/Hero'
import ListingInput from '../../sections/Listing/ListingInput'

const ListingPage = () => {
  return (
    <>
        <DarkModeProvider>

     <Header/> 
     <Hero/>
     <ListingInput/>
     <Footer/> 
     </DarkModeProvider>

    </>
  )
}

export default ListingPage
