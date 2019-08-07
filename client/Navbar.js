import React from 'react'

export default function Navbar(props) {
  return (
    <div>
      <nav>
        <div style ={{backgroundColor: 'black'}} className="nav-wrapper">
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li><a onClick={()=>props.redirect('Get Data')} >Get Data</a></li>
            <li><a onClick={()=>props.redirect('New Student')} >Enter New Student</a></li>
            <li><a onClick={()=>props.redirect('Edit')} >Edit Fields</a></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
