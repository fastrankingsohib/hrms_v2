import { FaUserPlus, FaUsers } from "react-icons/fa";
import { HiPlusSm } from "react-icons/hi";

const allSideBarLinks = [
    {
        module_name: "Administrator",
        moduleIcon: <HiPlusSm />,
        subLinks: [
            {
                label: "Add New User",
                to: "/add-new-user",
            },
            {
                label: "All Users",
                to: "/all-users",
            }
        ]
    },
    {
        module_name: "Candidates",
        moduleIcon: <FaUserPlus />,
        subLinks: [
            {
                label: "Add New Candidate",
                to: "/add-new-candidate",
            },
            {
                label: "My Candidates",
                to: "/my-candidates",
            },
            {
                label: "All Candidates",
                to: "/all-candidates",
            }
        ]
    },
    {
        module_name: "Interviews",
        moduleIcon: <FaUsers />, // Use a different icon as necessary
        subLinks: [
            {
                label: "Schedule Interview",
                to: "/schedule-interview",
            },
            {
                label: "All Interviews",
                to: "/all-interviews",
            }
        ]
    },
    {
        module_name: "Offer",
        moduleIcon: <FaUsers />, // Use a different icon as necessary
        subLinks: [
            {
                label: "Create Offer",
                to: "/create-offer",
            },
            {
                label: "All Offers",
                to: "/all-offers",
            }
        ]
    },
    {
        module_name: "Training",
        moduleIcon: <FaUsers />, // Use a different icon as necessary
        subLinks: [
            {
                label: "Assign Training",
                to: "/assign-training",
            },
            {
                label: "Training Records",
                to: "/training-records",
            }
        ]
    },
    {
        module_name: "On-Boarding",
        moduleIcon: <FaUsers />, // Use a different icon as necessary
        subLinks: [
            {
                label: "On-Board New Employee",
                to: "/onboard-new-employee",
            },
            {
                label: "All On-Boardings",
                to: "/all-onboardings",
            }
        ]
    },
    {
        module_name: "Appraisal",
        moduleIcon: <FaUsers />, // Use a different icon as necessary
        subLinks: [
            {
                label: "Start Appraisal",
                to: "/start-appraisal",
            },
            {
                label: "Appraisal Records",
                to: "/appraisal-records",
            }
        ]
    },
    {
        module_name: "Pay-Roll",
        moduleIcon: <FaUsers />, // Use a different icon as necessary
        subLinks: [
            {
                label: "Salary Management",
                to: "/salary-management",
            },
            {
                label: "Pay-Roll Records",
                to: "/payroll-records",
            }
        ]
    },
    {
        module_name: "Exit",
        moduleIcon: <FaUsers />, // Use a different icon as necessary
        subLinks: [
            {
                label: "Process Exit",
                to: "/process-exit",
            },
            {
                label: "Exit Records",
                to: "/exit-records",
            }
        ]
    },
    {
        module_name: "Jobs",
        moduleIcon: <FaUsers />, // Use a different icon as necessary
        subLinks: [
            {
                label: "Post New Job",
                to: "/post-new-job",
            },
            {
                label: "All Jobs",
                to: "/all-jobs",
            }
        ]
    },
    {
        module_name: "My Profile",
        moduleIcon: <FaUserPlus />,
        subLinks: [
            {
                label: "View Profile",
                to: "/view-profile",
            },
            {
                label: "Edit Profile",
                to: "/edit-profile",
            }
        ]
    }
];

export default allSideBarLinks;