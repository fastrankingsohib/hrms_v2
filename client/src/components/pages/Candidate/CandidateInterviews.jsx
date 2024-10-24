import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoMdRefresh } from "react-icons/io";

function CandidateInterviews(props) {
    const [allUsers, setAllUsers] = useState([]);
    const [allJobs, setAllJobs] = useState([]);
    const [allInterview, setAllInterviews] = useState([]);
    const [events, setEvents] = useState({
        loading: false,
        success: false,
        error: false
    });

    useEffect(() => {
        // All Users API
        axios.get("/user/all-users")
            .then((res) => {
                setAllUsers(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });

        // All Jobs
        axios.get("/display_jobs")
            .then((res) => {
                setAllJobs(res.data.jobs);
            })
            .catch((err) => console.log(err));

        // Candidate Interviews
        axios.get(`/candidate-interview/${props.candidateId}`)
            .then((res) => {
                setAllInterviews(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.candidateId]);

    const reloadInterviews = () => {
        setEvents({ loading: true, success: false, error: false });
        axios.get(`/candidate-interview/${props.candidateId}`)
            .then((res) => {
                setAllInterviews(res.data.data);
                setEvents({ loading: false, success: true, error: false });
            })
            .catch((err) => {
                console.log(err);
                setEvents({ loading: false, success: false, error: true });
            });
    };

    return (
        <div className='h-full sticky top-0'>
            <div className='p-4 flex items-center justify-between'>
                <h1 className='text-xl font-bold'>Candidate Interviews</h1>
                <button 
                    className='p-2.5 px-5 rounded-full bg-black text-white inline-flex items-center gap-2'
                    onClick={reloadInterviews}
                    disabled={events.loading} // Disable button when loading
                >
                    <IoMdRefresh size={"17px"} className={`${events.loading ? "animate-spin" : ""}`} />
                    {events.loading ? "Refreshing..." : "Refresh Interviews"}
                </button>
            </div>

            {events.error && <div className="text-red-500">Failed to refresh interviews. Please try again.</div>}

            <div className='grid grid-cols-7 bg-gray-100'>
                <div className='p-4 font-semibold'>Interview ID</div>
                <div className='p-4 font-semibold'>Job</div>
                <div className='p-4 font-semibold'>Interview Date</div>
                <div className='p-4 font-semibold'>Interview Time</div>
                <div className='p-4 font-semibold'>Interviewer</div>
                <div className='p-4 font-semibold'>Interview Round</div>
                <div className='p-4 font-semibold'>Remarks</div>
            </div>

            {allInterview.length > 0 ? allInterview.map((value, index) => (
                <div className='grid grid-cols-7 hover:bg-gray-50' key={index}>
                    <Link to={`/interviews/view/${value.id}`} className='p-4 hover:underline hover:text-indigo-700'>#{value.id}</Link>
                    <div className='p-4'>
                        {allJobs.length > 0 ? allJobs.map((job, index) => {
                            if (job.id === value.job_id) {
                                return <Link key={index} className='hover:underline hover:text-indigo-700' to={`/jobs/view/${job.id}`}>{job.job_title}</Link>;
                            }
                            return null;
                        }) : "No Job Selected!"}
                    </div>
                    <div className='p-4'>{value.interview_date}</div>
                    <div className='p-4'>{value.interview_time}</div>
                    <div className='p-4'>
                        {allUsers.length > 0 ? allUsers.map((user, index) => {
                            if (Number(user.id) === Number(value.interviewer)) {
                                return `${user.title} ${user.first_name} ${user.middle_name} ${user.last_name}`;
                            }
                            return null;
                        }) : "No User Found!"}
                    </div>
                    <div className='p-4'>{value.interview_round}</div>
                    <div className='p-4'>{value.remarks}</div>
                </div>
            )) : <div className='p-4'>No Interviews Found!</div>}
        </div>
    );
}

export default CandidateInterviews;
