import axios from "axios";
import { useState } from "react";


const useCandidateUpdate = () => {
    const [updateEvents, setUpdateEvents] = useState({
        loading: false,
        error: false,
        success: false,
    });

    const updateCandidate = (candidateId, candidateEducation, candidateExperience, personalDetails, candidateSkills, candidateHobbies, candidateJobs) => {
        setUpdateEvents({ loading: true, error: false, success: false });
        // console.log("candidateJobs.ids")
        // console.log(candidateJobs)
        const jobs = candidateJobs.ids
        console.log(jobs);
        console.log(candidateId);
        const newJobs = {
            "job_ids": jobs,
            "candidate_id": Number(candidateId)
        }
        console.log(newJobs)

        // Convert arrays to strings
        const skillsString = candidateSkills.join(', '); // Convert candidateSkills array to a comma-separated string
        const hobbiesString = candidateHobbies.join(', '); // Convert candidateHobbies array to a comma-separated string
        axios.post(`/update-candidate/${candidateId}`,
            {
                "title": personalDetails.title,
                "first_name": personalDetails.first_name,
                "middle_name": personalDetails.middle_name,
                "last_name": personalDetails.last_name,
                "address_line1": personalDetails.address_line1,
                "address_line2": personalDetails.address_line2,
                "city": personalDetails.city,
                "state": personalDetails.state,
                "pin_code": personalDetails.pin_code,
                "country": personalDetails.country,
                "contact_number": personalDetails.contact_number,
                "alt_contact_number": personalDetails.alt_contact_number,
                "email_address": personalDetails.email_address,
                "alt_email_address": personalDetails.alt_email_address,
                "date_of_birth": personalDetails.date_of_birth,
                "job_title": personalDetails.job_title,
                "department": personalDetails.department,
                "work_experience": "",
                // Use the converted strings for skills and hobbies
                "hobbies": hobbiesString, // Use the hobbies string
                "interests": "",
                "skills": skillsString, // Use the skills string
                "recruiter_comments": personalDetails.recruiter_comments,
                "communication_skills": personalDetails.communication_skills,
                "other1": personalDetails.other1,
                "other2": personalDetails.other2,
                "other3": personalDetails.other3,
                "status": personalDetails.status,
                "qualifications": candidateEducation,
                "experiences": candidateExperience,
                // "jobs": candidateJobs.ids,
                "created_by": personalDetails.created_by,
                // "candidate_applied_jobs": candidateJobs.ids     
            }
        )
            .then((res) => {
                // Event handling
                console.log(res.data);
                setUpdateEvents({ loading: false, error: false, success: true });
                setTimeout(() => {
                    setUpdateEvents({ loading: false, error: false, success: false });
                }, 5000);
            })
            .catch((err) => {
                console.log(err);
                // Event handling
                setUpdateEvents({ loading: false, error: true, success: false });
            });




        axios.post("/add_job_application", newJobs)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    };

    return ({ updateEvents, updateCandidate });
};

export default useCandidateUpdate;