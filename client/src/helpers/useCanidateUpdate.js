import axios from "axios"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";

const useCandidateUpdate = () => {
    const navigate = useNavigate()
    const [updateEvents, setUpdateEvents] = useState({
        loading: false,
        error: false,
        success: false,
    });
    const updateCandidate = (candidateId, candidateEducation, candidateExperience, personalDetails, candidateSkills, candidateHobbies, candidateComment) => {
        setUpdateEvents({loading: true, error: false, success: false})
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
                "hobbies": personalDetails.hobbies,
                "interests": personalDetails.interests,
                "skills": personalDetails.skills,
                "recruiter_comments": personalDetails.recruiter_comments,
                "communication_skills": personalDetails.communication_skills,
                "other1": personalDetails.other1,
                "other2": personalDetails.other2,
                "other3": personalDetails.other3,
                "status": personalDetails.status,
                "qualifications": candidateEducation,
                "experiences": candidateExperience,
                "jobs": personalDetails.jobs,
                "created_by": personalDetails.created_by
            }
        )
            .then((res) => {
                // Event Hanling
                console.log(res.data)
                setUpdateEvents({ loading: false, error: false, success: true });
                setTimeout(() => {
                    setUpdateEvents({ loading: false, error: false, success: false });
                }, 5000)
            })
            .catch((err) => {
                console.log(err)
                // Event Hanling
                setUpdateEvents({ loading: false, error: true, success: false });
            })




        // console.log(
        //     {
        //         "title": personalDetails.title,
        //         "first_name": personalDetails.first_name,
        //         "middle_name": personalDetails.middle_name,
        //         "last_name": personalDetails.last_name,
        //         "address_line1": personalDetails.address_line1,
        //         "address_line2": personalDetails.address_line2,
        //         "city": personalDetails.city,
        //         "state": personalDetails.state,
        //         "pin_code": personalDetails.pin_code,
        //         "country": personalDetails.country,
        //         "contact_number": personalDetails.contact_number,
        //         "alt_contact_number": personalDetails.alt_contact_number,
        //         "email_address": personalDetails.email_address,
        //         "alt_email_address": personalDetails.alt_email_address,
        //         "date_of_birth": personalDetails.date_of_birth,
        //         "job_title": personalDetails.job_title,
        //         "department": personalDetails.department,
        //         "work_experience": candidateEducation,
        //         "hobbies": personalDetails.hobbies,
        //         "interests": personalDetails.interests,
        //         "skills": personalDetails.skills,
        //         "recruiter_comments": personalDetails.recruiter_comments,
        //         "communication_skills": personalDetails.communication_skills,
        //         "other1": personalDetails.other1,
        //         "other2": personalDetails.other2,
        //         "other3": personalDetails.other3,
        //         "status": personalDetails.status,
        //         "qualifications": candidateEducation,
        //         "experiences": candidateExperience,
        //         "jobs": personalDetails.jobs,
        //         "created_by": personalDetails.created_by
        //     }
        // )
    }
    return ({ updateEvents, updateCandidate })
}
export default useCandidateUpdate;