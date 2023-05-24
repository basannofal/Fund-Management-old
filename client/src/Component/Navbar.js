import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const id = "63b56ddd981b119c3275f509"
  return (
    <>
        
    <div id="navcontainer">

      <nav>
        <div id="logo">
          Sahkar Socity
        </div>
        <ul>

          <li>
          <NavLink to={'/'}>

          <a href="#" className='navlink'>Home</a>
          </NavLink>
          </li>
          <li><a href="#" className='navlink'>About</a></li>
          {/* <li class="dropdown"  onmouseover="hover(this);" onmouseout="out(this);"><a href="#" className='navlink'>Gallery &nbsp;<span style={{paddingTop:50}}><ion-icon   name="chevron-down-outline"></ion-icon> </span></a>
            <div class="dd">
              <div id="up_arrow"></div>
            <ul>
              
              <li><a href="#" className='navlink'>2019</a></li>
              <li><a href="#" className='navlink'>2018</a></li>
              <li><a href="#" className='navlink'>2017</a></li>
            </ul>
            </div>
          </li> */}
          <li>
          <NavLink to={`/addnew/${id}`}>

          <a href="#" className='navlink' >Add New</a>
          </NavLink>
          </li>
          <li><a href="#" className='navlink'>Manage</a></li>
          <li><a href="#" className='navlink'>Account</a></li>

          {/* <li class="dropdown"><a href="#" className='navlink'>Others &nbsp;<i class="fa fa-caret-down"></i> </a>
           <div class="dd">
             <div id="u_a_c"><div id="up_arrow"></div></div>
            <ul>
              
              <li><a href="#" className='navlink'>DOCS</a></li>
              <li><a href="#" className='navlink'>API</a></li>
              <li><a href="#" className='navlink'>PROJECTS</a></li>
            </ul>
            </div>

            </li> */}
        </ul>
      </nav>
    </div>


    

    </>
  )
}

export default Navbar