import AllJobPosts from "./components/pages/Job/AllJobPosts";
import AllUsers from "./components/pages/User/AllUsers";
import Login from "./components/pages/Login/Login";
// import MyCandidates from "./components/pages/MyCandidates/MyCandidates";
import NewCandidate from "./components/pages/Candidate/NewCandidate";
import NewUser from "./components/pages/User/NewUser";
import PageNotFound from "./components/pages/PageNotFound";
import UserView from "./components/pages/User/UserView";
import Layout from "./components/lays/Layout";
import JobsLayout from "./components/pages/Job/JobsLayout";
import NewJob from "./components/pages/Job/NewJob";
import JobView from "./components/pages/Job/JobView";
import UpdateJobDetails from "./components/pages/Job/UpdateJobDetails";
import CandidateLayout from "./components/pages/Candidate/CandidateLayout";
import CandidateView from "./components/pages/Candidate/CandidateView";
import CandidateLanding from "./components/pages/Candidate/Landing";
import JobLanding from "./components/pages/Job/Landing";
import InterviewLayout from "./components/pages/Interview/InterviewLayout";
import InterviewLanding from "./components/pages/Interview/Landing";
import ViewInterview from "./components/pages/Interview/ViewInterview";
import Home from "./components/pages/Home/Home";
// import AllJobPosts from "./components/pages/Job/AllJobPosts";

const { BrowserRouter, Route, Routes } = require("react-router-dom");
const Application = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" >
                    <Route path="/login" element={<Login />} />
                    <Route path="" element={<Layout />}>
                        <Route path="" element={<Home />} />
                        <Route path="jobs" element={<JobsLayout />}>
                            <Route path="" element={<JobLanding />} />
                            <Route path="new-job" element={<NewJob />} />
                            <Route path="update/:jobId" element={<UpdateJobDetails />} />
                            <Route path="view/:jobId" element={<JobView />} />
                        </Route>

                        <Route path="candidates" element={<CandidateLayout />}>
                            <Route path="" element={<CandidateLanding />} />
                            <Route path="new-candidate" element={<NewCandidate />} />
                            <Route path="view/:candidate_id" element={<CandidateView />} />
                        </Route>

                        <Route path="interviews" element={<InterviewLayout />}>
                            <Route path="" element={<InterviewLanding />} />
                            <Route path="view/:interviewId" element={<ViewInterview />} />
                        </Route>

                        <Route path="candidates" element={<CandidateLayout />}></Route>

                        <Route path="add-new-user" element={<NewUser />} />
                        <Route path="/all-users/" element={<AllUsers />} />
                        <Route path="/user/:userid" element={<UserView />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Application;