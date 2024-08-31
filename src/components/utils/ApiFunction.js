import axios from 'axios'


export const api = axios.create({
    baseURL: 'http://localhost:8080'
})

// This function adds a new room to the database
export async function addRoom(photo, roomType, roomPrice){
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('roomType', roomType);
    formData.append('roomPrice', roomPrice);

    try {
        const response = await api.post("/rooms/add/new-room", formData);
        if(response.status === 201){
            return true; 
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error adding room:", error);
        return false; 
    }
}

// This function gets all room types from the database
export async function getRoomTypes(){
    try {
        const response = await api.get("/rooms/room/types")
        return response.data
    } catch (error) {
        throw new Error("Error while fetching room types")
    }
}

// This function gets all rooms from the database
export async function getAllRooms(){
    try {
        const reuslt = await api.get("/rooms/all-rooms")
        return reuslt.data
    } catch (error) {
        throw new Error("Error while fetching all rooms.")
    }
}

//This is function delete a room by id from the database
export async function deleteRoomById(roomId){
    try {
        const result = await api.delete(`/rooms/delete-room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error while deleting room: ${error.message}`)
    }
}

//This function updates a room by id in the database
export async function updateRoom(roomId, roomData){
    const formData = new FormData();
    formData.append('roomType', roomData.roomType);
    formData.append('roomPrice', roomData.roomPrice);
    formData.append('photo', roomData.photo);
    const response = await api.put(`/rooms/update-room/${roomId}`, formData)
    return response
}

//This function gets a room by id from the database
export async function getRoomById(roomId){
    try {
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error (`Error while fetching room by id ${roomId}`)
    }
}

//This function books a room by id in the databse
export async function bookRoom(roomId, booking){
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
        return response.data
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }else{
            throw new Error(`Error while booking room: ${error.message}`)
        }
    }
}

//This function gets all bookings from the database
export async function getAllBookings(){
    try {
        const response = await api.get("/bookings/all-bookings")
        return response.data
    } catch (error) {
        throw new Error (`Error while fetching all bookings: ${error.message}`)
    }
}

//This is function gets a booking by confirmation code
export async function getBookingByConfirmartionCode(confirmationCode){
    try {
        const response =  await api.get(`/bookings/confirm/${confirmationCode}`)
        return response.data
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(`Error while find booking: ${error.response.data}`)
        }else{
            throw  new Error(`Error while finding booking: ${error.message}`)
        }
    }
}

//This function deletes a booking by id from the database
export async function cancelBooking(bookingId){
    try {
        const response = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return response.data
    } catch (error) {
        throw new Error (`Error while cancelling booking: ${error.message}`)
    }
}

//This function gets available rooms from the database
export async function getAvailableRooms(checkInDate, checkOutDate, roomType){
    try {
        const response = await api.get(`/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
        return response;
    } catch (error) {
        throw new Error(`Error while fetching available rooms: ${error.message}`)
    }
}
