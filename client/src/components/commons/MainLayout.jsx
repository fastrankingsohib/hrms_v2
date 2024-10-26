import React, { useEffect } from 'react'
import { json, Outlet, useNavigate } from 'react-router-dom'

function MainLayout() {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
    const userDetails = localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : null
    const location = useNavigate()
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify([1, 2, 3]));
        localStorage.setItem("userDetails", JSON.stringify([1, 2, 3]));

        if (user === null || userDetails === null) {
            location("/login");
        }
    }, [])
    return (
        <div><Outlet /></div>
    )
}

export default MainLayout