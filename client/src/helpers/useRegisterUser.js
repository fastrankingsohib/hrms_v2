import axios from "axios";

const useRegisterUser = () => {
    const registerUser = (user) => {
        console.log(user);
        axios.post("/register", {
            "title": user.title,
            "first_name": user.firstName,
            "middle_name": user.middleName,
            "last_name": user.lastName,
            "gender": user.gender,
            "dob": user.dateOfBirth,
            "email": user.email,
            "mobile": user.mobile,
            "username": user.username,
            "password": user.password,
            "date_of_joining": user.dateOfJoining,
            "employee_id": user.employeeId,
            "designation": user.designation,
            "status": user.status,
            "department": user.department,
            "user_type": user.userType,
            "role": user.role,
            "reporting_to": user.reportingTo,
            "module": user.module,
            "created_by": "_____",
            "modules": [
                {
                    "module_name": "Administrator",
                    "c": 1,
                    "r": 1,
                    "u": 1,
                    "d": 0
                },
                {
                    "module_name": "Candidates",
                    "c": 1,
                    "r": 1,
                    "u": 0,
                    "d": 0
                },
                {
                    "module_name": "Offer",
                    "c": 0,
                    "r": 1,
                    "u": 1,
                    "d": 1
                }
            ]
          }
        ).then((response) => console.log(response.data)).catch((err) => console.log(err));
    }

    return { registerUser }
}

export default useRegisterUser;