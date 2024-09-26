import axios from "axios";
import { useSelector } from "react-redux";

const useRegisterUser = () => {
    const allModules = useSelector((state) => state.userModules);
    const selectedModules = [];
    allModules.map((module, moduleKey) => {
        if(module.moduleSelected){
            selectedModules.push({
                module_name: module.moduleName,
                c: module.c,
                r: module.r,
                u: module.u,
                d: module.d
            });
        }
    })

    const registerUser = (user) => {
        console.log(user);
        console.log(selectedModules);
        // axios.post("/register", {
        //     "title": user.title,
        //     "first_name": user.firstName,
        //     "middle_name": user.middleName,
        //     "last_name": user.lastName,
        //     "gender": user.gender,
        //     "dob": user.dateOfBirth,
        //     "email": user.email,
        //     "mobile": user.mobile,
        //     "username": user.username,
        //     "password": user.password,
        //     "date_of_joining": user.dateOfJoining,
        //     "employee_id": user.employeeId,
        //     "designation": user.designation,
        //     "status": user.status,
        //     "department": user.department,
        //     "user_type": user.userType,
        //     "role": user.role,
        //     "reporting_to": user.reportingTo,
        //     "created_by": "_____",
        //     "modules": selectedModules
        //   }
        // ).then((response) => console.log(response.data)).catch((err) => console.log(err));
    }

    return { registerUser }
}

export default useRegisterUser;