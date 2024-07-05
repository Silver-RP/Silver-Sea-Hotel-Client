import React, { useEffect, useState } from 'react'
import { bookRoom, getRoomById } from '../utils/ApiFunction'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import { Form, FormControl, Button } from "react-bootstrap"
import BookingSummary from './BookingSummary'


const BookingForm = () => {
    const [validated, setValidated] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [roomPrice, setRoomPrice] = useState(0)
    const [booking, setBooking] = useState({
        guestFullName:"",
        guestEmail:"",
        checkInDate:"",
        checkOutDate:"",
        numOfAdults: "",
        numOfChildren:""
    })

    const {roomId} = useParams()
    const navigate = useNavigate()

    const [roomInfo, setRoomInfo] = useState({
      photo: "",
      roomType: "",
      roomPrice: ""
    })

    const handleInputChange = (e)=>{
      const {name, value} = e.target
      setBooking({...booking, [name]: value})
      setErrorMsg("")
    }

    const getRoomPriceById = async (roomId) =>{
        try {
          const response = await getRoomById(roomId)
          setRoomPrice(response.roomPrice)
        } catch (error) {
          throw new Error (error)
        }
    }

    useEffect(()=>{
      getRoomPriceById(roomId)
    }, [roomId])

    const calculatePayment = () =>{
      const checkInDate = moment(booking.checkInDate)
      const checkOutDate = moment (booking.checkOutDate)
      const diffInDays = checkOutDate.diff(checkInDate, 'days')
      const rPrice = roomPrice ? roomPrice : 0
      return diffInDays * rPrice
    }

    const isGuestCountValid = () =>{
      const childrenCount = parseInt(booking.numOfChildren)
      const adultCount = parseInt(booking.numOfAdults)
      const totalCount = childrenCount + adultCount
      return totalCount > 0 && adultCount > 0
    }

    const isCheckOutDateValid = () =>{
      if(!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))){
        setErrorMsg("Check out date must be after check in date")
        return false
      }else{
        setErrorMsg("")
        return true
      }
    }

    const handleSubmit = (e) =>{
      e.preventDefault()
      const form = e.currentTarget
      if(form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()){
        e.stopPropagation()
      }else{
        setIsSubmitted(true)
      }
      setValidated (true)
    }

    const handleBooking = async () =>{
      try {
        const confirmationCode = await bookRoom(roomId, booking)
        setIsSubmitted(true)
        navigate("/booking-success", {state:{message: `${confirmationCode}`}})
      } catch (error) {
        const errorMsg = error.message
        // console.log(errorMsg)
        navigate("/booking-success", {state: {error: errorMsg}})
      }
    }

  return (
    <>
       <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6 mb-5'>
            <div className='card card-body mt-5'>
              <h4 className='card-title'> Reserve room </h4>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor="guestFullName" className='hotel-color'>Full name: </Form.Label>
                  <FormControl required type="text" id="guestFullName" name="guestFullName" value={booking.guestFullName}
                              placeholder='Enter your full name' onChange={handleInputChange} 
                  />
                  <Form.Control.Feedback type="invalid"> Please enter your full name </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="guestEmail" className='hotel-color'> Email: </Form.Label>
                  <FormControl required type="email" id='guestEmail' name='guestEmail' value={booking.email}
                              placeholder='Enter your email' onChange={handleInputChange} 
                  />
                  <Form.Control.Feedback type="invalid"> Please enter your email </Form.Control.Feedback>
                </Form.Group>
                <fieldset style={{border: "2px"}}>
                  <legend> Loading period </legend>
                  <div className='row'>
                    <div className='col-6'>
                      <Form.Label htmlFor="checkInDate" className='hotel-color'> Check-in Date: </Form.Label>
                      <FormControl required type="date" id='checkInDate' name='checkInDate' value={booking.checkInDate}
                                  placeholder='check-In Date' onChange={handleInputChange} 
                      />
                      <Form.Control.Feedback type="invalid"> Please select a check-in date </Form.Control.Feedback>
                    </div>

                    <div className='col-6'>
                      <Form.Label htmlFor="checkOutDate" className='hotel-color'> Check-out Date: </Form.Label>
                      <FormControl required type="date" id='checkOutnDate' name='checkOutDate' value={booking.checkOutDate}
                                  placeholder='check-Out Date' onChange={handleInputChange} 
                      />
                      <Form.Control.Feedback type="invalid"> Please select a check-out date </Form.Control.Feedback>
                    </div>
                    {errorMsg && <p className="text-danger"> {errorMsg} </p>}
                  </div>
                </fieldset>

                <fieldset>
                   <legend> Number of Guest </legend>
                  <div className='row'>
                    <div className='col-6'>
                      <Form.Label htmlFor="numOfAdults" className='hotel-color'> Adults: </Form.Label>
                      <FormControl required type="number" id='numOfAdults' name='numOfAdults' value={booking.numOfAdults}
                                  placeholder='Number of Adults' min={1} onChange={handleInputChange} 
                      />
                      <Form.Control.Feedback type="invalid"> Please select at least 1 adult. </Form.Control.Feedback>
                    </div>

                    <div className='col-6'>
                      <Form.Label htmlFor="numOfChildren" className='hotel-color'> Children: </Form.Label>
                      <FormControl required type="number" id='numOfChildren' name='numOfChildren' value={booking.numOfChildren}
                                  placeholder='Number of Children' min={0} onChange={handleInputChange} 
                      />
                    </div>
                    {errorMsg && <p className="text-danger"> {errorMsg} </p>}
                  </div>
                </fieldset>
                <div className='form-group mt-2 mb-2'>
                  <button type='submit' className='btn btn-hotel'> Continue </button>
                </div>
              </Form>
            </div>
          </div>
          <div className='col-md-6'>
            {isSubmitted && (
              <BookingSummary 
                booking={booking}
                payment={calculatePayment()}
                isFormValid={validated}
                onConfirm={handleBooking}
              />
            )}
            
          </div>
        </div>
       </div>
       
    </>
   
  )
}

export default BookingForm
