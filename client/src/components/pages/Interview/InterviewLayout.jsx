import React from 'react'
import AllInterviews from './AllInterviews'

function InterviewLayout() {
    return (
        <div className='h-full w-full overflow-hidden'>
            {/* Interviews List */}
            {/* Interviews filters */}
            <div className='w-1/4 h-full pb-4'>
                {/* <div>Filter</div> */}
                <AllInterviews />
            </div>

            <div className='w-3/4'></div>
        </div>
    )
}

export default InterviewLayout