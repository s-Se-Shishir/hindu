import React from 'react'
import DataCards from '../../sections/DataCards/DataCards'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { DarkModeProvider } from '../../components/DarkModeContext'
import Hero from '../../sections/DataCards/Hero'
import Cards from '../../components/cards/Cards'


const DataCardPage = () => {
  return (
    <DarkModeProvider>
    <Header/>
    <Hero/>
    <DataCards/>  
    <Cards/>
    <Footer/>
    </DarkModeProvider>  

  )
}

export default DataCardPage
