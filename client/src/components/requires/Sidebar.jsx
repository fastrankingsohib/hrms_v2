import { Link, NavLink } from "react-router-dom";
import '../../style/theme/theme.scss';
import { HiMiniPlus } from "react-icons/hi2";
import { FaList, FaUsers, FaUserPlus } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { BsCalendar2CheckFill, BsFillClockFill } from "react-icons/bs";
import { TbTimelineEventFilled } from "react-icons/tb";
import { ImUsers } from "react-icons/im";
import { FaCircleCheck } from "react-icons/fa6";
import { TiCancel } from "react-icons/ti";
import { FiLogOut } from "react-icons/fi";
import { HiPlusSm } from "react-icons/hi";
import logo from '../../assets/mahakaya.png';
import useLogout from "../../helpers/useLogout";
import { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"; // Import arrow icons

const SidebarLink = ({ to, icon, label }) => (
    <NavLink to={to} className={({ isActive }) => (isActive ? 'side-bar-active' : 'side-bar-default')}>
        {icon} {label}
    </NavLink>
);

const Dropdown = ({ title, links, isOpen, toggle }) => (
    <div className="relative">
        <div className="flex items-center justify-between p-3 font-bold cursor-pointer" onClick={toggle}>
            <span>{title}</span>
            {isOpen ? <AiOutlineUp /> : <AiOutlineDown />} {/* Show arrows based on state */}
        </div>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
            <div className="bg-white">
                {links.map((link, index) => (
                    <SidebarLink key={index} {...link} />
                ))}
            </div>
        </div>
    </div>
);

const Sidebar = () => {
    const { logout } = useLogout();
    const [openDropdown, setOpenDropdown] = useState(null); // Track currently open dropdown

    const handleToggle = (dropdownName) => {
        setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName)); // Close if already open, otherwise open new
    };

    return (
        <section className="relative h-full">
            <div className="pt-8 flex items-center justify-center">
                <img src={logo} width={'100px'} alt="Logo" />
            </div>
            <h1 className="p-4 mb-8 text-xl text-center">HR Management System</h1>

            <div className="p-4 select-none">
                <Dropdown
                    title="Administration"
                    isOpen={openDropdown === 'user'} // Check if this dropdown is open
                    toggle={() => handleToggle('user')}
                    links={[
                        { to: '/add-new-user', icon: <HiPlusSm size={'20px'} className="w-10" />, label: 'Add New User' },
                        { to: '/all-users', icon: <FaUsers size={'14px'} className="w-10" />, label: 'All Users' },
                    ]}
                />
                
                <Dropdown
                    title="Candidate Management"
                    isOpen={openDropdown === 'candidate'}
                    toggle={() => handleToggle('candidate')}
                    links={[
                        { to: '/add-new-candidate', icon: <FaUserPlus size={'14px'} className="w-10" />, label: 'Add New Candidate' },
                        { to: '/my-candidates', icon: <FaUserPlus size={'14px'} className="w-10" />, label: 'My Candidates' },
                        { to: '/all-candidates', icon: <FaUserPlus size={'14px'} className="w-10" />, label: 'All Candidates' },
                    ]}
                />

                <Dropdown
                    title="Jobs"
                    isOpen={openDropdown === 'jobs'}
                    toggle={() => handleToggle('jobs')}
                    links={[
                        { to: '/post-new-job', icon: <IoCreate size={'18px'} className="w-10" />, label: 'Post New Job' },
                    ]}
                />
            </div>

            <div className="absolute bottom-0 w-full p-4">
                <button className="primary-button" onClick={logout}>
                    <FiLogOut size={'16px'} className="w-10 rotate-180" /> Logout
                </button>
            </div>
        </section>
    );
};

export default Sidebar;
