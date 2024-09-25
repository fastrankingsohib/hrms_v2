import { Link } from "react-router-dom"

const AllJobs = () => {
    return(
        <section className="p-4 component-rendering-tranistion">
            <h1 className="text-2xl font-semibold">All Jobs</h1>

            <div className="bg-gray-100 rounded-lg p-4 grid grid-cols-7 font-bold mt-2">
                <div>Sr. No.</div>
                <div>Job Title</div>
                <div>Department</div>
                <div>Total Opening</div>
                <div>Start Date</div>
                <div>End Date</div>
                <div>Total Submissions</div>
            </div>

            <Link to={'/all-job-posts/job/01'} className="rounded-lg p-4 grid grid-cols-7 mt-2">
                <div>Sr. No.</div>
                <div>Job Title</div>
                <div>Department</div>
                <div>Total Opening</div>
                <div>Start Date</div>
                <div>End Date</div>
                <div>Total Submissions</div>
            </Link>
        </section>
    )
}

export default AllJobs