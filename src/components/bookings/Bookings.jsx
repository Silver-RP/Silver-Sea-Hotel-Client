import React, { useEffect, useState } from 'react'
import { cancelBooking, getAllBookings } from '../utils/ApiFunction'
import Header from '../common/Header'
import BookingTable from './BookingTable'

const Bookings = () => {
    const [bookingInfo, setBookingInfo] =useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(()=>{
        setTimeout(()=>{
            getAllBookings().then((data) => {
                setBookingInfo(data)
                setIsLoading(false)
            }).catch((err) => {
                setError(err.message)
                setIsLoading(false)
            });
        }, 1000)
    })

    const handleBookingCancellation = async (bookingId) =>{
        try {
            await cancelBooking(bookingId)
            const data = await getAllBookings()
            setBookingInfo(data)
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <section className='container' style={{backgroundColor:"whitesmoke"}}>
      <Header title={"Existing Bookings"}  />
        {error && <div className='alert alert-danger'> {error} </div>}
      {isLoading ? (
        <div > Loading existing bookings </div>
      ):(
        <BookingTable bookingInfo={bookingInfo} 
                     handleBookingCancellation={handleBookingCancellation}            
        />
      )}
    </section>
  )
}

export default Bookings
