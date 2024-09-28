import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { resetModules } from "../redux/reducers/auth_slice";
import { useNavigate } from "react-router-dom";

const useUpdateUser = () => {
    let userModules = useSelector((state) => state.userModules);
    let navigate = useNavigate()
    let dispatch = useDispatch()
    
    
    const updateUser = (user, userid) => {
        const updatedModules = [];
        userModules.map((currentModule, moduleKey) => {
            if(currentModule.moduleSelected || currentModule.module_status){
                updatedModules.push(currentModule);
            }
        })
        // console.log(updatedModules);

        // console.log(userid, user)
        // console.log(userModules)
        axios.post(`/userdata/update/${userid}`, {
            "title": user.title,
            "first_name": user.firstName,
            "middle_name": user.middleName,
            "last_name": user.lastName,
            "gender": user.gender,
            "dob": user.dateOfBirth,
            "email": user.emailId,
            "mobile": user.mobile,
            "date_of_joining": user.dateOfJoining,
            "employee_id": user.employeeId,
            "designation": user.designation,
            "status": user.status,
            "department": user.department,
            "user_type": user.userType,
            "role": user.role,
            "reporting_to": user.reportingTo,
            "created_by": "----",
            "modules": updatedModules
        })
        .then((response) => {
            console.log(response);
            dispatch(resetModules());
            navigate('/all-users');
        })
        .catch((err) => console.log(err))
    }
    return { updateUser }
}

export default useUpdateUser;