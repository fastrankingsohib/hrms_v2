import { useEffect, useState } from "react";
import useRegisterUser from "../../../helpers/useRegisterUser";
import allModules from "./AllModules";
import UserModule from "../../commons/UserModule";
import { useSelector } from "react-redux";
import axios from "axios";

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
            userType: '',
            designation: '',
            department: '',
            role: '',      
        }
    );
    const  [rolesUsers, setrolesUsers] = useState();
    useEffect(() => {
        axios.get("/reporting-to-users").then((res) => {
            setrolesUsers(res.data.report_users);
            console.log(res.data.report_users);
        })
    }, [])


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
                        <label htmlFor="#" className="inline-block p-4 pl-0 font-semibold">Title</label>
                        <select className="primary-input"
                            onChange={(e) => setUser((values) => ({...values, title: e.target.value}))} 
                        >
                            <option value="#" disabled={true}>-- Select --</option>
                            <option value="#">Mr.</option>
                            <option value="#">Ms.</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="#" className="inline-block p-4 pl-0 font-semibold">First Name</label>
                        <input type="text" className="primary-input" placeholder="First Name" name="" id=""
                            onChange={(e) => setUser((values) => ({...values, firstName: e.target.value}))} 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="inline-block p-4 pl-0 font-semibold">Middle Name</label>
                        <input type="text" className="primary-input" placeholder="Middle Name" name="" id="" 
                            onChange={(e) => setUser((values) => ({...values, middleName: e.target.value}))} 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="inline-block p-4 pl-0 font-semibold">Last Name</label>
                        <input type="text" className="primary-input" placeholder="Last Name" name="" id="" 
                            onChange={(e) => setUser((values) => ({...values, lastName: e.target.value}))} 
                        />
                    </div>

                    <div>
                        <label htmlFor="#" className="inline-block p-4 pl-0 font-semibold">Gender</label>
                        <select className="primary-input" 
                            onChange={(e) => setUser((values) => ({...values, gender: e.target.value}))} 
                        >
                            <option value="#" disabled={true}>-- Select --</option>
                            <option value="#">Male</option>
                            <option value="#">Female</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="#" className="inline-block p-4 pl-0 font-semibold">Date of Joining</label>
                        <input type="date" className="primary-input" name="" id="" 
                            onChange={(e) => setUser((values) => ({...values, dateOfJoining: e.target.value}))} 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="inline-block p-4 pl-0 font-semibold">Username</label>
                        <input type="text" className="primary-input" placeholder="Last Name" name="" id="" 
                            onChange={(e) => setUser((values) => ({...values, username: e.target.value}))} 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="inline-block p-4 pl-0 font-semibold">Password</label>
                        <input type="password" className="primary-input" placeholder="Password" name="" id="" 
                            onChange={(e) => setUser((values) => ({...values, password: e.target.value}))} 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="inline-block p-4 pl-0 font-semibold">Confirm Password</label>
                        <input type="password" className="primary-input" placeholder="Confirm Password" name="" id="" 
                            onChange={(e) => setUser((values) => ({...values, confirmPassword: e.target.value}))} 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="inline-block p-4 pl-0 font-semibold">Email ID</label>
                        <input type="email" className="primary-input" placeholder="Email ID" name="" id="" 
                            onChange={(e) => setUser((values) => ({...values, emailId: e.target.value}))} 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="inline-block p-4 pl-0 font-semibold">Mobile</label>
                        <input type="tel" className="primary-input" placeholder="Mobile Number" name="" id="" 
                            onChange={(e) => setUser((values) => ({...values, mobile: e.target.value}))} 
                        />
                    </div>

                    <div>
                        <label htmlFor="#" className="inline-block p-4 pl-0 font-semibold">Date of birth</label>
                        <input type="date" className="primary-input" placeholder="Date of Birth" name="" id="" 
                            onChange={(e) => setUser((values) => ({...values, dateOfBirth: e.target.value}))} 
                        />
                    </div>

                    <div>
                        <label htmlFor="#" className="inline-block p-4 pl-0 font-semibold">Reporting to</label>
                        <select className="primary-input"
                            onChange={(e) => setUser((values) => ({...values, reportingTo: e.target.value}))} 
                        >
                            <option value="#" disabled={true}>-- Select --</option>
                            <option value="#">User 1</option>
                            <option value="#">User 2</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="inline-block p-4 pl-0 font-semibold">Employee ID</label>
                        <input type="text" className="primary-input" placeholder="Emploayee ID" name="" id="" 
                            onChange={(e) => setUser((values) => ({...values, employeeId: e.target.value}))} 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="inline-block p-4 pl-0 font-semibold">Status</label>
                        <select className="primary-input" 
                            onChange={(e) => setUser((values) => ({...values, status: e.target.value}))} 
                        >
                            <option value="#" disabled={true}>-- Select --</option>
                            <option value="#">Active</option>
                            <option value="#">Inactive</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="inline-block p-4 pl-0 font-semibold">User Type</label>
                        <select className="primary-input" 
                            onChange={(e) => setUser((values) => ({...values, userType: e.target.value}))} 
                        >
                            <option value="#" disabled={true}>-- Select --</option>
                            <option value="#">Type 1</option>
                            <option value="#">Type 2</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="inline-block p-4 pl-0 font-semibold">Designation</label>
                        <select className="primary-input"
                            onChange={(e) => setUser((values) => ({...values, designation: e.target.value}))} 
                        >
                            <option value="#" disabled={true}>-- Select --</option>
                            <option value="#">Designation 1</option>
                            <option value="#">Designation 2</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="inline-block p-4 pl-0 font-semibold">Department</label>
                        <select className="primary-input"
                            onChange={(e) => setUser((values) => ({...values, department: e.target.value}))} 
                        >
                            <option value="#" disabled={true}>-- Select --</option>
                            <option value="#">Department 1</option>
                            <option value="#">Department 2</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="inline-block p-4 pl-0 font-semibold">Role</label>
                        <select className="primary-input"
                            onChange={(e) => setUser((values) => ({...values, role: e.target.value}))} 
                        >
                            <option value="#" disabled={true}>-- Select --</option>
                            <option value="#">Super Admin</option>
                            <option value="#">Admin</option>
                            <option value="#">Director</option>
                            <option value="#">Manager</option>
                            <option value="#">Executive</option>
                            <option value="#">Candidate</option>
                            <option value="#">Consultant</option>
                            <option value="#">Other</option>
                        </select>
                    </div>
                </div>


                <div className="grid grid-cols-2 gap-4 mt-10 border-t-2">
                    {
                        allModules.map((currentModule, moduleKey) => {
                            return(
                                <UserModule
                                    id = {`module-${currentModule.moduleName}`}
                                    name = {currentModule.moduleName}
                                />
                            )
                        })
                    }



                    {/* <div className="flex">
                        <div className="flex items-center justify-between h-12 gap-4 px-4 mt-10 bg-gray-100 border">
                            <label htmlFor="Appraisal_ch" className="inline-block min-w-40">Appraisal</label> 
                            <input id="Appraisal_ch" type="checkbox" 
                                onChange={(e) => {
                                    setAssignModules((allModules) => ({...allModules, Appraisal: !assignModules.Appraisal}));
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between h-12 gap-4 p-4 mt-10 border" style={{display: assignModules.Appraisal ? 'flex' : 'none'}}>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_create">Create</label> <input id="Administrator_create" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_read">Read</label> <input id="Administrator_read" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_update">Update</label> <input id="Administrator_update" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_delete">Delete</label> <input id="Administrator_delete" type="checkbox" /></div>
                        </div>
                    </div>


                    <div className="flex">
                        <div className="flex items-center justify-between h-12 gap-4 px-4 mt-10 bg-gray-100 border">
                            <label htmlFor="Candidates_ch" className="inline-block min-w-40">Candidates</label> 
                            <input id="Candidates_ch" type="checkbox" 
                                onChange={(e) => {
                                    setAssignModules((allModules) => ({...allModules, Candidates: !assignModules.Candidates}));
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between h-12 gap-4 p-4 mt-10 border" style={{display: assignModules.Candidates ? 'flex' : 'none'}}>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_create">Create</label> <input id="Administrator_create" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_read">Read</label> <input id="Administrator_read" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_update">Update</label> <input id="Administrator_update" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_delete">Delete</label> <input id="Administrator_delete" type="checkbox" /></div>
                        </div>
                    </div>



                    <div className="flex">
                        <div className="flex items-center justify-between h-12 gap-4 px-4 mt-10 bg-gray-100 border">
                            <label htmlFor="Exit_ch" className="inline-block min-w-40">Exit</label> 
                            <input id="Exit_ch" type="checkbox" 
                                onChange={(e) => {
                                    setAssignModules((allModules) => ({...allModules, Exit: !assignModules.Exit}));
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between h-12 gap-4 p-4 mt-10 border" style={{display: assignModules.Exit ? 'flex' : 'none'}}>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_create">Create</label> <input id="Administrator_create" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_read">Read</label> <input id="Administrator_read" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_update">Update</label> <input id="Administrator_update" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_delete">Delete</label> <input id="Administrator_delete" type="checkbox" /></div>
                        </div>
                    </div>


                    <div className="flex">
                        <div className="flex items-center justify-between h-12 gap-4 px-4 mt-10 bg-gray-100 border">
                            <label htmlFor="Interviews_ch" className="inline-block min-w-40">Interviews</label> 
                            <input id="Interviews_ch" type="checkbox" 
                                onChange={(e) => {
                                    setAssignModules((allModules) => ({...allModules, Interviews: !assignModules.Interviews}));
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between h-12 gap-4 p-4 mt-10 border" style={{display: assignModules.Interviews ? 'flex' : 'none'}}>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_create">Create</label> <input id="Administrator_create" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_read">Read</label> <input id="Administrator_read" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_update">Update</label> <input id="Administrator_update" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_delete">Delete</label> <input id="Administrator_delete" type="checkbox" /></div>
                        </div>
                    </div>



                    <div className="flex">
                        <div className="flex items-center justify-between h-12 gap-4 px-4 mt-10 bg-gray-100 border">
                            <label htmlFor="Jobs_ch" className="inline-block min-w-40">Jobs</label> 
                            <input id="Jobs_ch" type="checkbox" 
                                onChange={(e) => {
                                    setAssignModules((allModules) => ({...allModules, Jobs: !assignModules.Jobs}));
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between h-12 gap-4 p-4 mt-10 border" style={{display: assignModules.Jobs ? 'flex' : 'none'}}>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_create">Create</label> <input id="Administrator_create" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_read">Read</label> <input id="Administrator_read" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_update">Update</label> <input id="Administrator_update" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_delete">Delete</label> <input id="Administrator_delete" type="checkbox" /></div>
                        </div>
                    </div>


                    <div className="flex">
                        <div className="flex items-center justify-between h-12 gap-4 px-4 mt-10 bg-gray-100 border">
                            <label htmlFor="MyProfile_ch" className="inline-block min-w-40">My Profile</label> 
                            <input id="MyProfile_ch" type="checkbox" 
                                onChange={(e) => {
                                    setAssignModules((allModules) => ({...allModules, MyProfile: !assignModules.MyProfile}));
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between h-12 gap-4 p-4 mt-10 border" style={{display: assignModules.MyProfile ? 'flex' : 'none'}}>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_create">Create</label> <input id="Administrator_create" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_read">Read</label> <input id="Administrator_read" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_update">Update</label> <input id="Administrator_update" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_delete">Delete</label> <input id="Administrator_delete" type="checkbox" /></div>
                        </div>
                    </div>


                    <div className="flex">
                        <div className="flex items-center justify-between h-12 gap-4 px-4 mt-10 bg-gray-100 border">
                            <label htmlFor="Offer_ch" className="inline-block min-w-40">Offer</label> 
                            <input id="Offer_ch" type="checkbox" 
                                onChange={(e) => {
                                    setAssignModules((allModules) => ({...allModules, Offer: !assignModules.Offer}));
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between h-12 gap-4 p-4 mt-10 border" style={{display: assignModules.Offer ? 'flex' : 'none'}}>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_create">Create</label> <input id="Administrator_create" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_read">Read</label> <input id="Administrator_read" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_update">Update</label> <input id="Administrator_update" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_delete">Delete</label> <input id="Administrator_delete" type="checkbox" /></div>
                        </div>
                    </div>


                    <div className="flex">
                        <div className="flex items-center justify-between h-12 gap-4 px-4 mt-10 bg-gray-100 border">
                            <label htmlFor="OnBoarding_ch" className="inline-block min-w-40">On Boarding</label> 
                            <input id="OnBoarding_ch" type="checkbox" 
                                onChange={(e) => {
                                    setAssignModules((allModules) => ({...allModules, OnBoarding: !assignModules.OnBoarding}));
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between h-12 gap-4 p-4 mt-10 border" style={{display: assignModules.OnBoarding ? 'flex' : 'none'}}>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_create">Create</label> <input id="Administrator_create" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_read">Read</label> <input id="Administrator_read" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_update">Update</label> <input id="Administrator_update" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_delete">Delete</label> <input id="Administrator_delete" type="checkbox" /></div>
                        </div>
                    </div>



                    <div className="flex">
                        <div className="flex items-center justify-between h-12 gap-4 px-4 mt-10 bg-gray-100 border">
                            <label htmlFor="Training_ch" className="inline-block min-w-40">Training</label> 
                            <input id="Training_ch" type="checkbox" 
                                onChange={(e) => {
                                    setAssignModules((allModules) => ({...allModules, Training: !assignModules.Training}));
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between h-12 gap-4 p-4 mt-10 border" style={{display: assignModules.Training ? 'flex' : 'none'}}>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_create">Create</label> <input id="Administrator_create" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_read">Read</label> <input id="Administrator_read" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_update">Update</label> <input id="Administrator_update" type="checkbox" /></div>
                            <div className="inline-flex items-center gap-4 p-4"><label htmlFor="Administrator_delete">Delete</label> <input id="Administrator_delete" type="checkbox" /></div>
                        </div>
                    </div> */}
                    
                </div>


                <div className="flex items-center justify-end mt-10">
                    <div className="w-1/4 pl-4">
                        <button className="justify-center primary-button">Submit</button>
                    </div>
                </div>
            </form>
        </section>
    )
}
export default NewUser;