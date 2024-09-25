const PostNewJob = () => {
    return(
        <section className="p-4 component-rendering-tranistion">
            <h1 className="text-2xl font-semibold">Post New Job</h1>

            <div className="w-full mt-10">
                <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Job Title</label>
                <input type="text" className="primary-input" placeholder="Job Title" />

                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Department</label>
                        <select className="primary-input">
                            <option value="#"> Select Departament</option>
                            <option value="#">Software Development</option>
                            <option value="#">IT</option>
                            <option value="#">HR</option>
                            <option value="#">BPO</option>
                            <option value="#">Other</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Type</label>
                        <select className="primary-input">
                            <option value="#"> Select Job Type</option>
                            <option value="#">Permanent</option>
                            <option value="#">Part Time</option>
                            <option value="#">Intern</option>
                            <option value="#">Trainee</option>
                        </select>
                    </div>


                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Total Openings</label>
                        <input type="number" className="primary-input" placeholder="Total Openings" name="" id="" />
                    </div>


                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">Start Date</label>
                        <input type="date" className="primary-input" name="" id="" />
                    </div>
                </div>




                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <label htmlFor="#" className="font-semibold inline-block p-4 pl-0">End Date</label>
                        <input type="date" className="primary-input" name="" id="" />
                    </div>
                </div>


                <div className="flex items-center justify-end">
                    <div className="w-1/4 pl-4">
                        <button className="primary-button justify-center">Publish Job</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PostNewJob;