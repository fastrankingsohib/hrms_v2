import { Link, NavLink } from "react-router-dom";
import '../../style/theme/theme.scss'
import { HiMiniPlus } from "react-icons/hi2";
import { FaList } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { TbTimelineEventFilled } from "react-icons/tb";
import { ImUsers } from "react-icons/im";
import { FaUserPlus } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { TiCancel } from "react-icons/ti";
import { BsFillClockFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { HiPlusSm } from "react-icons/hi";
import logo from '../../assets/mahakaya.png'
import useLogout from "../../helpers/useLogout";
import { FaUsers } from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
    const { logout } = useLogout();
    const [dropdowns, setDropdowns] = useState({
        user: false,
        jobs: false,
    })
    return(
        <section className="relative h-full">
            <div className="pt-8 flex items-center justify-center">
                <img src={logo} width={'100px'} />
            </div>
            <h1 className="p-4 mb-8 text-xl text-center">HR Management System</h1>

            <div className="p-4 select-none">
                <div>
                    <div className="p-3 font-bold cursor-pointer"
                        onClick={() => {
                            setDropdowns((values) => ({...values, user: !dropdowns.user}));
                        }}
                    >Administration</div>
                    <div style={{display: dropdowns.user ? 'block' : 'none'}}>
                        <NavLink to={'/add-new-user'} className={({isActive}) => `${isActive ? 'side-bar-active' : 'side-bar-default'}`}><HiPlusSm size={'20px'} className="w-10" /> Add New User</NavLink>
                        <NavLink to={'/all-users'} className={({isActive}) => `${isActive ? 'side-bar-active' : 'side-bar-default'}`}><FaUsers size={'14px'} className="w-10" /> All Users</NavLink>
                    </div>
                </div>
                
                
                <div>
                    <div className="p-3 font-bold cursor-pointer"
                        onClick={() => {
                            setDropdowns((values) => ({...values, jobs: !dropdowns.jobs}));
                        }}
                    >Others</div>
                    <div style={{display: dropdowns.jobs ? 'block' : 'none'}}>
                    <NavLink to={'/add-new-candidate'} className={({isActive}) => `${isActive ? 'side-bar-active' : 'side-bar-default'}`}><FaUserPlus size={'14px'} className="w-10" /> Add New candidate</NavLink>
                        <NavLink to={'/post-new-job'} className={({isActive}) => `${isActive ? 'side-bar-active' : 'side-bar-default'}`}><IoCreate size={'18px'} className="w-10" /> Post New Job</NavLink>
                    </div>
                </div>
                {/* <NavLink to={'/add-new-candidate'} className={({isActive}) => `${isActive ? 'side-bar-active' : 'side-bar-default'}`}><FaUserPlus size={'14px'} className="w-10" /> Add New candidate</NavLink>
                <NavLink to={'/all-job-posts'} className={({isActive}) => `${isActive ? 'side-bar-active' : 'side-bar-default'}`}><FaList size={'14px'} className="w-10" /> All Job Posts</NavLink>
                <NavLink to={'/scheduled-interviews'} className={({isActive}) => `${isActive ? 'side-bar-active' : 'side-bar-default'}`}><BsCalendar2CheckFill size={'13px'} className="w-10" />Scheduled Interviews</NavLink>
                <NavLink to={'/in-pipeline'} className={({isActive}) => `${isActive ? 'side-bar-active' : 'side-bar-default'}`}><TbTimelineEventFilled size={'18px'} className="w-10" /> In Pipeline</NavLink>
                <NavLink to={'/all-candidates'} className={({isActive}) => `${isActive ? 'side-bar-active' : 'side-bar-default'}`}><ImUsers size={'14px'} className="w-10" /> All Candidates</NavLink>
                <NavLink to={'/offered-candidates'} className={({isActive}) => `${isActive ? 'side-bar-active' : 'side-bar-default'}`}><FaCircleCheck size={'14px'} className="w-10" /> Offered Candidates</NavLink>
                <NavLink to={'/rejected-candidates'} className={({isActive}) => `${isActive ? 'side-bar-active' : 'side-bar-default'}`}><TiCancel size={'20px'} className="w-10" /> Rejected Candidates</NavLink>
                <NavLink to={'/on-hold'} className={({isActive}) => `${isActive ? 'side-bar-active' : 'side-bar-default'}`}><BsFillClockFill size={'15px'} className="w-10" /> On Hold</NavLink> */}
            </div>

            <div className="absolute bottom-0 w-full p-4">
                <button className="primary-button" onClick={logout}><FiLogOut size={'16px'} className="w-10 rotate-180" /> Logout</button>
            </div>
        </section>
    )
}

export default Sidebar;