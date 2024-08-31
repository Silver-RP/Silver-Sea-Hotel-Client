import React, { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';

const DateSlider = ({ onDateChange, onFilterChange }) => {
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    const handleSelect = (ranges) => {
        setDateRange([ranges.selection]);
        onDateChange(ranges.selection.startDate, ranges.selection.endDate);
        onFilterChange(ranges.selection.startDate, ranges.selection.endDate);
    };

    const handleClearFilter = () => {
        setDateRange([
            {
                startDate: new Date(),
                endDate: null,
                key: 'selection'
            }
        ]);
        onDateChange(null, null);
        onFilterChange(null, null);
    };

    return (
        <>
            <h5>Filter Bookings by Date</h5>
            <DateRangePicker
                ranges={dateRange}
                onChange={handleSelect}
                months={2}
                direction='horizontal'
                className='mb-4'
            />
            <button onClick={handleClearFilter} className='btn btn-secondary' style={{ backgroundColor: "#f55d42" }}>Clear Filter</button>
        </>
    );
};

export default DateSlider;



// import React, { useState } from "react"
// import "react-date-range/dist/styles.css"
// import "react-date-range/dist/theme/default.css"
// import { DateRangePicker } from "react-date-range"

// const DateSlider = ({ onDateChange, onFilterChange }) => {
// 	const [dateRange, setDateRange] = useState({
// 		startDate: undefined,
// 		endDate: undefined,
// 		key: "selection"
// 	})

// 	const handleSelect = (ranges) => {
// 		setDateRange(ranges.selection)
// 		onDateChange(ranges.selection.startDate, ranges.selection.endDate)
// 		onFilterChange(ranges.selection.startDate, ranges.selection.endDate)
// 	}

// 	const handleClearFilter = () => {
// 		setDateRange({
// 			startDate: undefined,
// 			endDate: undefined,
// 			key: "selection"
// 		})
// 		onDateChange(null, null)
// 		onFilterChange(null, null)
// 	}
// 	return (
// 		<>
// 			<h5>Filter bookings by date</h5>
// 			<DateRangePicker ranges={[dateRange]} onChange={handleSelect} className="mb-4" />
// 			<button className="btn btn-secondary" onClick={handleClearFilter}>
// 				Clear Filter
// 			</button>
// 		</>
// 	)
// }

// export default DateSlider