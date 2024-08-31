import { getDate } from 'date-fns';
import React, { useState } from 'react';
import { cancelBooking, getBookingByConfirmartionCode } from '../utils/ApiFunction';

const FindBooking = () => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [bookingInfo, setBookingInfo] = useState({
        id: '',
        room: { id: "" },
        bookingConfirmationCode: '',
        roomNumber: '',
        checkInDate: '',
        checkOutDate: '',
        guestFullName: '',
        guestEmail: '',
        numOfAdults: '',
        numOfChildren: '',
        totalNumOfGuest: '',
    });

    const clearBookingInfo = {
        id: '',
        room: { id: "" },
        bookingConfirmationCode: '',
        roomNumber: '',
        checkInDate: '',
        checkOutDate: '',
        guestFullName: '',
        guestEmail: '',
        numOfAdults: '',
        numOfChildren: '',
        totalNumOfGuest: '',
    };

    const [isDelete, setIsDelete] = useState(false);

    const handleInputChange = (e) => {
        setConfirmationCode(e.target.value);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = await getBookingByConfirmartionCode(confirmationCode);
            setBookingInfo(data);
            setError(null);  
        } catch (error) {
            setBookingInfo(clearBookingInfo);
            if (error.response && error.response.status === 404) {
                setError(error.response.data.message);
            } else {
                setError(error.message);
            }
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    const handleBookingCancellation = async (bookingId) => {
        try {
            await cancelBooking(bookingId);
            setIsDelete(true);
            setSuccessMessage("Booking has been cancelled successfully!");
            setBookingInfo(clearBookingInfo);
            setConfirmationCode('');
            setError('');
        } catch (error) {
            setError(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setIsDelete(false);
        }, 2000);
    }

    return (
        <>
            <div className='container mt-5 d-flex flex-column justify-content-center align-items-center'>
                <h2>Find My Booking</h2>
                <form onSubmit={handleFormSubmit} className='col-md-6'>
                    <div className='input-group mb-3'>
                        <input 
                            className='form-control' 
                            id='confirmationCode'
                            name='confirmationCode'
                            placeholder='Enter Confirmation Code'
                            value={confirmationCode}
                            onChange={handleInputChange}
                        />
                        <button className='btn btn-hotel input-group-text' type='submit'>Find</button>
                    </div>
                </form>
                {isLoading ? (
                    <div>Finding Booking...</div> 
                ) : (
                    error ? (
                        <div className='text-danger'>{error}</div>
                    ) : (
                        bookingInfo.bookingConfirmationCode ? (
                            <div className='col-md-6 mt-4 mb-5'>
                                <h3>Booking Information</h3>
                                <p>Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
                                <p>Room Number: {bookingInfo.roomNumber}</p>
                                <p>Check In Date: {getDate(bookingInfo.checkInDate)}</p>
                                <p>Check Out Date: {getDate(bookingInfo.checkOutDate)}</p>
                                <p>Guest Name: {bookingInfo.guestFullName}</p>
                                <p>Guest Email: {bookingInfo.guestEmail}</p>
                                <p>Adults: {bookingInfo.numOfAdults}</p>
                                <p>Children: {bookingInfo.numOfChildren}</p>
                                <p>Total Guests: {bookingInfo.totalNumOfGuest}</p>
                                {!isDelete && (
                                    <button 
                                        className='btn btn-danger' 
                                        onClick={() => handleBookingCancellation(bookingInfo.id)}
                                    >
                                        Cancel Booking
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div>
                                <p>Finding Booking...</p>
                            </div>
                        )
                    )
                )}
                {isDelete && (
                    <div className='alert alert-success mt-3' role='alert'>
                        {successMessage}
                    </div>
                )}
            </div>
        </>
    );
}

export default FindBooking;
