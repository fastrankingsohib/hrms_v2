import { useEffect, useState } from "react";
import useRegisterUser from "../../../helpers/useRegisterUser";
import allModules from "./AllModules";
import UserModule from "../../commons/UserModule";
import { useSelector } from "react-redux";

const NewUser = () => {
    const userAssignedModule = useSelector((state) => state.userModules);
    const [passwordConfirm, setPasswordConfirm] = useState(true);
    const [user, setUser] = useState(
        {
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
            status: '',
            userType: '',
            designation: '',
            department: '',
            role: '',
        }
    );

    // const [allAccessModules, setAllAccessModules] = useState();
    const { registerUser } = useRegisterUser();
    const register = (e) => {
        if (user.password !== user.confirmPassword) {
            setPasswordConfirm(false);
            console.log(`Password Does Not Match`)
        }
        else {
            setPasswordConfirm(true)
            console.log(`Password Mathed Successfully!`)
        }
        e.preventDefault();
        registerUser(user);
    }

    return (
        <section className="p-4 component-rendering-tranistion">
            <h1 className="text-2xl font-semibold">Create New User</h1>

            <form onSubmit={register} className="w-full mt-10">
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Title</label>
                        <select className="primary-input"
                            onChange={(e) => setUser((values) => ({ ...values, title: e.target.value }))} >
                            <option disabled={true} selected={true}>-- Select --</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Ms.">Ms.</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">First Name</label>
                        <input type="text" className="primary-input" placeholder="First Name" name="" id=""
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
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Last Name</label>
                        <input type="text" className="primary-input" placeholder="Last Name" name="" id=""
                            onChange={(e) => setUser((values) => ({ ...values, lastName: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Gender</label>
                        <select className="primary-input"
                            onChange={(e) => setUser((values) => ({ ...values, gender: e.target.value }))}
                        >
                            <option disabled={true} selected={true}>-- Select --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Date of Joining</label>
                        <input type="date" className="primary-input" name="" id=""
                            onChange={(e) => setUser((values) => ({ ...values, dateOfJoining: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Username</label>
                        <input type="text" className="primary-input" placeholder="Last Name" name="" id=""
                            onChange={(e) => setUser((values) => ({ ...values, username: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Password</label>
                        <input type="password" className="primary-input" placeholder="Password" name="" id=""
                            onChange={(e) => setUser((values) => ({ ...values, password: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Confirm Password</label>
                        <input type="password" className="primary-input" placeholder="Confirm Password" name="" id=""
                            onChange={(e) => setUser((values) => ({ ...values, confirmPassword: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Email ID</label>
                        <input type="email" className="primary-input" placeholder="Email ID" name="" id=""
                            onChange={(e) => setUser((values) => ({ ...values, emailId: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Mobile</label>
                        <input type="tel" className="primary-input" placeholder="Mobile Number" name="" id=""
                            onChange={(e) => setUser((values) => ({ ...values, mobile: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Date of birth</label>
                        <input type="date" className="primary-input" placeholder="Date of Birth" name="" id=""
                            onChange={(e) => setUser((values) => ({ ...values, dateOfBirth: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Reporting to</label>
                        <select className="primary-input"
                            onChange={(e) => setUser((values) => ({ ...values, reportingTo: e.target.value }))}
                        >
                            <option disabled={true} selected={true}>-- Select --</option>
                            <option value="User 1">User 1</option>
                            <option value="User 2">User 2</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Employee ID</label>
                        <input type="text" className="primary-input" placeholder="Emploayee ID" name="" id=""
                            onChange={(e) => setUser((values) => ({ ...values, employeeId: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Status</label>
                        <select className="primary-input"
                            onChange={(e) => setUser((values) => ({ ...values, status: e.target.value }))}
                        >
                            <option disabled={true} selected={true}>-- Select --</option>
                            <option value="Active">Active</option>
                            <option value="Inavtive">Inactive</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">User Type</label>
                        <select className="primary-input"
                            onChange={(e) => setUser((values) => ({ ...values, userType: e.target.value }))}
                        >
                            <option value="" disabled selected>-- Select User Type --</option>

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
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Designation</label>
                        <select className="primary-input"
                            onChange={(e) => setUser((values) => ({ ...values, designation: e.target.value }))}
                        >
                            <option value="" disabled selected>-- Select Designation --</option>

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
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Department</label>
                        <select className="primary-input"
                            onChange={(e) => setUser((values) => ({ ...values, department: e.target.value }))}
                        >
                            <option value="" disabled selected>-- Select Department --</option>

                            <optgroup label="Technical Departments" class="optgroup">
                                <option value="Software Development">Software Development</option>
                                <option value="IT Support">IT Support</option>
                                <option value="Research and Development">Research and Development</option>
                                <option value="Data Science">Data Science</option>
                                <option value="DevOps">DevOps</option>
                                <option value="Network Administration">Network Administration</option>
                            </optgroup>

                            <optgroup label="Business Departments" class="optgroup">
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
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Role</label>
                        <select className="primary-input"
                            onChange={(e) => setUser((values) => ({ ...values, role: e.target.value }))}
                        >
                            <option disabled={true} selected={true}>-- Select --</option>

                            <optgroup label="Administrative Roles">
                                <option value="Super Admin">Super Admin</option>
                                <option value="Admin">Admin</option>
                            </optgroup>

                            <optgroup label="Management">
                                <option value="Director">Director</option>
                                <option value="Manager">Manager</option>
                            </optgroup>

                            <optgroup label="Operational Roles">
                                <option value="Executive">Executive</option>
                                <option value="Candidate">Candidate</option>
                                <option value="Consultant">Consultant</option>
                            </optgroup>

                            <optgroup label="Others">
                                <option value="Other">Other</option>
                            </optgroup>
                        </select>
                    </div>
                </div>


                <div className="grid gap-4 grid-cols-2 border-t-2 mt-10">
                    {
                        allModules.map((currentModule, moduleKey) => {
                            return (
                                <UserModule
                                    id={`module-${currentModule.module_name}`}
                                    name={currentModule.module_name}
                                />
                            )
                        })
                    }
                </div>


                <div className="flex items-center justify-end mt-10">
                    <div className="w-1/4 pl-4">
                        <button className="primary-button justify-center">Create User</button>
                    </div>
                </div>
            </form>
        </section>
    )
}
export default NewUser;