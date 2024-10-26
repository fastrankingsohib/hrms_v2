import axios from 'axios';
import React, { useEffect, useState } from 'react';

function CandidateComments(props) {
    const [allComments, setAllComments] = useState([]);
    const [comment, setComment] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Loading state for posting comments
    const user = localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : null;

    useEffect(() => {
        axios.get(`/display-comments/${props.candidateId}`)
            .then((res) => {
                setAllComments(res.data.data);
            })
            .catch((err) => {
                // console.log(err);
            });
    }, [props.candidateId]); // Add candidateId as a dependency

    const postComment = () => {
        // Trim the comment to remove leading/trailing whitespace
        const trimmedComment = comment.trim();

        // Check if the comment is empty
        if (trimmedComment === "") {
            alert("Comment cannot be empty! Please enter a valid comment.");
            return; // Exit the function to prevent submission
        }

        setIsLoading(true); // Start loading when posting the comment
        axios.post("/add-comments",
            {
                "candidate_id": props.candidateId,
                "comment": trimmedComment, // Use trimmed comment
                "created_by": user ? user.username : "unknown-commentor"
            }
        )
            .then((res) => {
                setComment(""); // Clear the comment field
                // Fetch All Comments Again
                axios.get(`/display-comments/${props.candidateId}`)
                    .then((res) => {
                        setAllComments(res.data.data);
                        setIsLoading(false); // Stop loading after comment is posted
                    })
                    .catch((err) => {
                        // console.log(err);
                        setIsLoading(false); // Stop loading even if there's an error
                    });
            })
            .catch((err) => {
                // console.log(err);
                setIsLoading(false); // Stop loading even if there's an error
            });
    };

    // Function to calculate "time ago"
    const timeAgo = (date) => {
        const now = new Date();
        const secondsAgo = Math.floor((now - new Date(date)) / 1000);

        if (secondsAgo < 60) return `${secondsAgo} secs ago`;
        const minutesAgo = Math.floor(secondsAgo / 60);
        if (minutesAgo < 60) return `${minutesAgo} mins ago`;
        const hoursAgo = Math.floor(minutesAgo / 60);
        if (hoursAgo < 24) return `${hoursAgo} hrs ago`;
        const daysAgo = Math.floor(hoursAgo / 24);
        if (daysAgo < 30) return `${daysAgo} days ago`;
        const monthsAgo = Math.floor(daysAgo / 30);
        if (monthsAgo < 12) return `${monthsAgo} mon ago`;
        const yearsAgo = Math.floor(monthsAgo / 12);
        return `${yearsAgo} years ago`;
    };

    return (
        <div>
            <div className='p-4'>
                <h1 className='text-xl font-semibold'>Candidate Comments & History</h1>
                <div className='mt-4'>
                    <textarea
                        id="add-new-comment"
                        placeholder='Hey Recruiter, Write Your Comment For The Candidate...'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className='mt-2 p-4 border bg-gray-100 rounded-lg w-full h-40'
                        disabled={isLoading} // Disable input while loading
                    ></textarea>
                    <div className='text-right'>
                        <button
                            className='p-2.5 px-5 bg-indigo-700 text-white rounded-lg mt-2'
                            onClick={postComment}
                            disabled={isLoading} // Disable button while loading
                        >
                            {isLoading ? 'Posting...' : 'Post Comment'}
                        </button>
                    </div>
                </div>

                <br />
                <div className='grid gap-4'>
                    <h1 className='text-xl font-bold'>All Comments</h1>
                    {
                        allComments.length > 0 ?
                            allComments.slice().reverse().map((value, index) => { // Reverse the array
                                const createdAt = new Date(value.created_at);
                                return (
                                    <div key={index} className='bg-gray-50 rounded-xl p-4'>
                                        <div className='text-sm'>
                                            @{value.created_by} |
                                            <span className="ml-2 text-gray-500">
                                                {timeAgo(createdAt)}
                                            </span> |
                                            {` ${createdAt.toLocaleString('en-US', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true
                                            })}`}
                                        </div>
                                        <div className='mt-2'>{value.comment}</div>
                                    </div>
                                );
                            })
                            : <div>No Comments For This Candidate!</div>
                    }

                </div>

                <br />
                <hr />
                <br />
            </div>
        </div>
    );
}

export default CandidateComments;