import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunction'

const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {
  const [roomTypes, setRoomTypes] = useState([""])
  const [showNewRoomTypesInput, setShowNewRoomTypesInput] = useState(false)
  const [newRoomType, setNewRoomType] = useState("")

  useEffect(() => {
    getRoomTypes().then((data) => {setRoomTypes(data)})
  }, [])
  
  const handleNewRoomTypeInputChange = (e)=>{
    setNewRoomType(e.target.value)
  }

  const handleAddNewRoomType = async ()=>{
    if(newRoomType !== ""){
      setRoomTypes([...roomTypes, newRoomType])
      setNewRoomType("")
      setShowNewRoomTypesInput(false)
    }
  }


  return (
    <>
      {roomTypes.length >= 0 && (
        <div>
          <select id='roomType' name='roomType' 
            className='form-select'
            onChange={(e)=>{
              if(e.target.value === "Add new"){
                setShowNewRoomTypesInput(true)
              }else{
                handleRoomInputChange(e)
              }
            }}
            value={newRoom.roomTypes}
          >
            <option value={""}>Select a Room Type</option>
            <option value={"Add new"}>Add new</option>
            {roomTypes.map((type, index)=>(
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
          {showNewRoomTypesInput && (
            <div className='input-group'>
              <input className='form-control' type='text' 
                 placeholder='Enter a new room type' 
                 onChange={handleNewRoomTypeInputChange}
              />
              <button type='button' className='btn btn-hotel' onClick={handleAddNewRoomType}>
                Add
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default RoomTypeSelector

