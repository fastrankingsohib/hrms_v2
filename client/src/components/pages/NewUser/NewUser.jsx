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
        if(user.password !== user.confirmPassword){
            setPasswordConfirm(false);
            console.log(`Password Does Not Match`)
        }
        else{
            setPasswordConfirm(true)
            console.log(`Password Mathed Successfully!`)
        }
        e.preventDefault();
        registerUser(user);
    }

    return(
        <section className="p-4 component-rendering-tranistion">
            <h1 className="text-2xl font-semibold">Create New User</h1>

            <form onSubmit={register} className="w-full mt-10">
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Title</label>
                        <select className="primary-input"
                            onChange={(e) => setUser((values) => ({...values, title: e.target.value}))} >
                            <option disabled={true} selected={true}>-- Select --</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Ms.">Ms.</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">First Name</label>
                        <input type="text" className="primary-input" placeholder="First Name" name="" id=""
                            onChange={(e) => setUser((values) => ({...values, firstName: e.target.value}))} 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Middle Name</label>
                        <input type="text" className="primary-input" placeholder="Middle Name" name="" id="" 
                            onChange={(e) => setUser((values) => ({...values, middleName: e.target.value}))} 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Last Name</label>
                        <input type="text" className="primary-input" placeholder="Last Name" name="" id="" 
                            onChange={(e) => setUser((values) => ({...values, lastName: e.target.value}))} 
                        />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Gender</label>
                        <select className="primary-input" 
                            onChange={(e) => setUser((values) => ({...values, gender: e.target.value}))} 
                        >
                            <option disabled={true} selected={true}>-- Select --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Date of Joining</label>
                        <input type="date" className="primary-input" name="" id="" 
                            onChange={(e) => setUser((values) => ({...values, dateOfJoining: e.target.value}))} 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Username</label>
                        <input type="text" className="primary-input" placeholder="Last Name" name="" id="" 
                            onChange={(e) => setUser((values) => ({...values, username: e.target.value}))} 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Password</label>
                        <input type="password" className="primary-input" placeholder="Password" name="" id="" 
                            onChange={(e) => setUser((values) => ({...values, password: e.target.value}))} 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Confirm Password</label>
                        <input type="password" className="primary-input" placeholder="Confirm Password" name="" id="" 
                            onChange={(e) => setUser((values) => ({...values, confirmPassword: e.target.value}))} 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Email ID</label>
                        <input type="email" className="primary-input" placeholder="Email ID" name="" id="" 
                            onChange={(e) => setUser((values) => ({...values, emailId: e.target.value}))} 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Mobile</label>
                        <input type="tel" className="primary-input" placeholder="Mobile Number" name="" id="" 
                            onChange={(e) => setUser((values) => ({...values, mobile: e.target.value}))} 
                        />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Date of birth</label>
                        <input type="date" className="primary-input" placeholder="Date of Birth" name="" id="" 
                            onChange={(e) => setUser((values) => ({...values, dateOfBirth: e.target.value}))} 
                        />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Reporting to</label>
                        <select className="primary-input"
                            onChange={(e) => setUser((values) => ({...values, reportingTo: e.target.value}))} 
                        >
                            <option disabled={true} selected={true}>-- Select --</option>
                            <option value="User 1">User 1</option>
                            <option value="User 2">User 2</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Employee ID</label>
                        <input type="text" className="primary-input" placeholder="Emploayee ID" name="" id="" 
                            onChange={(e) => setUser((values) => ({...values, employeeId: e.target.value}))} 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Status</label>
                        <select className="primary-input" 
                            onChange={(e) => setUser((values) => ({...values, status: e.target.value}))} 
                        >
                            <option disabled={true} selected={true}>-- Select --</option>
                            <option value="Active">Active</option>
                            <option value="Inavtive">Inactive</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">User Type</label>
                        <select className="primary-input" 
                            onChange={(e) => setUser((values) => ({...values, userType: e.target.value}))} 
                        >
                            <option disabled={true} selected={true}>-- Select --</option>
                            <option value="Type 1">Type 1</option>
                            <option value="Type 2">Type 2</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Designation</label>
                        <select className="primary-input"
                            onChange={(e) => setUser((values) => ({...values, designation: e.target.value}))} 
                        >
                            <option disabled={true} selected={true}>-- Select --</option>
                            <option value="Designation 1">Designation 1</option>
                            <option value="Designation 2">Designation 2</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Department</label>
                        <select className="primary-input"
                            onChange={(e) => setUser((values) => ({...values, department: e.target.value}))} 
                        >
                            <option disabled={true} selected={true}>-- Select --</option>
                            <option value="Department 1">Department 1</option>
                            <option value="Department 2">Department 2</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Role</label>
                        <select className="primary-input"
                            onChange={(e) => setUser((values) => ({...values, role: e.target.value}))} 
                        >
                            <option disabled={true} selected={true}>-- Select --</option>
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
                                <UserModule
                                    id = {`module-${currentModule.module_name}`}
                                    name = {currentModule.module_name}
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