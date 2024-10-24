import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function AppliedJobs(props) {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [allJobs, setAllJobs] = useState([]);
    const location = useLocation();
    const [newAppliedJobs, setNewAppliedJobs] = useState({
        jobs: [],  // Stores selected jobs
        toggled: false, // Toggles the dropdown
        success: true, 
        error: false, 
        loading: false
    });

    useEffect(() => {
        axios.get(`/applicants-applied-jobs/${props.candidateId}`)
            .then((res) => {
                const fetchedJobs = res.data.data;
                setAppliedJobs(fetchedJobs);
                // Initialize selected jobs to an empty array, preventing default selection
                setNewAppliedJobs((values) => ({ ...values, jobs: [] }));
            })
            .catch((err) => {
                console.log(err);
            });
    }, [location, props.candidateId]);

    // Fetching All Jobs
    useEffect(() => {
        axios.get("/display_jobs")
            .then((res) => {
                setAllJobs(res.data.jobs);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleJobsSelection = (job, isChecked) => {
        setNewAppliedJobs((prevValues) => {
            const jobId = job.id; // Use job.id from all jobs context
            const isAlreadySelected = prevValues.jobs.some(selectedJob => selectedJob.job_id === jobId);

            if (isChecked) {
                // If checked, add the job to the selected jobs if it's not already selected
                if (!isAlreadySelected) {
                    return { ...prevValues, jobs: [...prevValues.jobs, { ...job, job_id: jobId }] }; // Ensure job_id is included
                }
            } else {
                // If unchecked, remove from selected jobs
                const updatedJobs = prevValues.jobs.filter(selectedJob => selectedJob.job_id !== jobId);
                return { ...prevValues, jobs: updatedJobs };
            }

            return prevValues; // Return the previous state if no changes were made
        });
    };

    const updateAppliedJobs = () => {
        let allJobs = [];
        let candidate_id = props.candidateId;
        newAppliedJobs.jobs.map((value) => {
            allJobs.push(value.job_id); // Use job_id consistently
        });

        setNewAppliedJobs((values) => ({...values, loading: true, success: false, error: false}))
        axios.post(`/add_job_application`, {
            "job_ids": allJobs,
            "candidate_id": Number(candidate_id)
        })
        .then((res) => {
                axios.get(`/applicants-applied-jobs/${props.candidateId}`)
                    .then((res) => {
                        const fetchedJobs = res.data.data;
                        setAppliedJobs(fetchedJobs);
                        // Initialize selected jobs to an empty array, preventing default selection
                        setNewAppliedJobs((values) => ({ ...values, jobs: [], toggled: false, success: true, error: false, loading: false }));
                        setTimeout(() => {
                            setNewAppliedJobs((values) => ({...values, loading: false, success: false, error: false}))
                        }, 1000)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
                setNewAppliedJobs((values) => ({...values, loading: false, success: false, error: false}))
                setTimeout(() => {
                    setNewAppliedJobs((values) => ({...values, loading: false, success: false, error: false}))
                }, 1000)
            });
    };

    return (
        <div className='h-full sticky top-0'>
            <div className='flex items-center justify-between p-4'>
                <h1 className='text-xl font-bold'>All Applied Jobs</h1>
                <div className='flex items-center gap-4'>
                    <div className={`${newAppliedJobs.toggled ? "block" : "hidden"}`}>
                        <div className='w-80'>
                            <div className="relative">
                                <div className={`select-none absolute grid gap-1 -top-6 rounded-xl right-0 p-1 bg-white shadow-2xl border w-full ${newAppliedJobs.toggled ? "block" : "hidden"}`}>
                                    {allJobs.length > 0 ? (
                                        allJobs.map((value, key) => {
                                            const isChecked = newAppliedJobs.jobs.some(job => job.job_id === value.id);

                                            if (value.job_status === "Active") {
                                                return (
                                                    <label
                                                        key={key}
                                                        htmlFor={`job-id-${key}`}
                                                        className="flex items-center gap-4 p-2.5 bg-gray-50 hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        <input
                                                            id={`job-id-${key}`}
                                                            type="checkbox"
                                                            checked={isChecked}
                                                            onChange={(e) => {
                                                                handleJobsSelection(value, e.target.checked);
                                                            }}
                                                        />
                                                        <span>{value.job_title}</span>
                                                    </label>
                                                );
                                            }
                                            return null;
                                        })
                                    ) : (
                                        <div className="p-4">No Jobs Found!</div>
                                    )}

                                    <button className={`p-2.5 bg-black text-white rounded-md mt-0.5 ${newAppliedJobs.loading ? "bg-opacity-50 cursor-not-allowed" : ""}`} onClick={updateAppliedJobs} disabled={newAppliedJobs.loading}>{newAppliedJobs.loading ? "Updating..." : newAppliedJobs.success ? "Jobs Updated" : "Update Jobs"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        className={`p-2.5 px-5 rounded-full border ${newAppliedJobs.toggled ? "bg-black text-white border-black" : "bg-gray-100"} ${newAppliedJobs.loading ? "opacity-70 cursor-not-allowed" : "opacity-100"}`}
                        onClick={() => setNewAppliedJobs((values) => ({ ...values, toggled: !newAppliedJobs.toggled }))}
                    >
                        Update jobs
                    </button>
                </div>
            </div>
            <div className='grid grid-cols-4 bg-gray-100'>
                <div className='p-4 font-semibold'>Job ID</div>
                <div className='p-4 font-semibold'>Job Title</div>
                <div className='p-4 font-semibold'>Applied Date</div>
                <div className='p-4 font-semibold'>Candidate Status On Job</div>
            </div>
            {
                appliedJobs.length > 0 ? (
                    appliedJobs.map((value, index) => (
                        <div key={index} className='grid grid-cols-4 hover:bg-gray-50'>
                            <div className='p-4'>#{value.job.id}</div>
                            <div className='p-4'>{value.job.job_title}</div>
                            <div className='p-4'>
                                {
                                    new Date(value.created_at).toLocaleString('en-US', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true
                                    })
                                }
                            </div>
                            <div className='p-4'>{value.job_candidate_status}</div>
                        </div>
                    ))
                ) : (
                    <div className='p-4'>No Applied Jobs Found!</div>
                )
            }
        </div>
    );
}

export default AppliedJobs;
