import { Link, NavLink } from "react-router-dom";
import '../../style/theme/theme.scss';
import { FiLogOut } from "react-icons/fi";
import logo from '../../assets/mahakaya.png';
import useLogout from "../../helpers/useLogout";
import { useEffect, useState } from "react";
import useSidebarAuth from "../../helpers/useSidebarLink";
import { IoIosArrowDown } from "react-icons/io";

const SidebarLink = ({ to, icon, label }) => (
    <NavLink to={to} className={({ isActive }) => (isActive ? 'side-bar-active' : 'side-bar-default')}>
        {icon} {label}
    </NavLink>
);

const Dropdown = ({ title, links, isOpen, toggle }) => (
    <div className="relative">
        <div className="flex items-center justify-between p-3 font-bold cursor-pointer" onClick={toggle}>
            <span>{title}</span>
            <span className={`transition-all duration-100 ease-in-out ${isOpen ? 'rotate-180' : ''}`}><IoIosArrowDown /></span>
        </div>
        <div className={`overflow-hidden transition-all duration-100 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
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
    const [openDropdown, setOpenDropdown] = useState(null);
    const handleToggle = (dropdownName) => {
        setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
    };

    const userRole = localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : null;
    const { ValidateSidebar, reducedModules } = useSidebarAuth();

    useEffect(() => {
        let modules = [];
        userRole.modulesTouser.map((value) => {
            let module = {
                module_name: value.modules.module_name,
                c: value.c,
                r: value.r,
                u: value.u,
                d: value.d
            };
            modules.push(module);
        });
        ValidateSidebar(modules);
    }, []);

    return (
        <section className="relative h-full">
            <div className="pt-8 flex items-center justify-center">
                <img src={logo} width={'100px'} alt="Logo" />
            </div>
            <h1 className="p-4 mb-8 text-xl text-center">HR Management System</h1>

            <div className="p-10">
                {reducedModules.map((sideBar, key) => {
                    return sideBar.module_name === "Administrator" ? (
                        <Dropdown
                            key={key}
                            title={sideBar.module_name}
                            isOpen={openDropdown === sideBar.module_name}
                            toggle={() => handleToggle(sideBar.module_name)}
                            links={sideBar.subLinks}
                        />
                    ) : (
                        <SidebarLink
                            key={key}
                            to={`/${sideBar.module_name.toLowerCase()}`}
                            label={sideBar.module_name}
                            icon={null}  // Add an icon if needed
                        />
                    );
                })}
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