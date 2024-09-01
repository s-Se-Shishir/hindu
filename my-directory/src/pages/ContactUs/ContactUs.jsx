import React from 'react'
import { DarkModeProvider } from '../../components/DarkModeContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Hero from '../../sections/ContactUs/Hero'
import ContactForm from '../../sections/ContactUs/ContactForm'


const ContactUs = () => {
  return (
    <DarkModeProvider>
    <Header/>
    <Hero/>
    <ContactForm/>
    <Footer/>
    </DarkModeProvider>
  )
}

export default ContactUs
