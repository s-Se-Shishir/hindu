import React from 'react'
import { DarkModeProvider } from '../../components/DarkModeContext'
import Header from '../../components/Header'
import Hero from '../../sections/Home/Hero'
import About from '../../sections/Home/About'
import PopularArea from '../../sections/Home/PopularArea'
import Services from '../../sections/Home/Services'
import Clients from '../../sections/Home/Clients'
import Contact from '../../sections/Home/Contact'
import Footer from '../../components/Footer'
import Properties from '../../sections/Home/Properties'

const HomePage = () => {
  return (
    <DarkModeProvider>
    <Header/>
    <Hero/>
    <About/>
    <PopularArea/>
    <Properties/>
    <Services/>
    <Clients/>
    <Contact/>
    <Footer/>
    </DarkModeProvider>
  )
}

export default HomePage
