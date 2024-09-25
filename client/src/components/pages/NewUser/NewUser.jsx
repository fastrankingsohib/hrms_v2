import { useEffect, useState } from "react";
import axios from 'axios';

const NewUser = () => {
    const [assignModules, setAssignModules] = useState(
        {
            Administrator: false, 
            Candidates: false, 
            Interviews: false, 
            Offer: false, 
            Training: false, 
            OnBoarding: false, 
            Appraisal: false, 
            Exit: false, 
            Jobs: false, 
            MyProfile: false
        }
    );
    const  [rolesUsers, setrolesUsers] = useState();
    useEffect(() => {
        axios.get("/reporting-to-users").then((res) => {
            setrolesUsers(res.data.report_users);
            console.log(res.data.report_users);
        })
    }, [])


    return(
        <section className="p-4 component-rendering-tranistion">
            <h1 className="text-2xl font-semibold">Create New User</h1>

            <div className="w-full mt-10">
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Title</label>
                        <select className="primary-input">
                            <option value="#">Mr.</option>
                            <option value="#">Ms.</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">First Name</label>
                        <input type="text" className="primary-input" placeholder="First Name" name="" id="" />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Middle Name</label>
                        <input type="text" className="primary-input" placeholder="Middle Name" name="" id="" />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Last Name</label>
                        <input type="text" className="primary-input" placeholder="Last Name" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Gender</label>
                        <select className="primary-input">
                            <option value="#">Male</option>
                            <option value="#">Female</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Date of Joining</label>
                        <input type="date" className="primary-input" name="" id="" />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Username</label>
                        <input type="text" className="primary-input" placeholder="Last Name" name="" id="" />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Password</label>
                        <input type="password" className="primary-input" placeholder="Last Name" name="" id="" />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Confirm Password</label>
                        <input type="password" className="primary-input" placeholder="Last Name" name="" id="" />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Email ID</label>
                        <input type="email" className="primary-input" placeholder="Last Name" name="" id="" />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Mobile</label>
                        <input type="tel" className="primary-input" placeholder="Last Name" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Date of birth</label>
                        <input type="date" className="primary-input" placeholder="Last Name" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Reporting to</label>
                        <select className="primary-input">
                            <option value="#">User 1</option>
                            <option value="#">User 2</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Employee ID</label>
                        <input type="text" className="primary-input" placeholder="Last Name" name="" id="" />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Status</label>
                        <select className="primary-input">
                            <option value="#">Active</option>
                            <option value="#">Inactive</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">User Type</label>
                        <select className="primary-input">
                            <option value="#">Type 1</option>
                            <option value="#">Type 2</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Designation</label>
                        <select className="primary-input">
                            <option value="#">Designation 1</option>
                            <option value="#">Designation 2</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Department</label>
                        <select className="primary-input">
                            <option value="#">Department 1</option>
                            <option value="#">Department 2</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Role</label>
                        <select className="primary-input">
                            <option disabled={true} selected={true}>-- Select Role --</option>
                            {
                                rolesUsers ? rolesUsers.map((role, index) => {
                                    return (
                                        <option key={index} value={role}>{role.username}</option>
                                    )
                                }) : <option>No Users</option>
                            }
                        </select>
                    </div>
                </div>


                <div className="grid gap-4 grid-cols-2 border-t-2 mt-10">
                    <div className="flex">
                        <div className="px-4 h-12 border flex gap-4 justify-between items-center mt-10 bg-gray-100">
                            <label htmlFor="Administrator_ch" className="inline-block min-w-40">Administrator</label> 
                            <input id="Administrator_ch" type="checkbox" 
                                onChange={(e) => {
                                    setAssignModules((allModules) => ({...allModules, Administrator: !assignModules.Administrator}));
                                }}
                            />
                        </div>
                        <div className="p-4 h-12 border flex gap-4 justify-between items-center mt-10 bg-white" style={{display: assignModules.Administrator ? 'flex' : 'none'}}>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_create">Create</label> <input id="Administrator_create" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_read">Read</label> <input id="Administrator_read" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_update">Update</label> <input id="Administrator_update" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_delete">Delete</label> <input id="Administrator_delete" type="checkbox" /></div>
                        </div>
                    </div>



                    <div className="flex">
                        <div className="px-4 h-12 border flex gap-4 justify-between items-center mt-10 bg-gray-100">
                            <label htmlFor="Appraisal_ch" className="inline-block min-w-40">Appraisal</label> 
                            <input id="Appraisal_ch" type="checkbox" 
                                onChange={(e) => {
                                    setAssignModules((allModules) => ({...allModules, Appraisal: !assignModules.Appraisal}));
                                }}
                            />
                        </div>
                        <div className="p-4 h-12 border flex gap-4 justify-between items-center mt-10" style={{display: assignModules.Appraisal ? 'flex' : 'none'}}>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_create">Create</label> <input id="Administrator_create" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_read">Read</label> <input id="Administrator_read" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_update">Update</label> <input id="Administrator_update" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_delete">Delete</label> <input id="Administrator_delete" type="checkbox" /></div>
                        </div>
                    </div>


                    <div className="flex">
                        <div className="px-4 h-12 border flex gap-4 justify-between items-center mt-10 bg-gray-100">
                            <label htmlFor="Candidates_ch" className="inline-block min-w-40">Candidates</label> 
                            <input id="Candidates_ch" type="checkbox" 
                                onChange={(e) => {
                                    setAssignModules((allModules) => ({...allModules, Candidates: !assignModules.Candidates}));
                                }}
                            />
                        </div>
                        <div className="p-4 h-12 border flex gap-4 justify-between items-center mt-10" style={{display: assignModules.Candidates ? 'flex' : 'none'}}>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_create">Create</label> <input id="Administrator_create" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_read">Read</label> <input id="Administrator_read" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_update">Update</label> <input id="Administrator_update" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_delete">Delete</label> <input id="Administrator_delete" type="checkbox" /></div>
                        </div>
                    </div>



                    <div className="flex">
                        <div className="px-4 h-12 border flex gap-4 justify-between items-center mt-10 bg-gray-100">
                            <label htmlFor="Exit_ch" className="inline-block min-w-40">Exit</label> 
                            <input id="Exit_ch" type="checkbox" 
                                onChange={(e) => {
                                    setAssignModules((allModules) => ({...allModules, Exit: !assignModules.Exit}));
                                }}
                            />
                        </div>
                        <div className="p-4 h-12 border flex gap-4 justify-between items-center mt-10" style={{display: assignModules.Exit ? 'flex' : 'none'}}>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_create">Create</label> <input id="Administrator_create" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_read">Read</label> <input id="Administrator_read" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_update">Update</label> <input id="Administrator_update" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_delete">Delete</label> <input id="Administrator_delete" type="checkbox" /></div>
                        </div>
                    </div>


                    <div className="flex">
                        <div className="px-4 h-12 border flex gap-4 justify-between items-center mt-10 bg-gray-100">
                            <label htmlFor="Interviews_ch" className="inline-block min-w-40">Interviews</label> 
                            <input id="Interviews_ch" type="checkbox" 
                                onChange={(e) => {
                                    setAssignModules((allModules) => ({...allModules, Interviews: !assignModules.Interviews}));
                                }}
                            />
                        </div>
                        <div className="p-4 h-12 border flex gap-4 justify-between items-center mt-10" style={{display: assignModules.Interviews ? 'flex' : 'none'}}>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_create">Create</label> <input id="Administrator_create" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_read">Read</label> <input id="Administrator_read" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_update">Update</label> <input id="Administrator_update" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_delete">Delete</label> <input id="Administrator_delete" type="checkbox" /></div>
                        </div>
                    </div>



                    <div className="flex">
                        <div className="px-4 h-12 border flex gap-4 justify-between items-center mt-10 bg-gray-100">
                            <label htmlFor="Jobs_ch" className="inline-block min-w-40">Jobs</label> 
                            <input id="Jobs_ch" type="checkbox" 
                                onChange={(e) => {
                                    setAssignModules((allModules) => ({...allModules, Jobs: !assignModules.Jobs}));
                                }}
                            />
                        </div>
                        <div className="p-4 h-12 border flex gap-4 justify-between items-center mt-10" style={{display: assignModules.Jobs ? 'flex' : 'none'}}>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_create">Create</label> <input id="Administrator_create" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_read">Read</label> <input id="Administrator_read" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_update">Update</label> <input id="Administrator_update" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_delete">Delete</label> <input id="Administrator_delete" type="checkbox" /></div>
                        </div>
                    </div>


                    <div className="flex">
                        <div className="px-4 h-12 border flex gap-4 justify-between items-center mt-10 bg-gray-100">
                            <label htmlFor="MyProfile_ch" className="inline-block min-w-40">My Profile</label> 
                            <input id="MyProfile_ch" type="checkbox" 
                                onChange={(e) => {
                                    setAssignModules((allModules) => ({...allModules, MyProfile: !assignModules.MyProfile}));
                                }}
                            />
                        </div>
                        <div className="p-4 h-12 border flex gap-4 justify-between items-center mt-10" style={{display: assignModules.MyProfile ? 'flex' : 'none'}}>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_create">Create</label> <input id="Administrator_create" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_read">Read</label> <input id="Administrator_read" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_update">Update</label> <input id="Administrator_update" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_delete">Delete</label> <input id="Administrator_delete" type="checkbox" /></div>
                        </div>
                    </div>


                    <div className="flex">
                        <div className="px-4 h-12 border flex gap-4 justify-between items-center mt-10 bg-gray-100">
                            <label htmlFor="Offer_ch" className="inline-block min-w-40">Offer</label> 
                            <input id="Offer_ch" type="checkbox" 
                                onChange={(e) => {
                                    setAssignModules((allModules) => ({...allModules, Offer: !assignModules.Offer}));
                                }}
                            />
                        </div>
                        <div className="p-4 h-12 border flex gap-4 justify-between items-center mt-10" style={{display: assignModules.Offer ? 'flex' : 'none'}}>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_create">Create</label> <input id="Administrator_create" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_read">Read</label> <input id="Administrator_read" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_update">Update</label> <input id="Administrator_update" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_delete">Delete</label> <input id="Administrator_delete" type="checkbox" /></div>
                        </div>
                    </div>


                    <div className="flex">
                        <div className="px-4 h-12 border flex gap-4 justify-between items-center mt-10 bg-gray-100">
                            <label htmlFor="OnBoarding_ch" className="inline-block min-w-40">On Boarding</label> 
                            <input id="OnBoarding_ch" type="checkbox" 
                                onChange={(e) => {
                                    setAssignModules((allModules) => ({...allModules, OnBoarding: !assignModules.OnBoarding}));
                                }}
                            />
                        </div>
                        <div className="p-4 h-12 border flex gap-4 justify-between items-center mt-10" style={{display: assignModules.OnBoarding ? 'flex' : 'none'}}>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_create">Create</label> <input id="Administrator_create" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_read">Read</label> <input id="Administrator_read" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_update">Update</label> <input id="Administrator_update" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_delete">Delete</label> <input id="Administrator_delete" type="checkbox" /></div>
                        </div>
                    </div>



                    <div className="flex">
                        <div className="px-4 h-12 border flex gap-4 justify-between items-center mt-10 bg-gray-100">
                            <label htmlFor="Training_ch" className="inline-block min-w-40">Training</label> 
                            <input id="Training_ch" type="checkbox" 
                                onChange={(e) => {
                                    setAssignModules((allModules) => ({...allModules, Training: !assignModules.Training}));
                                }}
                            />
                        </div>
                        <div className="p-4 h-12 border flex gap-4 justify-between items-center mt-10" style={{display: assignModules.Training ? 'flex' : 'none'}}>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_create">Create</label> <input id="Administrator_create" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_read">Read</label> <input id="Administrator_read" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_update">Update</label> <input id="Administrator_update" type="checkbox" /></div>
                            <div className="p-4 inline-flex items-center gap-4"><label htmlFor="Administrator_delete">Delete</label> <input id="Administrator_delete" type="checkbox" /></div>
                        </div>
                    </div>
                    
                </div>


                <div className="flex items-center justify-end mt-10">
                    <div className="w-1/4 pl-4">
                        <button className="primary-button justify-center">Submit</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default NewUser;