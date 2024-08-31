import moment from 'moment';
import React, { useState } from 'react'
import { getAvailableRooms } from '../utils/ApiFunction';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import RoomTypeSelector from './RoomTypeSelector';
import RoomSearchResult from './RoomSearchResult';

const RoomSearch = () => {
    const [searchQuery, setSearchQuery] = useState({
        checkInDate: '',
        checkOutDate: '',
        roomType: ''
    });
    const [errorMessages, setErrorMessages] = useState("");
    const [availableRooms, setAvailableRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (e) =>{
        e.preventDefault();
        const checkInDate = moment(searchQuery.checkInDate);
        const checkOutDate =moment(searchQuery.checkOutDate);
        if(!checkInDate.isValid() || !checkOutDate.isValid()){
            setErrorMessages("Please enter valid dates");
            return;
        }
        if(!checkOutDate.isSameOrAfter(checkInDate)){
            setErrorMessages("Check out date cannot be before check in date");
            return;
        }
        setIsLoading(true);
        getAvailableRooms(searchQuery.checkInDate, searchQuery.checkOutDate, searchQuery.roomType)
        .then((response) => {
            setAvailableRooms(response.data)
            setTimeout(() => setIsLoading(false), 2000)
        }).catch((error)=>{
            console.error("Error fetching available rooms: ", error);
            setErrorMessages(error.message);
        }).finally(()=>{
            setIsLoading(false);
        })
    }

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setSearchQuery({ ...searchQuery, [name]: value })
        const checkInDate = moment(searchQuery.checkInDate);
        const checkOutDate = moment(searchQuery.checkOutDate); 
        if(checkInDate.isValid() && checkOutDate.isValid()){
            setErrorMessages("");
        }
    }

    const ClearSearch = () =>{
        setSearchQuery({
            checkInDate: '',
            checkOutDate: '',
            roomType: ''
        });
        setAvailableRooms([]);
    }
  return (
    <>
        <Container className='mt-5 mb-5 py-5 shadow'>
            <Form onSubmit={handleSearch}>
                <Row className='justify-content-center'>
                    <Col xs={12} md={3}>
                        <Form.Group controlId='checkInDate'>
                            <Form.Label>Check In Date</Form.Label>
                            <Form.Control 
                                type='date'
                                name='checkInDate'
                                value={searchQuery.checkInDate}
                                onChange={handleInputChange}
                                min={moment().format('YYYY-MM-DD')}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Group controlId='checkOutDate'>
                            <Form.Label>Check Out Date</Form.Label>
                            <Form.Control 
                                type='date'
                                name='checkOutDate'
                                value={searchQuery.checkOutDate}
                                onChange={handleInputChange}
                                min={moment().format('YYYY-MM-DD')}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Group controlId='roomType'>
                            <Form.Label>Room Type</Form.Label>
                            <div className='d-flex'>
                                <RoomTypeSelector handleRoomInputChange={handleInputChange} newRoom={searchQuery}/>
                                    <Button variant='secondary' type="submit" className='ml-2'>Search</Button>
                            </div>
                        </Form.Group>
                    </Col>

                </Row>
            </Form>
            {isLoading ? (
                <p className='mt-4'>Finding available rooms...</p>
            ): availableRooms ? (
               <RoomSearchResult result={availableRooms} onClearSearch={ClearSearch}/>
            ):(
                <p>No rooms available for the selected dates and room type</p>
            )}
            {errorMessages && <p className='text-danger'>{errorMessages}</p>}
        </Container>
    </>
   
  )
}

export default RoomSearch
