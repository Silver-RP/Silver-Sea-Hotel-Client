import React, { useEffect, useState } from 'react';
import { parseISO, isWithinInterval, format } from 'date-fns';
import DateSlider from '../common/DateSlider';
import PropTypes from 'prop-types';

const BookingTable = ({ bookingInfo, handleBookingCancellation }) => {
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const parseDate = (date) => {
    if (Array.isArray(date) && date.length === 3) {
      const [year, month, day] = date;
      return new Date(year, month - 1, day); // Month is 0-indexed in JavaScript Date
    }
    if (typeof date === 'string') {
      return parseISO(date);
    }
    return null;
  };

  const filterBookings = (start, end) => {
    if (!start || !end) {
      setFilteredBookings(bookingInfo);
      return;
    }

    const filtered = bookingInfo.filter((booking) => {
      const bookingStartDate = parseDate(booking.checkInDate);
      const bookingEndDate = parseDate(booking.checkOutDate);

      if (!bookingStartDate || !bookingEndDate) {
        console.error("Invalid date format", booking.checkInDate, booking.checkOutDate);
        return false;
      }

      return (
        isWithinInterval(bookingStartDate, { start, end }) ||
        isWithinInterval(bookingEndDate, { start, end })
      );
    });

    setFilteredBookings(filtered);
  };

  useEffect(() => {
    filterBookings(dateRange.start, dateRange.end);
  }, [dateRange, bookingInfo]);

  const handleDateChange = (start, end) => {
    setDateRange({ start, end });
  };

  return (
    <section className="p-4">
      <DateSlider onDateChange={handleDateChange} onFilterChange={handleDateChange} />
      <table className="table table-bordered table-hover shadow" style={{ fontSize: "12px" }}>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Booking ID</th>
            <th>Room ID</th>
            <th>Room Type</th>
            <th>Check-In Date</th>
            <th>Check-Out Date</th>
            <th>Guest Name</th>
            <th>Guest Email</th>
            <th>Guest Adults</th>
            <th>Guest Children</th>
            <th>Total Guest</th>
            <th>Confirmation Code</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, index) => (
              <tr key={booking.id}>
                <td>{index + 1}</td>
                <td>{booking.id}</td>
                <td>{booking.room.id}</td>
                <td>{booking.room.roomType}</td>
                <td>{format(parseDate(booking.checkInDate), "yyyy-MM-dd")}</td>
                <td>{format(parseDate(booking.checkOutDate), "yyyy-MM-dd")}</td>
                <td>{booking.guestFullName}</td>
                <td>{booking.guestEmail}</td>
                <td>{booking.numOfAdults}</td>
                <td>{booking.numOfChildren}</td>
                <td>{booking.totalNumOfGuest}</td>
                <td>{booking.bookingConfirmationCode}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleBookingCancellation(booking.id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13">No bookings found for the selected dates.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

BookingTable.propTypes = {
  bookingInfo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    checkInDate: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
    checkOutDate: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
    guestFullName: PropTypes.string.isRequired,
    guestEmail: PropTypes.string.isRequired,
    numOfAdults: PropTypes.number.isRequired,
    numOfChildren: PropTypes.number.isRequired,
    totalNumOfGuest: PropTypes.number.isRequired,
    bookingConfirmationCode: PropTypes.string.isRequired,
    room: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      roomType: PropTypes.string.isRequired
    }).isRequired
  })).isRequired,
  handleBookingCancellation: PropTypes.func.isRequired
};

export default BookingTable;
