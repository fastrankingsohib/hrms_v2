import React from 'react';
import jobs_vector from "../../../assets/hooks/jobs-vector.svg";
import { Link } from 'react-router-dom';

function JobLanding() {
    return (
        <div className='h-full flex items-center justify-center select-none'>
            <div className='-mt-10'>
                <img src={jobs_vector} width={"200px"} alt="" />
                <div className='text-center mt-10'>Select Any Job For Action</div>
                <div className='text-center'>Or</div>
                <div className='text-center'><Link to={"/jobs/new-job"} className='underline hover:text-indigo-700'>Create New Job</Link></div>
            </div>
        </div>
    )
}
export default JobLanding;