import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function AllUsers() {
    const [allUser, setAllUsers] = useState([]);

    useEffect(() => {
        // Fetching all users on component mount
        axios.get("/user/all-users")
            .then((response) => {
                setAllUsers(response.data.data);
                setLoading(false)
                console.log(loading)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const scaleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [loading, setLoading] = useState(true)
    const handleDelete = (userId) => {
        // Show confirmation dialog
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            // Call the API to delete the user if confirmed
            axios.get(`/delete-user/${userId}`)
                .then(() => {
                    console.log("User deleted successfully");
                    // Optionally, remove the deleted user from the state
                    setAllUsers(allUser.filter(user => user.id !== userId));
                })
                .catch((err) => console.log(err));
        }
    };

    if (loading) {
        return (
            <div className='h-full w-full flex items-center justify-center bg-gray-100'>
                <AiOutlineLoading3Quarters className='animate-spin mr-4' size={"20px"} />Loading...
            </div>
        )
    }

    return (
        <div className='overflow-auto'>
            <div className='flex w-full'>
                <div className='w-full min-w-60 font-bold p-3 border'>Action</div>
                <div className='w-full min-w-60 font-bold p-3 border'>Employee ID</div>
                <div className='w-full min-w-60 font-bold p-3 border'>Name</div>
                <div className='w-full min-w-60 font-bold p-3 border'>Username</div>
                <div className='w-full min-w-60 font-bold p-3 border'>Gender</div>
                <div className='w-full min-w-60 font-bold p-3 border'>DOB</div>
                <div className='w-full min-w-60 font-bold p-3 border'>Email</div>
                <div className='w-full min-w-60 font-bold p-3 border'>Mobile</div>
                <div className='w-full min-w-60 font-bold p-3 border'>Date of Joining</div>
                <div className='w-full min-w-60 font-bold p-3 border'>Designation</div>
                <div className='w-full min-w-60 font-bold p-3 border'>Status</div>
                <div className='w-full min-w-60 font-bold p-3 border'>Department</div>
                <div className='w-full min-w-60 font-bold p-3 border'>User Type</div>
                <div className='w-full min-w-60 font-bold p-3 border'>Role</div>
                <div className='w-full min-w-60 font-bold p-3 border'>Reporting To</div>
            </div>

            {
                allUser.map((user) => (
                    <div className='flex w-full' key={user.id}> {/* Add key prop for unique identification */}
                        <div className='w-full min-w-60 p-3 border flex justify-between'>
                            <Link to={`/user/${user.id}`} className='p-1 rounded-full px-4 bg-green-500 text-white'>View</Link>
                            <button type='button' className='p-1 rounded-full px-4 bg-red-500 text-white'
                                onClick={() => handleDelete(user.id)} // Call handleDelete with user id
                            >Delete</button>
                        </div>
                        <div className='w-full min-w-60 p-3 border'>{user.employee_id}</div>
                        <div className='w-full min-w-60 p-3 border'>{`${user.title} ${user.first_name} ${user.middle_name}`}</div>
                        <div className='w-full min-w-60 p-3 border'>{user.username}</div>
                        <div className='w-full min-w-60 p-3 border'>{user.gender}</div>
                        <div className='w-full min-w-60 p-3 border'>{user.dob}</div>
                        <div className='w-full min-w-60 p-3 border'>{user.email}</div>
                        <div className='w-full min-w-60 p-3 border'>{user.mobile}</div>
                        <div className='w-full min-w-60 p-3 border'>{user.date_of_joining}</div>
                        <div className='w-full min-w-60 p-3 border'>{user.designation}</div>
                        <div className='w-full min-w-60 p-3 border'>{user.status}</div>
                        <div className='w-full min-w-60 p-3 border'>{user.department}</div>
                        <div className='w-full min-w-60 p-3 border'>{user.user_type}</div>
                        <div className='w-full min-w-60 p-3 border'>{user.role}</div>
                        <div className='w-full min-w-60 p-3 border'>{user.reporting_to}</div>
                    </div>
                ))
            }
        </div>
    );
}

export default AllUsers;
