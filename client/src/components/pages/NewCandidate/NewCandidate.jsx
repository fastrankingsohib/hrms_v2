import { useState } from "react";
import ExperienceField from "../../commons/ExperienceField";
import Qualifications from "../../commons/Qualifications";
import Hobbies from "../../commons/Hobbies";
import { useSelector } from "react-redux";

const NewCandidate = () => {
    const qualifications = useSelector((state) => state.qualifications);
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

    return (
        <section className="p-4 component-rendering-tranistion">
            <h1 className="text-2xl font-semibold">Create New Candidate</h1>

            <div className="w-full mt-10">


                <h1 className="flex items-center"><span className="inline-block min-w-fit text-2xl mr-5">Personal Details</span> <hr className="w-full" /></h1>

                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Title</label>
                        <select className="primary-input">
                            <option value="Mr." selected disabled>-- Select Title --</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Ms.">Ms.</option>
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
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Address Line 1</label>
                        <input type="text" className="primary-input" placeholder="Address Line1" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Address Line 2</label>
                        <input type="text" className="primary-input" placeholder="Address Line 2" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">City</label>
                        <input type="text" className="primary-input" placeholder="Address Line 2" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">State</label>
                        <input type="text" className="primary-input" placeholder="State" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Pin Code</label>
                        <input type="text" className="primary-input" placeholder="Pin Code" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Country</label>
                        <input type="text" className="primary-input" placeholder="Country" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Contact Number</label>
                        <input type="tel" className="primary-input" placeholder="Contact Number" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Alt. Contact Number</label>
                        <input type="tel" className="primary-input" placeholder="Alt. Contact Number" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Email Address</label>
                        <input type="email" className="primary-input" placeholder="Email Address" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Alt. Email Address</label>
                        <input type="email" className="primary-input" placeholder="Alt. Email Address" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Date of Birth</label>
                        <input type="date" className="primary-input" placeholder="Date of Birth" name="" id="" />
                    </div>
                    
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Job Title</label>
                        
                        <select className="primary-input">
                        <option value="" selected disabled>-- Job Title --</option>

                        <optgroup label="Sales">
                            <option value="Telesales">Telesales</option>
                            <option value="Sales Manager">Sales Manager</option>
                            <option value="Account Executive">Account Executive</option>
                            <option value="Business Development Manager">Business Development Manager</option>
                        </optgroup>

                        <optgroup label="Development">
                            <option value="Frontend Developer">Frontend Developer</option>
                            <option value="Backend Developer">Backend Developer</option>
                            <option value="Full Stack Developer">Full Stack Developer</option>
                            <option value="Mobile App Developer">Mobile App Developer</option>
                        </optgroup>

                        <optgroup label="Design">
                            <option value="UI/UX Designer">UI/UX Designer</option>
                            <option value="Graphic Designer">Graphic Designer</option>
                            <option value="Product Designer">Product Designer</option>
                            <option value="Web Designer">Web Designer</option>
                        </optgroup>

                        <optgroup label="Marketing">
                            <option value="Digital Marketing Specialist">Digital Marketing Specialist</option>
                            <option value="Content Strategist">Content Strategist</option>
                            <option value="SEO Specialist">SEO Specialist</option>
                            <option value="Social Media Manager">Social Media Manager</option>
                        </optgroup>

                        <optgroup label="Management">
                            <option value="Project Manager">Project Manager</option>
                            <option value="Operations Manager">Operations Manager</option>
                            <option value="Product Manager">Product Manager</option>
                            <option value="Human Resources Manager">Human Resources Manager</option>
                        </optgroup>
                    </select>
                    </div>

                </div>


                <h1 className="flex items-center my-8"><span className="inline-block min-w-fit text-2xl mr-5">Experience</span> <hr className="w-full" /></h1>
                <ExperienceField />
                <h1 className="flex items-center my-8"><span className="inline-block min-w-fit text-2xl mr-5">Qualifications</span> <hr className="w-full" /></h1>
                <Qualifications />
                <h1 className="flex items-center my-8"><span className="inline-block min-w-fit text-2xl mr-5">Hobbies</span> <hr className="w-full" /></h1>
                <Hobbies />



                <div className="flex items-center justify-end mt-10">
                    <div className="w-1/4 pl-4">
                        <button className="primary-button justify-center"
                            onClick={() => console.log(qualifications)}
                        >Create User</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default NewCandidate;