import { Link } from "react-router-dom"
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { HiEnvelopeOpen } from "react-icons/hi2";
import { FaCalendar, FaCalendarTimes } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";
import { useState } from "react";
import { isEditable } from "@testing-library/user-event/dist/utils";
import { MdModeEditOutline } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";


const JobOpening = () => {
    const [isEditEnabled, setIsEditEnabled] = useState(false);
    const [jobDetails, setJobDetails] = useState({});
    const [job, updateJob] = useState({
        location: '',
        jobName: 'Software Developer',
        department: '',
        type: '',
        openings: 0,
        startDate: '',
        endDate: '',
        applicants: ''
    });
    return(
        <section className="p-4 component-rendering-tranistion">
            <div className="text-gray-600">
                <Link className="inline-flex items-center" to={'/all-job-posts'}>
                    <IoIosArrowRoundBack size={'24px'} /> 
                    <span className="ml-1 -mt-[2.5px]">All Jobs</span>
                </Link>
            </div>
            <h1 className="my-4 items-center flex justify-between">
                <span className="text-2xl">
                    Job Post: <strong className="text-2xl">#SEPT2024001</strong>
                </span>

                <span className="inline-flex gap-4">
                    <button className="primary-button h-12"
                        onClick={() => {
                            setIsEditEnabled(!isEditEnabled);
                            console.log(job)
                        }}
                    >
                        {
                            isEditEnabled 
                            ?   <span className="inline-flex items-center gap-4"><MdOutlineDone size={'17px'} /> Save Job Details</span>
                            :   <span className="inline-flex items-center gap-4"><MdModeEditOutline /> Edit Job Details</span>
                        }
                    </button>
                </span>
            </h1>


            <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center">
                    <span className="inline-flex items-center h-12 p-4 w-52 border">
                        <FaLocationDot />
                        <span className="ml-2">Location</span>
                    </span>
                    <input 
                        onChange={(e) => updateJob((details) => ({...details, location: e.target.value}))}
                        type="text"
                        defaultValue={'Janakpuri, New Delhi'}
                        disabled={isEditEnabled ? false : true}
                        className="border border-l-0 w-full h-12 flex items-center p-4" 
                    />
                </div>

                <div className="flex items-center">
                    <span className="inline-flex items-center h-12 p-4 w-52 border">
                        <FaUserTie />
                        <span className="ml-2">Department</span>
                    </span>
                    <select id=""
                        onChange={(e) => updateJob((details) => ({...details, department: e.target.value}))}
                        defaultValue={'Permanent'}
                        disabled={isEditEnabled ? false : true}
                        className="border border-l-0 w-full h-12 flex items-center px-4" 
                    >
                        <option value="Software Development">Software Development</option>
                        <option value="Information Techonlogy">Information Techonlogy</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="BPO">BPO</option>
                        <option value="Accounts">Accounts</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div className="flex items-center">
                    <span className="inline-flex items-center h-12 p-4 w-52 border">
                        <MdAccessTimeFilled />
                        <span className="ml-2">Type</span>
                    </span>
                    
                    <select id=""
                        onChange={(e) => updateJob((details) => ({...details, type: e.target.value}))}
                        defaultValue={'Permanent'}
                        disabled={isEditEnabled ? false : true}
                        className="border border-l-0 w-full h-12 flex items-center px-4" 
                    >
                        <option value="Permanent">Permanent</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Intern">Intern</option>
                        <option value="Trainee">Trainee</option>
                    </select>
                </div>

                <div className="flex items-center">
                    <span className="inline-flex items-center h-12 p-4 w-52 border">
                        <HiEnvelopeOpen />
                        <span className="ml-2">Openings</span>
                    </span>
                    <input 
                        onChange={(e) => updateJob((details) => ({...details, openings: e.target.value}))}
                        type="number"
                        defaultValue={'10'}
                        disabled={isEditEnabled ? false : true}
                        className="border border-l-0 w-full h-12 flex items-center p-4" 
                    />
                </div>

                <div className="flex items-center">
                    <span className="inline-flex items-center h-12 p-4 w-52 border">
                        <FaCalendar />
                        <span className="ml-2">Start Date</span>
                    </span>
                    <input 
                        onChange={(e) => updateJob((details) => ({...details, startDate: e.target.value}))}
                        type="date"
                        defaultValue={'10 Sept 2024'}
                        disabled={isEditEnabled ? false : true}
                        className="border border-l-0 w-full h-12 flex items-center p-4" 
                    />
                </div>

                <div className="flex items-center">
                    <span className="inline-flex items-center h-12 p-4 w-52 border">
                        <FaCalendarTimes />
                        <span className="ml-2">End Date</span>
                    </span>
                    <input 
                        onChange={(e) => updateJob((details) => ({...details, endDate: e.target.value}))}
                        type="date"
                        defaultValue={'10 Oct 2024'}
                        disabled={isEditEnabled ? false : true}
                        className="border border-l-0 w-full h-12 flex items-center p-4" 
                    />
                </div>

                <div className="flex items-center">
                    <span className="inline-flex items-center h-12 p-4 w-52 border">
                        <RiLoginBoxFill />
                        <span className="ml-2">Applicants</span>
                    </span>
                    <input 
                        onChange={(e) => updateJob((details) => ({...details, applicants: e.target.value}))}
                        type="number"
                        defaultValue={'2'}
                        disabled={isEditEnabled ? false : true}
                        className="border border-l-0 w-full h-12 flex items-center p-4" 
                    />
                </div>
            </div>
        </section>
    )
}

export default JobOpening