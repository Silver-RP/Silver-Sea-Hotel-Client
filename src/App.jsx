import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"

import Home from './components/home/Home'
import EditRoom from './components/room/EditRoom'
import ExistingRooms  from './components/room/ExistingRooms' 
import AddRoom from './components/room/AddRoom'
import Navbar from './components/layout/NavBar'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from './components/layout/Footer'
import RoomListing from './components/room/RoomListing'
import Admin from './components/admin/Admin'
import CheckOut from './components/bookings/CheckOut'
import BookingSuccess from './components/bookings/BookingSuccess'

import Booking from './components/bookings/Bookings'
import FindBooking from './components/bookings/FindBooking'



function App() {
  return (
    <>
      <main>
        <Router>
        <Navbar />
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/edit-room/:roomId' element={<EditRoom />}/>
              <Route path='/existing-rooms' element={<ExistingRooms />}/>
              <Route path='/add/new-room' element={<AddRoom />}/>
              <Route path='/book-room/:roomId' element={<CheckOut/>}/>
              <Route path='/browse-all-rooms' element={<RoomListing />}/>
              <Route path='/admin' element={<Admin />}/>
              <Route path='/booking-success' element={<BookingSuccess />}/>
              <Route path='/existing-bookings' element={<Booking />}/>
              <Route path='/find-booking' element={<FindBooking />}/>
            </Routes>
        </Router>
        <Footer />
      </main>
    </>
  )


}

export default App
