import axios from 'axios';
import React, { useEffect, useState } from 'react'

function MyCandidates() {
    const [myCandidates, setMyCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        axios.get("/all-candidates")
        .then((response) => {
            setMyCandidates(response.data.candidates);
            setSuccess(true);
            setLoading(false);
            setError(false);
            setTimeout(() => {
                setSuccess(false)
            }, 3000)
        })
        .catch((err) => {
            setSuccess(true);
            setLoading(false);
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 3000)
        })
    }, [])
    return (
        <div>MyCandidates</div>
    )
}

export default MyCandidates