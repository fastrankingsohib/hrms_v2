const ExperienceField = () => {
    return (
        <div className="grid grid-cols-4 gap-4">
            <div>
                <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Job Title</label>
                <input type="text" className="primary-input" placeholder="Job Title" name="" id="" />
            </div>

            <div>
                <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Department</label>
                <select name="" id="" className="primary-input">
                    <option value="">Software Development</option>
                    <option value="">IT</option>
                </select>
            </div>

            <div>
                <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Organisation Name</label>
                <input type="text" className="primary-input" placeholder="Organisation Name" name="" id="" />
            </div>

            <div>
                <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Total Tenure</label>
                <input type="text" className="primary-input" placeholder="Total Tenure" name="" id="" />
            </div>

            <div>
                <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Last Designation</label>
                <input type="text" className="primary-input" placeholder="Last Designation" name="" id="" />
            </div>

            <div>
                <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Last Drawn Salary</label>
                <input type="text" className="primary-input" placeholder="Last Drawn Salary" name="" id="" />
            </div>

            <div>
                <button type="text" className="primary-button justify-center translate-y-[3.3em]" placeholder="Add more" name="" id="">Add More</button>
            </div>

            {/* <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Qualifications</label>
                        <input type="text" className="primary-input" placeholder="Add more" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Hobbies</label>
                        <input type="text" className="primary-input" placeholder="Hobbies" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Skills</label>
                        <input type="text" className="primary-input" placeholder="Skills" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Recruiter Comments</label>
                        <input type="text" className="primary-input" placeholder="Recruiter Comments" name="" id="" />
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Commuinication Skills</label>
                        <input type="text" className="primary-input" placeholder="Commuinication Skills" name="" id="" />
                    </div> */}
        </div>
    )
}
export default ExperienceField;