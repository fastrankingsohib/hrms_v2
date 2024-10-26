import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import Sidebar from "../requires/Sidebar"
import TopBar from '../requires/TopBar';

const Layout = () => {
    const Navigate = useNavigate();
    const userLoggedIn = useSelector((state) => state.user_auth);
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    useEffect(() => {
        if(!user.loggedIn){
            Navigate('/login');
        }
    })
    useEffect(() => {
        axios.get("/all-candidates")
        .then((res) => {
        })
        .catch((err) => {
            if(err.status == 401){
                Navigate("/login")
            }
        })
    })
    return(
        <section className="flex h-screen max-h-screen overflow-auto">
            <div className="w-full md:w-96 bg-white border overflow-auto"><Sidebar /></div>
            <div className="w-full overflow-hidden">
                <div className="w-full h-24 border border-l-0 sticky top-0 bg-white z-20"><TopBar /></div>
                <div className="w-full overflow-auto" style={{height: 'calc(100vh - 5rem)'}}><Outlet /></div>
            </div>
        </section>
    )
}

export default Layout;