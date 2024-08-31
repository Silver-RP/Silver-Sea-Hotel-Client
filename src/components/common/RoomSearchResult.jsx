// import React from 'react'
import React, { useState } from 'react'
import { Button, Row } from 'react-bootstrap';
import RoomCard from '../room/RoomCard';
import Room from '../room/Room';

const RoomSearchResult = ({result, onClearSearch}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [resultPerPage] = useState(5);
    const totalResults = result.length;
    const totalPage = Math.ceil(totalResults / resultPerPage);
    const handlePageChange = (page)=>{
        setCurrentPage(page);
    }
    const startIndex = (currentPage - 1) * resultPerPage;
    const endIndex = startIndex + resultPerPage;
    const paginatedResult = result.slice(startIndex, endIndex);

  return (
    <>
      <div>
        {result.length > 0 ? (
            <>
            <h5 className='text-center mt-5'>Search result</h5>
            <Row>
                {paginatedResult.map((room) => (
                <RoomCard key={room.id} room={room} />
                ))}
            </Row>
            <Row>
                    {totalResults > resultPerPage && (
                        <RoomPagination
                            totalPage={totalPage}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    )}
                    <Button variant='secondary' onClick={onClearSearch}>
                        Clear Search
                    </Button>
            </Row>
            </>
        ): (
            <p></p>
            
        )}
        
      </div>
    </>
    
  )
}

export default RoomSearchResult
