import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

const useNewCandidate = () => {
    const [data, setData] = useState({
        qualifications: [],
        experience: [],
        hobbies: [],
        skills: [],
    });

    

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const registerCandidate = (candidate, experiences, educations, skills, hobbies) => {
        // register candidate logic here
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
            "experiences": experiences,
            "qualifications": educations,
        }


        

        axios.post("/add-candidate", new_candidate).then((response) => console.log(response.data)).catch((err) => console.log(err))
       console.log(new_candidate)
    //    console.log(experiences)
    //    console.log(educations)
    //    console.log(skills)
    //    console.log(hobbies)
    }

    return { registerCandidate, loading, success }
}

export default useNewCandidate