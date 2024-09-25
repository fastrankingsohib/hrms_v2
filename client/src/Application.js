import AllJobs from "./components/pages/AllJobs/AllJobs";
import JobOpening from "./components/pages/JobOpening/JobOpening";
import Login from "./components/pages/Login/Login";
import NewCandidate from "./components/pages/NewCandidate/NewCandidate";
import NewUser from "./components/pages/NewUser/NewUser";
import PageNotFound from "./components/pages/PageNotFound";
import PostNewJob from "./components/pages/PostNewJob/PostNewJob";
import Layout from "./components/requires/Layout";

const { BrowserRouter, Route, Routes } = require("react-router-dom")

const Application = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" >
                    <Route path="/login" element={<Login />} />
                    <Route path="" element={<Layout />}>
                        <Route path="/post-new-job" element={<PostNewJob />} />
                        <Route path="/all-job-posts" element={<AllJobs />} />
                        <Route path="/all-job-posts/job/01" element={<JobOpening />} />
                        <Route path="/add-new-user" element={<NewUser />} />
                        <Route path="/add-new-candidate" element={<NewCandidate />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Application;