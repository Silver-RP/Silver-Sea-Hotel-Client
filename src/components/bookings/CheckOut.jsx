import React, { useEffect, useState } from 'react'
import BookingForm from './BookingForm'
import { getRoomById } from '../utils/ApiFunction'
import { useParams } from 'react-router-dom'
import { FaWifi, FaTv, FaUtensils, FaWineGlassAlt, FaCar, FaParking, FaTshirt } from 'react-icons/fa'
import RoomCarousel from '../common/RoomCarousel'

const CheckOut = () => {
  const[error, setError]  = useState('')
  const[isLoading, setIsLoading] = useState(false)
  const[roomInfo,setRoomInfo] = useState({photo: '', roomType: '', roomPrice: ''})
  const { roomId } = useParams()



  useEffect(()=>{
    setTimeout(()=>{
      getRoomById(roomId).then((response)=>{
        setRoomInfo(response)
        setIsLoading(false)
      }).catch((error)=>{
        setError(error)
        setIsLoading(false)
      })
    }, 2000)
  }, [roomId])



  return (
    <div>
      <section className='container mx-5'>
        <div className='row'>
          <div className='col-md-3 mt-5 mb-5'>
            {isLoading ? (
              <p>Loaind room infomation...</p>
            ):error? (
              <p>{error}</p>
            ):(
              <div className='room-info'>
                <img src={`data:image/png;base64, ${roomInfo.photo}`}
                     alt='Room photo'
                     style={{width:'100%', height:'200px'}}
                />
                 <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th>Roomm Types </th>
                        <th>{roomInfo.roomType}</th>
                      </tr>
                      <tr>
                        <th>Roomm Price</th>
                        <th>$ {roomInfo.roomPrice}</th>
                      </tr>
                      <tr>
											<th>Room Service:</th>
											<td>
												<ul className="list-unstyled">
													<li>  <FaWifi /> Wifi </li>
                          <li>	<FaTv /> Netfilx Premium</li>
                          <li>	<FaUtensils /> Breakfast</li>
                          <li>	<FaWineGlassAlt /> Mini bar refreshment</li>
                          <li>	<FaCar /> Car Service</li>
                          <li>	<FaParking /> Parking Space</li>
                          <li>	<FaTshirt /> Laundry</li>
												</ul>
											</td>
										</tr>
                    </tbody>
                 </table>
              </div>
            )}
          </div>
          <div className='col-md-9 ' >
            <BookingForm />
          </div>
        </div>
      </section>
      <div className='container'>
          <RoomCarousel />
      </div>
    </div>
  )
}

export default CheckOut
