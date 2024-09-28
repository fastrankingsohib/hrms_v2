import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { resetModules } from "../redux/reducers/auth_slice";

const useUpdateUser = () => {
    let userModules = useSelector((state) => state.userModules);
    let dispatch = useDispatch()
    
    
    const updateUser = (user, userid) => {
        console.log(userModules)
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
            "modules": userModules
        })
        .then((response) => {
            console.log(response);
            dispatch(resetModules());
        })
        .catch((err) => console.log(err))
    }
    return { updateUser }
}

export default useUpdateUser;