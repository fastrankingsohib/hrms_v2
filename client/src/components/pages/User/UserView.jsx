import { useEffect, useState } from "react";
import useUpdateUser from "../../../helpers/useUpadateUser"; // Ensure this hook is defined correctly
import allModules from "./AllModules"; // Import any required modules
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { updateModules } from "../../../redux/reducers/auth_slice";
import '../../../style/theme/theme.scss'
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import UserModule from './../../commons/UserModule';

// icons
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const UpdateUser = () => {
    const { userid } = useParams();
    const userAssignedModule = useSelector((state) => state.userModules);
    const [mobileError, setMobileError] = useState(false); // State to handle mobile number errors
    const dispatch = useDispatch();
    const warnDefault = useSelector((state) => state.moduleSelection.invalid.length);
    const [submitError, setsubmitError] = useState(false)

    const [fetchedUser, setFetchedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
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

    // useEffect(() => {
    //     if(
    //         user.title === '' ||
    //         user.firstName === '' ||
    //         user.middleName === '' ||
    //         user.lastName === '' ||
    //         user.gender === '' ||
    //         user.dateOfJoining === '' ||
    //         user.username === '' ||
    //         user.emailId === '' ||
    //         user.status === '' ||
    //         user.mobile === '' ||
    //         user.dateOfBirth === '' ||
    //         user.reportingTo === '' ||
    //         user.employeeId === '' ||
    //         user.userType === '' ||
    //         user.designation === '' ||
    //         user.department === '' ||
    //         user.role === '' ||
    //         user.modules.length > 0
    //     ){
    //         setsubmitError(true)
    //     }
    // }, [user])

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
                    modules: modulesData || [] // Store the fetched modules
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userid]);

    useEffect(() => {
        // Dispatch module updates to Redux store
        if (user.modules.length > 0) {
            user.modules.forEach((currentModule) => {
                dispatch(updateModules(currentModule));
            });
        }
    }, [user.modules, dispatch]);

    const { updateUser, success, loading } = useUpdateUser();

    const toggleEdit = () => {
        setIsEditing((prev) => !prev);
    };

    const handleModuleChange = (module) => {
        setUser((prevUser) => {
            const isModuleAssigned = prevUser.modules.includes(module.id);
            const updatedModules = isModuleAssigned
                ? prevUser.modules.filter(mod => mod !== module.id)
                : [...prevUser.modules, module.id];

            return { ...prevUser, modules: updatedModules };
        });
    };



    // Email Validation
    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (e) => {
        const value = e.target.value;

        // Basic email validation regex (also prevents spam)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const invalidCharactersPattern = /[!#$%^&*()_+={}\[\]:;"'<>,?\/\\|`~]/;

        // Set the email in the state
        setUser((values) => ({ ...values, emailId: value }));

        // Validate the email and set error message
        if (value) {
            if (invalidCharactersPattern.test(value)) {
                setsubmitError(true)
                setEmailError('Email should not contain special characters like !@#$%^&*()_+ etc.');
            } else if (!emailPattern.test(value)) {
                setsubmitError(true)
                setEmailError('Please enter a valid email address.');
            } else {
                setsubmitError(false)
                setEmailError('');
            }
        } else {
            setsubmitError(false)
            setEmailError('');
        }
    };



    return (
        <section className="relative p-4 component-rendering-transition">
            <p className="fixed inline-flex items-center gap-2 top-24 right-8 bg-green-600 text-white font-semibold text-lg p-4 z-50 tranition-basic" style={{ marginRight: success === true ? 0 : '-100%' }}>
                <span><IoIosCheckmarkCircleOutline size={'18px'} /></span>
                User Updated Successfully
            </p>
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

            <form className="w-full mt-10">
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <label htmlFor="title" className="font-semibold inline-block p-4 pl-0">Title</label>
                        <select
                            className="primary-input"
                            value={user.title}
                            onChange={(e) => setUser((values) => ({ ...values, title: e.target.value }))}
                            disabled={!isEditing}
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
                            disabled={!isEditing}
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
                            disabled={!isEditing}
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
                            disabled={!isEditing}
                        />
                    </div>

                    <div>
                        <label htmlFor="gender" className="font-semibold inline-block p-4 pl-0">Gender</label>
                        <select
                            className="primary-input"
                            value={user.gender}
                            onChange={(e) => setUser((values) => ({ ...values, gender: e.target.value }))}
                            disabled={!isEditing}
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
                            disabled={!isEditing}
                        />
                    </div>

                    {/* <div>
                        <label htmlFor="username" className="font-semibold inline-block p-4 pl-0">Username</label>
                        <input
                            type="text"
                            className="primary-input"
                            placeholder="Username"
                            value={user.username}
                            onChange={(e) => setUser((values) => ({ ...values, username: e.target.value }))}
                            disabled={!isEditing}
                        />
                    </div> */}
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Username <span className="text-red-500">*</span></label>
                        <input
                            required
                            type="text"
                            className="primary-input"
                            placeholder="Username"
                            name=""
                            id=""
                            value={user.username} // Controlled input
                            onChange={(e) => {
                                const value = e.target.value;
                                // Capitalize the first letter and keep the rest unchanged
                                const capitalizedUsername = value.charAt(0).toUpperCase() + value.slice(1);
                                setUser((values) => ({ ...values, username: capitalizedUsername }));
                            }}
                        />
                    </div>

                    {/* <div>
                        <label htmlFor="emailId" className="font-semibold inline-block p-4 pl-0">Email ID</label>
                        <input
                            type="email"
                            className="primary-input"
                            placeholder="Email ID"
                            value={user.emailId}
                            disabled={!isEditing}
                        />
                    </div> */}

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Email ID</label>
                        <input
                            type="email"
                            className="primary-input"
                            placeholder="Email ID"
                            value={user.emailId} // Controlled input
                            onChange={(e) => {
                                setUser((values) => ({ ...values, emailId: e.target.value }))
                            }}
                            onInput={handleEmailChange}
                            disabled={!isEditing}
                        />
                        {emailError && (
                            <p className="text-red-500 text-sm mt-1">{emailError}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="mobile" className="font-semibold inline-block p-4 pl-0">Mobile</label>
                        <input
                            type="tel"
                            className="primary-input"
                            placeholder="Mobile Number"
                            id="mobile"
                            value={user.mobile} // Controlled input
                            onChange={(e) => {
                                const value = e.target.value;

                                // Remove any non-digit characters
                                const sanitizedValue = value.replace(/\D/g, '');

                                // Validate length and update mobile number
                                setUser((values) => ({ ...values, mobile: sanitizedValue }));

                                // Error handling for invalid mobile numbers
                                if (sanitizedValue.length > 0 && sanitizedValue.length < 10) {
                                    setMobileError(true); // Show error if less than 10 digits
                                } else if (sanitizedValue.length === 10) {
                                    setMobileError(false); // Clear error if valid
                                } else if (sanitizedValue.length > 10) {
                                    setMobileError(true);
                                }
                            }}
                        />
                        {mobileError ? <p className="text-red-500">Mobile number must be 10 digits.</p> : ''} {/* Display error message */}
                    </div>

                    <div>
                        <label htmlFor="dateOfBirth" className="font-semibold inline-block p-4 pl-0">Date of Birth</label>
                        <input
                            type="date"
                            className="primary-input"
                            value={user.dateOfBirth}
                            onChange={(e) => setUser((values) => ({ ...values, dateOfBirth: e.target.value }))}
                            disabled={!isEditing}
                        />
                    </div>


                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Status <span className="text-red-500">*</span></label>
                        <select className="primary-input"
                            value={user.status}
                            disabled={!isEditing}
                            onChange={(e) => setUser((values) => ({ ...values, status: e.target.value }))}
                        >
                            {/* <option disabled={true} defaultValue={true}={true}>-- Select --</option> */}
                            <option value="Active">Active</option>
                            <option value="Inavtive">Inactive</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="reportingTo" className="font-semibold inline-block p-4 pl-0">Reporting to</label>
                        <select className="primary-input"
                            value={user.reportingTo}
                            disabled={!isEditing}
                            onChange={(e) => setUser((values) => ({ ...values, reportingTo: e.target.value }))}
                        >
                            {/* <option disabled={true} defaultValue={true}={true}>-- Select --</option> */}
                            <option value="Akram">Akram</option>
                            <option value="Vivek Singh">Vivek Singh</option>
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
                            disabled={!isEditing}
                        />
                    </div>

                    <div>
                        <label htmlFor="userType" className="font-semibold inline-block p-4 pl-0">User Type</label>
                        <select className="primary-input" required
                            value={user.userType}
                            disabled={!isEditing}
                            onChange={(e) => setUser((values) => ({ ...values, userType: e.target.value }))}
                        >
                            {/* <option value="" disabled>-- Select User Type --</option> */}

                            <optgroup label="Admin">
                                <option value="Super Admin">Super Admin</option>
                                <option value="Admin">Admin</option>
                            </optgroup>

                            <optgroup label="Manager">
                                <option value="Project Manager">Project Manager</option>
                                <option value="Sales Manager">Sales Manager</option>
                                <option value="HR Manager">HR Manager</option>
                            </optgroup>

                            <optgroup label="Employee">
                                <option value="Full-time Employee">Full-time Employee</option>
                                <option value="Part-time Employee">Part-time Employee</option>
                                <option value="Intern">Intern</option>
                            </optgroup>

                            <optgroup label="Client">
                                <option value="Regular Client">Regular Client</option>
                                <option value="Guest Client">Guest Client</option>
                            </optgroup>

                            <optgroup label="Vendor">
                                <option value="Supplier">Supplier</option>
                                <option value="Service Provider">Service Provider</option>
                            </optgroup>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="designation" className="font-semibold inline-block p-4 pl-0">Designation</label>
                        <select className="primary-input"
                            disabled={!isEditing}
                            value={user.designation}
                            onChange={(e) => setUser((values) => ({ ...values, designation: e.target.value }))}
                        >
                            <option value="" disabled defaultValue={true}>-- Select Designation --</option>

                            <optgroup label="Software Development">
                                <option value="Software Engineer">Software Engineer</option>
                                <option value="Senior Software Engineer">Senior Software Engineer</option>
                                <option value="Software Architect">Software Architect</option>
                                <option value="Frontend Developer">Frontend Developer</option>
                                <option value="Backend Developer">Backend Developer</option>
                                <option value="Full Stack Developer">Full Stack Developer</option>
                                <option value="DevOps Engineer">DevOps Engineer</option>
                                <option value="QA Engineer">QA Engineer</option>
                                <option value="Mobile App Developer">Mobile App Developer</option>
                                <option value="Web Developer">Web Developer</option>
                            </optgroup>

                            <optgroup label="IT">
                                <option value="IT Manager">IT Manager</option>
                                <option value="Network Administrator">Network Administrator</option>
                                <option value="System Administrator">System Administrator</option>
                                <option value="IT Support Specialist">IT Support Specialist</option>
                                <option value="Cloud Engineer">Cloud Engineer</option>
                                <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                                <option value="Database Administrator">Database Administrator</option>
                                <option value="IT Project Manager">IT Project Manager</option>
                            </optgroup>

                            <optgroup label="Human Resources">
                                <option value="HR Manager">HR Manager</option>
                                <option value="HR Specialist">HR Specialist</option>
                                <option value="Recruitment Coordinator">Recruitment Coordinator</option>
                            </optgroup>

                            <optgroup label="Marketing">
                                <option value="Marketing Manager">Marketing Manager</option>
                                <option value="Digital Marketing Specialist">Digital Marketing Specialist</option>
                                <option value="SEO Specialist">SEO Specialist</option>
                            </optgroup>

                            <optgroup label="Sales">
                                <option value="Sales Manager">Sales Manager</option>
                                <option value="Sales Executive">Sales Executive</option>
                                <option value="Account Manager">Account Manager</option>
                            </optgroup>

                            <optgroup label="Finance">
                                <option value="Finance Manager">Finance Manager</option>
                                <option value="Accountant">Accountant</option>
                                <option value="Financial Analyst">Financial Analyst</option>
                            </optgroup>

                            <optgroup label="Customer Support">
                                <option value="Customer Support Manager">Customer Support Manager</option>
                                <option value="Customer Service Representative">Customer Service Representative</option>
                            </optgroup>

                            <optgroup label="Operations">
                                <option value="Operations Manager">Operations Manager</option>
                                <option value="Logistics Coordinator">Logistics Coordinator</option>
                            </optgroup>

                            <optgroup label="Research and Development">
                                <option value="R&D Manager">R&D Manager</option>
                                <option value="Research Scientist">Research Scientist</option>
                            </optgroup>

                            <optgroup label="Legal">
                                <option value="Legal Advisor">Legal Advisor</option>
                                <option value="Compliance Officer">Compliance Officer</option>
                            </optgroup>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="department" className="font-semibold inline-block p-4 pl-0">Department</label>
                        <select className="primary-input"
                            value={user.department}
                            disabled={!isEditing}
                            onChange={(e) => setUser((values) => ({ ...values, department: e.target.value }))}
                        >
                            {/* <option value="" disabled defaultValue={true}>-- Select Department --</option> */}

                            <optgroup label="Technical Departments" className="optgroup">
                                <option value="Software Development">Software Development</option>
                                <option value="IT Support">IT Support</option>
                                <option value="Research and Development">Research and Development</option>
                                <option value="Data Science">Data Science</option>
                                <option value="DevOps">DevOps</option>
                                <option value="Network Administration">Network Administration</option>
                            </optgroup>

                            <optgroup label="Business Departments" className="optgroup">
                                <option value="Marketing">Marketing</option>
                                <option value="Sales">Sales</option>
                                <option value="Finance">Finance</option>
                                <option value="Human Resources">Human Resources</option>
                                <option value="Customer Support">Customer Support</option>
                                <option value="Operations">Operations</option>
                                <option value="Legal Affairs">Legal Affairs</option>
                                <option value="Public Relations">Public Relations</option>
                            </optgroup>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="role" className="font-semibold inline-block p-4 pl-0">Role</label>
                        <select className="primary-input"
                            value={user.role}
                            disabled={!isEditing}
                            onChange={(e) => setUser((values) => ({ ...values, role: e.target.value }))}
                        >
                            {/* <option disabled={true} defaultValue={true}={true}>-- Select --</option> */}

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

                <div className="grid gap-4 grid-cols-1 2xl:grid-cols-2 border-t-2 mt-10">
                    {
                        user.modules.map((currentModule, moduleKey) => {

                            let module_status = currentModule.module_status
                            // console.log(`module_name: ${currentModule.module_name}, module crud: c - ${currentModule.c}, r - ${currentModule.r}, u - ${currentModule.u}, d - ${currentModule.d}, `)

                            return (
                                <UserModule
                                    editable={!isEditing}
                                    key={moduleKey}
                                    checked={currentModule.module_status == true ? true : false}
                                    create={currentModule.c == true ? true : false}
                                    read={currentModule.r == true ? true : false}
                                    update={currentModule.u == true ? true : false}
                                    delete={currentModule.d == true ? true : false}
                                    id={`module-${currentModule.module_name}`}
                                    name={currentModule.module_name}
                                    module={currentModule.module_status}

                                />
                            )
                        })
                    }
                </div>

                <div className="flex items-center justify-end mt-10">
                    <div className="w-1/4 pl-4">
                        <button className="primary-button cursor-pointer justify-center" type="button"
                            onClick={() => {
                                updateUser(user, userid);
                                console.log('update user')
                            }}
                            disabled={mobileError || submitError || warnDefault > 0 ? true : false}
                            style={{
                                opacity: mobileError || submitError || warnDefault > 0 ? 0.8 : 1,
                                cursor: mobileError || submitError || warnDefault > 0 ? 'not-allowed' : 'pointer',
                                backgroundColor: loading === true ? '#313131' : '#000000',
                            }}
                        >
                            {loading === true ? <span className="inline-block loading-01"><AiOutlineLoading3Quarters /></span> : ''}
                            Update Details
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default UpdateUser;
