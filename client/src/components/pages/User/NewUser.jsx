import { useEffect, useState } from "react";
import useRegisterUser from "../../../helpers/useRegisterUser";
import allModules from "./AllModules";
import { useSelector } from "react-redux";
import UserModule from './../../Commons/UserModule';

// Icons
import { GoEyeClosed, GoEye, GoTriangleUp } from "react-icons/go";

const NewUser = () => {
    const warnDefault = useSelector((state) => state.moduleSelection.invalid.length);
    const [mobileError, setMobileError] = useState(false);
    const [submitError, setsubmitError] = useState(false)
    const userAssignedModule = useSelector((state) => state.userModules);
    const [passwordConfirm, setPasswordConfirm] = useState(true);
    const [user, setUser] = useState({
        title: '',
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        dateOfJoining: '',
        username: '',
        password: '',
        confirmPassword: '',
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
    //     else{
    //         setsubmitError(false)
    //     }
    // }, [user])

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { registerUser } = useRegisterUser();

    const register = (e) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            setPasswordConfirm(false);
            alert("Passwords do not match!"); // Show alert if passwords do not match
            return; // Prevent form submission
        } else {
            setPasswordConfirm(true);
            console.log(`Password Matched Successfully!`);
        }
        registerUser(user);
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

    // Password Validation
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const validatePassword = (password, confirmPassword) => {
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
        } else {
            setPasswordError('');
        }

        if (confirmPassword && confirmPassword !== password) {
            setConfirmPasswordError("Passwords do not match.");
        } else {
            setConfirmPasswordError('');
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setUser((values) => ({ ...values, password: newPassword }));
        validatePassword(newPassword, user.confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setUser((values) => ({ ...values, confirmPassword: newConfirmPassword }));
        validatePassword(user.password, newConfirmPassword);
    };


    return (
        <section className="p-4 component-rendering-tranistion">
            <h1 className="text-2xl font-semibold">Create New User</h1>

            <form onSubmit={register} className="w-full mt-10">
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Title <span className="text-red-500">*</span></label>
                        <select className="primary-input" required
                            onChange={(e) => setUser((values) => ({ ...values, title: e.target.value }))} >
                            <option disabled={true} defaultValue={true}>-- Select --</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Ms.">Ms.</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">First Name <span className="text-red-500">*</span></label>
                        <input type="text" className="primary-input" required placeholder="First Name" name="" id=""
                            onChange={(e) => setUser((values) => ({ ...values, firstName: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Middle Name</label>
                        <input type="text" className="primary-input" placeholder="Middle Name" name="" id=""
                            onChange={(e) => setUser((values) => ({ ...values, middleName: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Last Name <span className="text-red-500">*</span></label>
                        <input type="text" className="primary-input" required placeholder="Last Name" name="" id=""
                            onChange={(e) => setUser((values) => ({ ...values, lastName: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Gender <span className="text-red-500">*</span></label>
                        <select className="primary-input" required
                            onChange={(e) => setUser((values) => ({ ...values, gender: e.target.value }))}
                        >
                            <option disabled={true} defaultValue={true}>-- Select --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Date of Joining <span className="text-red-500">*</span></label>
                        <input type="date" className="primary-input" name="" id="" required
                            onChange={(e) => setUser((values) => ({ ...values, dateOfJoining: e.target.value }))}
                        />
                    </div>

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

                    <div>
                        <label htmlFor="password" className="font-semibold inline-block p-4 pl-0">Password <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                className="primary-input"
                                placeholder="Password"
                                value={user.password}
                                onChange={handlePasswordChange}
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <GoEye size={'17px'} /> : <GoEyeClosed size={'17px'} />}
                            </button>
                        </div>
                        {passwordError && <p className="text-red-500">{passwordError}</p>}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="font-semibold inline-block p-4 pl-0">Confirm Password <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                className="primary-input"
                                placeholder="Confirm Password"
                                value={user.confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <GoEye size={'17px'} /> : <GoEyeClosed size={'17px'} />}
                            </button>
                        </div>
                        {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Email ID</label>
                        <input
                            type="email"
                            className="primary-input"
                            placeholder="Email ID"
                            value={user.emailId} // Controlled input
                            onChange={handleEmailChange}
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

                                const sanitizedValue = value.replace(/\D/g, '');
                                setUser((values) => ({ ...values, mobile: sanitizedValue }));
                                if (sanitizedValue.length > 0 && sanitizedValue.length < 10) {
                                    setMobileError(true);
                                } else if (sanitizedValue.length === 10) {
                                    setMobileError(false);
                                } else if (sanitizedValue.length > 10) {
                                    setMobileError(true);
                                } else if (sanitizedValue > 1999999999) {
                                    setMobileError(true);
                                }
                                else {
                                    setMobileError(false)
                                }
                            }}
                        />
                        {mobileError ? <p className="text-red-500 text-sm mt-1">Inavlid Mobile Number</p> : ''} {/* Display error message */}
                    </div>


                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Date of birth</label>
                        <input type="date" className="primary-input" placeholder="Date of Birth" name="" id=""
                            onChange={(e) => setUser((values) => ({ ...values, dateOfBirth: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Reporting to <span className="text-red-500">*</span></label>
                        <select className="primary-input"
                            required
                            onChange={(e) => setUser((values) => ({ ...values, reportingTo: e.target.value }))}
                        >
                            <option disabled={true} defaultValue={true}>-- Select --</option>
                            <option value="Akram">Akram</option>
                            <option value="Vivek Singh">Vivek Singh</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Employee ID <span className="text-red-500">*</span></label>
                        <input type="text" className="primary-input" required placeholder="Emploayee ID" name="" id=""
                            onChange={(e) => setUser((values) => ({ ...values, employeeId: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Status <span className="text-red-500">*</span></label>
                        <select className="primary-input"
                            required
                            onChange={(e) => setUser((values) => ({ ...values, status: e.target.value }))}
                        >
                            <option disabled={true} defaultValue={true}>-- Select --</option>
                            <option value="Active">Active</option>
                            <option value="Inavtive">Inactive</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">User Type <span className="text-red-500">*</span></label>
                        <select className="primary-input" required
                            onChange={(e) => setUser((values) => ({ ...values, userType: e.target.value }))}
                        >
                            <option value="" disabled defaultValue={true}>-- Select User Type --</option>

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
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Designation <span className="text-red-500">*</span></label>
                        <select className="primary-input"
                            required
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
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Department <span className="text-red-500">*</span></label>
                        <select className="primary-input"
                            required
                            onChange={(e) => setUser((values) => ({ ...values, department: e.target.value }))}
                        >
                            <option value="" disabled defaultValue={true}>-- Select Department --</option>

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
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Role <span className="text-red-500">*</span></label>
                        <select className="primary-input"
                            required
                            onChange={(e) => setUser((values) => ({ ...values, role: e.target.value }))}
                        >
                            <option disabled={true} defaultValue={true}>-- Select --</option>
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
                            return (
                                <UserModule
                                    key={moduleKey}
                                    id={`module-${currentModule.module_name}`}
                                    name={currentModule.module_name}
                                />
                            )
                        })
                    }
                </div>


                <div className="flex items-center justify-end mt-10">
                    <div className="w-1/4 pl-4 relative">
                        <button
                            className="primary-button justify-center"
                            disabled={mobileError || submitError || warnDefault > 0} // Simplified condition
                            style={{
                                opacity: mobileError || submitError || warnDefault > 0 ? 0.8 : 1,
                                cursor: mobileError || submitError || warnDefault > 0 ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Create User
                        </button>
                        {/* <span className="inline-block">
                            {submitError ? 'Invalid Details Found!' : ''}
                        </span> */}
                    </div>
                </div>

            </form>
        </section>
    )
}
export default NewUser;