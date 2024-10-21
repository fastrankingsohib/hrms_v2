import React from 'react'
import interview_vector from "../../../assets/hooks/interview-vector.svg"
import { Link } from 'react-router-dom'

function InterviewLanding() {
  return (
    <div>
      <div className='h-[90vh] overflow-auto flex items-center justify-center'>
        <div>
          <img className='-mt-40' src={interview_vector} alt="" width={"300px"} />
          {/* <div className='text-center'>Select Any Interview For Action</div> */}
          {/* <div className='text-center'>Or</div>
          <div className='text-center'><Link to={"/candidates/new-candidate"} className='underline hover:text-indigo-700'>Create New Candidate</Link></div> */}
        </div>
      </div>
    </div>
  )
}

export default InterviewLanding