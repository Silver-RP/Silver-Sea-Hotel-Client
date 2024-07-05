import React, {useState} from "react";
import {addRoom} from "../utils/ApiFunction";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { Link } from 'react-router-dom';



const AddRoom = () => {
    //Set state
    const [newRoom, setNewRoom] = useState({
        photo : null,
        roomType : "",
        roomPrice : ""
    })

    const [imagePreview, setImagePreview] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const handleRoomInputChange = (e) =>{
        const name = e.target.name;
        let value = e.target.value;
        if(name === "roomPrice"){
            if(!isNaN(value)){
                value = parseInt(value)
            }else{
                value = ""
            }
        }
        setNewRoom({...newRoom, [name]:value})
    }

    const handleImageChange = (e) =>{
        const selectedImage = e.target.files[0]
        setNewRoom({...newRoom, photo:selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
            if(success !== undefined){
                setSuccessMsg("Room added successfully to the database")
                setNewRoom({
                    photo : null,
                    roomType : "",
                    roomPrice : ""
                })
                setImagePreview("")
                setErrorMsg("")
            }else{
                setErrorMsg("Error adding room to the database")
            }
        } catch (error) {
            console.error("Error adding room:", error);
            setErrorMsg(error.message)
        }
        setTimeout(()=>{
            setSuccessMsg("")
            setErrorMsg("")
    }, 5000)
    }


    return (
    <>
        <section className="container, mt-5 mb-5">
            <div className="row justify-content-center ">

                <div className="col-md-8 col-lg-6"> 
                    <h2> Add a new room</h2>
                    {successMsg && (
                        <div className="alert alert-success fade show">{successMsg} </div>
                    )}
                    {errorMsg && (
                        <div className="alert alert-danger fade show">{errorMsg} </div>
                    )}
                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="roomType" className="form-label"> Room Type</label>
                                <div>
                                    <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} 
                                        newRoom={newRoom}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="roomPrice" className="form-label"> Room Price</label>
                                <input type="number" className="form-control" required id="roomPrice" min={0}
                                     name="roomPrice" value={newRoom.roomPrice} onChange={handleRoomInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label"> Room Photo</label>
                                <input id="photo" name="photo" type="file" className="form-control" 
                                        onChange={handleImageChange}
                                 />
                                 {imagePreview && (
                                    <img src={imagePreview} alt="Preview of room" className="mb-3" 
                                        style={{maxHeight:"400px", maxWidth:"400px"}}
                                    />
                                 )}
                            </div>

                            <div className="d-grid d-md-flex mt-2">
                                <Link to={"/existing-rooms"} className="btn btn-outline-info">
                                    Back
                                </Link>
                                <button type="submit" className="btn btn-outline-primary ml-5"> Save Room</button>
                            </div>

                        </form>
                </div>

            </div>
        </section>
    </>
    )
}

export default AddRoom;