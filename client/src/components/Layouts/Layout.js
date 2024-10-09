import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Requires/Sidebar";
import TopBar from "../Requires/TopBar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Layout = () => {
    const Navigate = useNavigate();
    const userLoggedIn = useSelector((state) => state.user_auth);
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    useEffect(() => {
        if(!user.loggedIn){
            Navigate('/login');
        }
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