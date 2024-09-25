import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Layout = () => {
    const Navigate = useNavigate();
    const userLoggedIn = useSelector((state) => state.user_auth);
    useEffect(() => {
        if(!userLoggedIn.logged_in){
            setTimeout(() => {
                // Navigate('/login')
            }, 2000)
        }
    })
    return(
        <section className="flex h-screen max-h-screen overflow-hidden">
            <div className="w-full md:w-96 bg-white border overflow-auto"><Sidebar /></div>
            <div className="w-full overflow-auto">
                <div className="w-full min-h-20 border border-l-0 sticky top-0 bg-white"><TopBar /></div>
                <div className="w-full"><Outlet /></div>
            </div>
        </section>
    )
}

export default Layout;