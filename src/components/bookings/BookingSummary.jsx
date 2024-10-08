import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from "react-bootstrap/Button"

const BookingSummary = ({booking, payment, isFormValid, onConfirm}) => {
    const checkInDate = moment(booking.checkInDate)
    const checkOutDate = moment(booking.checkOutDate)
    const numberOfDays = checkOutDate.diff(checkInDate, "days")
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)
    const navigate = useNavigate()

    const handleConfirmBooking = () =>{
      console.log('Confirm Booking clicked');
        setIsProcessingPayment(true)
        setTimeout(()=>{
            setIsProcessingPayment(false)
            setIsBookingConfirmed(true)
            onConfirm()
        }, 2000)
    }
  
    useEffect(()=>{
      if(isBookingConfirmed){
        console.log('Navigating to booking-success');
        navigate('/booking-success')
      }
    }, [isBookingConfirmed, navigate])


    console.log('isFormValid:', isFormValid);
    console.log('isBookingConfirmed:', isBookingConfirmed);
    console.log('isProcessingPayment:', isProcessingPayment);
    console.log('payment:', payment);
  

  return (
    <div className="row">
			<div className="col-md-8"></div>
      <div className='card card-body mt-5'>
        <h4>Reservation Summary</h4>
        <p>Full name: <strong>{booking.guestFullName}</strong></p>
        <p>Email: <strong>{booking.guestEmail}</strong></p>
        <p>Check In Day: <strong>{moment(booking.checkInDate).format("MM Do YYYY")}</strong></p>
        <p>Check Out Day: <strong>{moment(booking.checkOutDate).format("MM Do YYYY")}</strong></p>
        <p>Number Of Days: <strong>{numberOfDays}</strong></p>
        <div>
          <h5>Number of guest</h5>
          <strong>Adult{booking.numberOfAdults > 1 ? "s" : ""}: {booking.numberOfAdults}</strong>
          <br />
          <strong>Children: {booking.numberOfChildren}</strong>
        </div>
        {payment > 0 ? (
          <>
            <p className='mt-2'>Total payment: <strong>${payment}</strong></p>
            {isFormValid && !isBookingConfirmed ?(
              <Button variant="success" onClick={handleConfirmBooking} disabled={isProcessingPayment}>
                {isProcessingPayment ? (
                  <>
                    <span className='spinner-border spinner-border-sm mr-2'
                          role='status' aria-hidden="true">
                    </span>
                    Booking Confirmed, redirecting to payment gateway...
                  </>
                ):(
                  "Confirm Booking and proceed to payment"
                )}
              </Button>
            ) : isBookingConfirmed ? (
              <div className='d-flex justify-content-center align-items-center'>
                <div className='spinner-border text-primary' role='status'>
                  <span className='sr-only'> Loading </span>
                </div>
              </div>
            ): null}
          </>
        ): (
          <p className='text-danger'> Check-out date must be after check-in date</p>
        )}
      </div>
    </div>

  )
}

export default BookingSummary
