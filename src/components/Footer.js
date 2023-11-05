import React from 'react'
import footerimg from '../assets/footer.png'
import '../App.css'
function Footer() {
  return (
    <div className='footer-div text-center'>
    <img src={footerimg} alt="" />
    <p>©RohanBiswas</p>
    </div>
  )
}

export default Footer
