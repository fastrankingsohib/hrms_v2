import AllJobs from "./components/pages/AllJobs/AllJobs";
import AllUsers from "./components/pages/AllUsers/AllUsers";
import JobOpening from "./components/pages/JobOpening/JobOpening";
import Login from "./components/pages/Login/Login";
import MyCandidates from "./components/pages/MyCandidates/MyCandidates";
import NewCandidate from "./components/pages/NewCandidate/NewCandidate";
import NewUser from "./components/pages/NewUser/NewUser";
import PageNotFound from "./components/pages/PageNotFound";
import PostNewJob from "./components/pages/PostNewJob/PostNewJob";
import UserView from "./components/pages/userView/UserView";
import Layout from "./components/Layouts/Layout";
import JobsLayout from "./components/Layouts/Job/JobsLayout";
import NewJob from "./components/Commons/NewJob";
import JobView from "./components/pages/JobView/JobView";
import JobOverview from "./components/pages/JobView/JobOverview";

const { BrowserRouter, Route, Routes } = require("react-router-dom");
const Application = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" >
                    <Route path="/login" element={<Login />} />
                    <Route path="" element={<Layout />}>
                        <Route path="jobs" element={<JobsLayout />}>
                            <Route path="new-job" element={<NewJob />} />
                            <Route path="view/:jobId" element={<JobView />} />
                        </Route>

                        <Route path="/all-job-posts" element={<AllJobs />} />
                        <Route path="/all-job-posts/job/01" element={<JobOpening />} />
                        <Route path="/add-new-user" element={<NewUser />} />
                        <Route path="/all-users/" element={<AllUsers />} />
                        <Route path="/user/:userid" element={<UserView />} />
                        <Route path="/add-new-candidate" element={<NewCandidate />} />
                        <Route path="/my-candidates" element={<MyCandidates />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Application;