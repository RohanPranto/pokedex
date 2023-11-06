import React from 'react'
import footerimg from '../assets/footer.png'
import '../App.css'
function Footer() {
  return (
    <div className='footer-div text-center'>
    <p>©RohanBiswas</p>
    <img src={footerimg} alt="" />
    </div>
  )
}

export default Footer
