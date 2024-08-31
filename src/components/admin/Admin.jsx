import React from 'react'
import { Link } from 'react-router-dom'
import "../../index.css"


const Admin = () => {


  return (
    <section className='container mt-5'>
      <h2>Welcome to Admin panel</h2>
      <hr/>
      <Link to={"/existing-rooms"} className="link-style1"> Manage Rooms</Link> <br /> <br />
      <Link to={"/existing-bookings"} className="link-style1"> Manage Bookings</Link> <br />
    </section>
  )
}

export default Admin
