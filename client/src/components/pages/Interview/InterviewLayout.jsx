import React from 'react'
import AllInterviews from './AllInterviews'
import { Outlet } from 'react-router-dom'

function InterviewLayout() {
    return (
        <div className='h-full w-full flex overflow-auto'>
            {/* Interviews List */}
            {/* Interviews filters */}
            <div className='w-1/4 h-full pb-4'>
                {/* <div>Filter</div> */}
                <AllInterviews />
            </div>

            <div className='w-3/4 h-full'><Outlet /></div>
        </div>
    )
}

export default InterviewLayout