import React from 'react'
import { DarkModeProvider } from '../../components/DarkModeContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Hero from '../../sections/Listing/Hero'
import Profile from '../../components/Profile/Profile'


const ProfilePage = () => {
  return (
  
    <DarkModeProvider>

    <Header/> 
    <Hero/>
    <Profile/>
    <Footer/> 
    </DarkModeProvider>
  )
}

export default ProfilePage




