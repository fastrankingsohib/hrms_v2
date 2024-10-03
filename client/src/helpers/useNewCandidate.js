import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";

const useNewCandidate = () => {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const loggedInUser = localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : []
    const Navigate = useNavigate()
    const registerCandidate = (candidate, experiences, educations, skills, hobbies) => {
        // register candidate logic here
        setLoading(true)
        let new_candidate =
        {
            "title": `${candidate.title}`,
            "first_name": `${candidate.first_name}`,
            "middle_name": `${candidate.middle_name}`,
            "last_name": `${candidate.last_name}`,
            "address_line1": `${candidate.address_line1}`,
            "address_line2": `${candidate.address_line2}`,
            "city": `${candidate.city}`,
            "state": `${candidate.state}`,
            "pin_code": "656758",
            "country": `${candidate.country}`,
            "contact_number": `${candidate.contact_number}`,
            "alt_contact_number": `${candidate.alt_contact_number}`,
            "email_address": `${candidate.email_address}`,
            "alt_email_address": `${candidate.alt_email_address}`,
            "date_of_birth": `${candidate.date_of_birth}`,
            "job_title": `${candidate.job_title}`,
            "department": `${candidate.department}`,
            "work_experience": 'Experience',
            "hobbies": "hobbies",
            "interests": "interests",
            "skills": "skills",
            "recruiter_comments": "tsgs",
            "communication_skills": "shhshs",
            "other1": "Additional info 1",
            "other2": "Additional info 2",
            "other3": "Additional info 3",
            "status": "Active",
            "created_by": loggedInUser.username,
            "experiences": experiences,
            "qualifications": educations,
        }

        axios.post("/add-candidate", new_candidate)
        .then((response) => {
            console.log(response.data);
            setLoading(false)
            setSuccess(true)
            setError(false)

            setTimeout(() => {
                setSuccess(false)
                Navigate("/my-candidates")
            }, 3000)
        })
        .catch((err) => {
            console.log(err);
            setLoading(false)
            setSuccess(false)
            setError(true)

            setTimeout(() => {
                setError(false)
            }, 3000)
        })
        console.log(new_candidate)
    }

    return { registerCandidate, loading, success, error }
}

export default useNewCandidate