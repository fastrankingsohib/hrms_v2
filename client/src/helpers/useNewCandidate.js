import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useNewCandidate = () => {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const loggedInUser = localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : null;
    const navigate = useNavigate();

    const registerCandidate = (candidate, experiences, educations, skills, hobbies, selectedJobs, currentStatus, status, newInterviewDetails) => {
        // Register candidate logic here
        setLoading(true);

        // Convert skills array to a string by extracting the skill property
        const skillsString = skills.map(skill => skill.skill).join(', '); // Adjust 'skill' if needed

        // Convert hobbies array to a string by extracting the hobby property
        const hobbiesString = hobbies.map(hobby => hobby.hobby).join(', '); // Adjust 'hobby' if needed

        let new_candidate = {
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
            // Use the converted hobbies string here
            "hobbies": hobbiesString, // Now it's a string
            "interests": "interests",
            // Use the converted skills string here
            "skills": skillsString,
            "recruiter_comments": "tsgs",
            "communication_skills": "shhshs",
            "other1": "",
            "other2": "",
            "other3": "",
            "current_status": candidate.current_status,
            "status": candidate.status,
            "created_by": loggedInUser.username,
            "user_reporting_to": loggedInUser.reporting_to,
            "jobs": selectedJobs,
            "experiences": experiences,
            "work_tenure": `${candidate.work_tenure}`,
            "qualifications": educations,
        };

        axios.post("/add-candidate", new_candidate)
            .then((response) => {
                setLoading(false);
                setSuccess(true);
                setError(false);
                navigate(`/candidates/view/${response.data.candidate_id}`);

                setTimeout(() => {
                    setSuccess(false);
                }, 3000);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setSuccess(false);
                setError(true);

                setTimeout(() => {
                    setError(false);
                }, 3000);
            });

        console.log(new_candidate); // For debugging purposes
    };

    return { registerCandidate, loading, success, error };
};

export default useNewCandidate;