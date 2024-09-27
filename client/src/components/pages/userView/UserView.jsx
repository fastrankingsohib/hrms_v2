import { useEffect, useState } from "react";
import useRegisterUser from "../../../helpers/useRegisterUser";
import allModules from "../NewUser/AllModules";
import UserModule from "../../commons/UserModule";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { updateModules } from "../../../redux/reducers/auth_slice";

const NewUser = () => {
    const { userid } = useParams();
    const userAssignedModule = useSelector((state) => state.userModules);
    const dispatch = useDispatch();
    const [fetchedUser, setFetchedUser] = useState(null); // Initial state set to null to check if data is loaded
    const [passwordConfirm, setPasswordConfirm] = useState(true);
    const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
    const [user, setUser] = useState({
        title: '',
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        dateOfJoining: '',
        username: '',
        emailId: '',
        status: '',
        mobile: '',
        dateOfBirth: '',
        reportingTo: '',
        employeeId: '',
        userType: '',
        designation: '',
        department: '',
        role: '',
        modules: []
    });

    useEffect(() => {
        // Fetch user data from the API
        axios.get(`/userdata/${userid}`)
            .then((response) => {
                const data = response.data.user_data;
                const modulesData = response.data.modules_data;

                // Update the user state with fetched data
                setFetchedUser(data);
                setUser({
                    title: data.title || '',
                    firstName: data.first_name || '',
                    middleName: data.middle_name || '',
                    lastName: data.last_name || '',
                    gender: data.gender || '',
                    dateOfJoining: data.date_of_joining || '',
                    username: data.username || '',
                    emailId: data.email || '',
                    status: data.status || '',
                    mobile: data.mobile || '',
                    dateOfBirth: data.dob || '',
                    reportingTo: data.reporting_to || '',
                    employeeId: data.employee_id || '',
                    userType: data.user_type || '',
                    designation: data.designation || '',
                    department: data.department || '',
                    role: data.role || '',
                    modules: modulesData || []
                });
            })
            .catch((err) => {
                console.log(err);
                // localStorage.setItem("user")
            });
    }, [userid]); // Dependency array to run this effect only when `userid` changes

    useEffect(() => {
        // Dispatch module updates to Redux store
        if (user.modules.length > 0) {
            user.modules.forEach((currentModule) => {
                dispatch(updateModules(currentModule));
            });
        }
    }, [user.modules, dispatch]);

    const { registerUser } = useRegisterUser();

    const register = (e) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            setPasswordConfirm(false);
            console.log("Password Does Not Match");
        } else {
            setPasswordConfirm(true);
            console.log("Password Matched Successfully!");
            registerUser(user);
        }
    };

    const toggleEdit = () => {
        setIsEditing((prev) => !prev); // Toggle edit mode
    };

    return (
        <section className="p-4 component-rendering-transition">
            <h1 className="text-2xl font-semibold flex items-center justify-between">
                {user.username}
                <div className="max-w-60 h-12">
                    <button
                        onClick={toggleEdit}
                        className="primary-button mt-4 h-12"
                    >
                        {isEditing ? 'Disable Edit' : 'Enable Edit'}
                    </button>
                </div>
            </h1>

            <form onSubmit={register} className="w-full mt-10">
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <label htmlFor="title" className="font-semibold inline-block p-4 pl-0">Title</label>
                        <select
                            className="primary-input"
                            value={user.title}
                            onChange={(e) => setUser((values) => ({ ...values, title: e.target.value }))}
                            disabled={!isEditing} // Disable if not in edit mode
                        >
                            <option value="" disabled>-- Select --</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Ms.">Ms.</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="firstName" className="font-semibold inline-block p-4 pl-0">First Name</label>
                        <input
                            type="text"
                            className="primary-input"
                            placeholder="First Name"
                            value={user.firstName}
                            onChange={(e) => setUser((values) => ({ ...values, firstName: e.target.value }))}
                            disabled={!isEditing} // Disable if not in edit mode
                        />
                    </div>

                    <div>
                        <label htmlFor="middleName" className="font-semibold inline-block p-4 pl-0">Middle Name</label>
                        <input
                            type="text"
                            className="primary-input"
                            placeholder="Middle Name"
                            value={user.middleName}
                            onChange={(e) => setUser((values) => ({ ...values, middleName: e.target.value }))}
                            disabled={!isEditing} // Disable if not in edit mode
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="font-semibold inline-block p-4 pl-0">Last Name</label>
                        <input
                            type="text"
                            className="primary-input"
                            placeholder="Last Name"
                            value={user.lastName}
                            onChange={(e) => setUser((values) => ({ ...values, lastName: e.target.value }))}
                            disabled={!isEditing} // Disable if not in edit mode
                        />
                    </div>

                    <div>
                        <label htmlFor="gender" className="font-semibold inline-block p-4 pl-0">Gender</label>
                        <select
                            className="primary-input"
                            value={user.gender}
                            onChange={(e) => setUser((values) => ({ ...values, gender: e.target.value }))}
                            disabled={!isEditing} // Disable if not in edit mode
                        >
                            <option value="" disabled>-- Select --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="dateOfJoining" className="font-semibold inline-block p-4 pl-0">Date of Joining</label>
                        <input
                            type="date"
                            className="primary-input"
                            value={user.dateOfJoining}
                            onChange={(e) => setUser((values) => ({ ...values, dateOfJoining: e.target.value }))}
                            disabled={!isEditing} // Disable if not in edit mode
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="font-semibold inline-block p-4 pl-0">Username</label>
                        <input
                            type="text"
                            className="primary-input"
                            placeholder="Username"
                            value={user.username}
                            onChange={(e) => setUser((values) => ({ ...values, username: e.target.value }))}
                            disabled={!isEditing} // Disable if not in edit mode
                        />
                    </div>

                    <div>
                        <label htmlFor="emailId" className="font-semibold inline-block p-4 pl-0">Email ID</label>
                        <input
                            type="email"
                            className="primary-input"
                            placeholder="Email ID"
                            value={user.emailId}
                            onChange={(e) => setUser((values) => ({ ...values, emailId: e.target.value }))}
                            disabled={!isEditing} // Disable if not in edit mode
                        />
                    </div>

                    <div>
                        <label htmlFor="mobile" className="font-semibold inline-block p-4 pl-0">Mobile</label>
                        <input
                            type="tel"
                            className="primary-input"
                            placeholder="Mobile Number"
                            value={user.mobile}
                            onChange={(e) => setUser((values) => ({ ...values, mobile: e.target.value }))}
                            disabled={!isEditing} // Disable if not in edit mode
                        />
                    </div>

                    <div>
                        <label htmlFor="dateOfBirth" className="font-semibold inline-block p-4 pl-0">Date of Birth</label>
                        <input
                            type="date"
                            className="primary-input"
                            value={user.dateOfBirth}
                            onChange={(e) => setUser((values) => ({ ...values, dateOfBirth: e.target.value }))}
                            disabled={!isEditing} // Disable if not in edit mode
                        />
                    </div>

                    <div>
                        <label htmlFor="reportingTo" className="font-semibold inline-block p-4 pl-0">Reporting to</label>
                        <select
                            className="primary-input"
                            value={user.reportingTo}
                            onChange={(e) => setUser((values) => ({ ...values, reportingTo: e.target.value }))}
                            disabled={!isEditing} // Disable if not in edit mode
                        >
                            <option value="" disabled>-- Select --</option>
                            <option value="User 1">User 1</option>
                            <option value="User 2">User 2</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="employeeId" className="font-semibold inline-block p-4 pl-0">Employee ID</label>
                        <input
                            type="text"
                            className="primary-input"
                            placeholder="Employee ID"
                            value={user.employeeId}
                            onChange={(e) => setUser((values) => ({ ...values, employeeId: e.target.value }))}
                            disabled={!isEditing} // Disable if not in edit mode
                        />
                    </div>

                    <div>
                        <label htmlFor="status" className="font-semibold inline-block p-4 pl-0">Status</label>
                        <select
                            className="primary-input"
                            value={user.status}
                            onChange={(e) => setUser((values) => ({ ...values, status: e.target.value }))}
                            disabled={!isEditing} // Disable if not in edit mode
                        >
                            <option value="" disabled>-- Select --</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="userType" className="font-semibold inline-block p-4 pl-0">User Type</label>
                        <select
                            className="primary-input"
                            value={user.userType}
                            onChange={(e) => setUser((values) => ({ ...values, userType: e.target.value }))}
                            disabled={!isEditing} // Disable if not in edit mode
                        >
                            <option value="" disabled>-- Select --</option>
                            <option value="Type 1">Type 1</option>
                            <option value="Type 2">Type 2</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="designation" className="font-semibold inline-block p-4 pl-0">Designation</label>
                        <select
                            className="primary-input"
                            value={user.designation}
                            onChange={(e) => setUser((values) => ({ ...values, designation: e.target.value }))}
                            disabled={!isEditing} // Disable if not in edit mode
                        >
                            <option value="" disabled>-- Select --</option>
                            <option value="Designation 1">Designation 1</option>
                            <option value="Designation 2">Designation 2</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="department" className="font-semibold inline-block p-4 pl-0">Department</label>
                        <select
                            className="primary-input"
                            value={user.department}
                            onChange={(e) => setUser((values) => ({ ...values, department: e.target.value }))}
                            disabled={!isEditing} // Disable if not in edit mode
                        >
                            <option value="" disabled>-- Select --</option>
                            <option value="Department 1">Department 1</option>
                            <option value="Department 2">Department 2</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="role" className="font-semibold inline-block p-4 pl-0">Role</label>
                        <select
                            className="primary-input"
                            value={user.role}
                            onChange={(e) => setUser((values) => ({ ...values, role: e.target.value }))}
                            disabled={!isEditing} // Disable if not in edit mode
                        >
                            <option value="" disabled>-- Select --</option>
                            <option value="Super Admin">Super Admin</option>
                            <option value="Admin">Admin</option>
                            <option value="Director">Director</option>
                            <option value="Manager">Manager</option>
                            <option value="Executive">Executive</option>
                            <option value="Candidate">Candidate</option>
                            <option value="Consultant">Consultant</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="grid gap-4 grid-cols-2 border-t-2 mt-10">
                    {
                        allModules.map((currentModule, moduleKey) => {
                            return(
                                user.modules.map((value, index) => {
                                    if(value.modules.module_name == currentModule.moduleName){
                                        return (
                                            <UserModule
                                                key={moduleKey}
                                                checked={true}
                                                create={value.c}
                                                read={value.r}
                                                update={value.u}
                                                delete={value.d}
                                                id={`module-${currentModule.moduleName}`}
                                                name={currentModule.moduleName}
                                                assigned={userAssignedModule.includes(currentModule.moduleName)} // Example to mark assigned modules
                                            />
                                        )
                                    }
    
                                    else{
                                        return (
                                            <UserModule
                                                key={moduleKey}
                                                checked={false}
                                                c={currentModule.c}
                                                r={currentModule.r}
                                                u={currentModule.u}
                                                d={currentModule.d}
                                                id={`module-${currentModule.moduleName}`}
                                                name={currentModule.moduleName}
                                                assigned={userAssignedModule.includes(currentModule.moduleName)} // Example to mark assigned modules
                                            />
                                        )
                                    }
                                    // console.log(value.modules.module_name)
                                })
                            )
                        })
                    }
                </div>

                <div className="flex items-center justify-end mt-10">
                    <div className="w-1/4 pl-4">
                        <button className="primary-button justify-center" type="submit" disabled={!isEditing}>Create User</button>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default NewUser;
