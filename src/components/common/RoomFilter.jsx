import React, { useState } from 'react';

const RoomFilter = ({ data, setFilteredData }) => {
  const [filter, setFilter] = useState("");

  // Handle the selection change in the dropdown
  const handleSelectChange = (e) => {
    const selectedRoomType = e.target.value;
    setFilter(selectedRoomType);

    // Filter the room data based on the selected room type
    const filteredRooms = data.filter((room) =>
      room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase())
    );
    setFilteredData(filteredRooms);
  };

  // Clear the filter and reset the filtered data
  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };

  // Create an array of unique room types with an empty string at the beginning
  const roomTypes = ["", ...new Set(data.map((room) => room.roomType))];

  return (
    <div className='input-group mb-3'>
      <span className='input-group-text' id='type-room-filter'>
        Filter room by type
      </span>
      <select className='form-select' value={filter} onChange={handleSelectChange}>
        <option value={""}>Select a room type to filter ...</option>
        {roomTypes.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>
      <button className='btn btn-hotel' type='button' onClick={clearFilter}>
        Clear Filter
      </button>
    </div>
  );
};

export default RoomFilter;
