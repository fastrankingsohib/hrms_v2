import React from 'react'
import CandidateSvg from "../../../assets/hooks/candidate001.gif"
import { Link } from 'react-router-dom'

function CandidateLanding() {
  return (
    <div className='h-[90vh] overflow-auto flex items-center justify-center'>
        <div>
            <img className='-mt-40' src={CandidateSvg} alt="" width={"300px"} />
            <div className='text-center'>Select Any Candidate For Action</div>
            {/* <div className='text-center'>Or</div>
            <div className='text-center'><Link to={"/candidates/new-candidate"} className='underline hover:text-indigo-700'>Create New Candidate</Link></div> */}
        </div>
    </div>
  )
}

export default CandidateLanding