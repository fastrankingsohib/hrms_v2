import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET_KEY = 'your-secret-key-here'; // Hardcoded JWT secret

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access, please login."
        });
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: "Invalid or expired token."
            });
        }
        req.user = user; // Storing user info in the request for further use
        next();
    });
};

// Helper function to add a user to the database
const add_to_user = async (req) => {
    const {
        title,
        first_name,
        middle_name,
        last_name,
        gender,
        dob,
        email,
        mobile,
        username,
        password,
        date_of_joining,
        employee_id,
        designation,
        teams,
        status,
        department,
        user_type,
        role,
        reporting_to,
        created_by
    } = req.body;

    // Validations
    if (!username || !password || !email) {
        throw new Error("Username, password, and email are required.");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Invalid email format.");
    }

    if (!validator.isMobilePhone(mobile, 'any', { strictMode: false })) {
        throw new Error("Invalid mobile number.");
    }

    if (!validator.isLength(username, { min: 3, max: 100 })) {
        throw new Error("Username must be between 3 and 100 characters long.");
    }

    if (!validator.isLength(password, { min: 6 })) {
        throw new Error("Password must be at least 6 characters long.");
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create user
    const user = await prisma.user.create({
        data: {
            title:title,
            first_name:first_name,
            middle_name:middle_name,
            last_name:last_name,
            gender:gender,
            dob:dob,
            email:email,
            mobile:mobile,
            username:username,
            password: hashedPassword,
            date_of_joining:date_of_joining,
            employee_id:employee_id,
            designation:designation,
            teams:teams,
            status:status,
            department:department,
            user_type:user_type,
            role:role,
            reporting_to:reporting_to,
            created_by:created_by
        }
    });

    return user.id;
};

// Helper function to get the module ID
const module_id = async (req) => {
    const  module = req.body.module;
    
    const module_data = await prisma.modules.findMany({
        where: {
            module_name: module
        }
    });

    if (!module_data) {
        throw new Error("Module not found.");
    }

    return module_data[0].id;
};

// Register function
const register = async (req, res) => {
    try {
        const { email, mobile, username } = req.body;

        // Check if a user with the given email exists
        const user_data = await prisma.user.findUnique({
            where: { email: email }
        });
        if (user_data) {
            return res.status(500).send({
                message: "User with this email already exists",
            });
        }

        // Check if a user with the given mobile number exists
        const user_data2 = await prisma.user.findUnique({
            where: { mobile: mobile }
        });
        if (user_data2) {
            return res.status(500).send({
                message: "User with this number already exists",
            });
        }

        // Check if a user with the given username exists
        const user_data3 = await prisma.user.findUnique({
            where: { username: username }
        });
        if (user_data3) {
            return res.status(500).send({
                message: "User with this username already exists",
            });
        }

        // Add the user and get the user ID
        const user_id = await add_to_user(req);

        // Get the module ID
        const module = await module_id(req);
        const{c,r,u,d}=req.body

        // Assign the module to the user
        await prisma.modulesTouser.create({
            data: {
                user: { connect: { id: user_id } },
                modules: { connect: { id: module } },
                c:c,
                r:r,
                u:u,
                d:d

            }
        });

        // Send success response
        return res.status(200).json({ 
            message: 'User registered and module assigned successfully.' 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

// Login function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Generate JWT token
        const token = jwt.sign({ email }, JWT_SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });

        res.status(200).send({
            success: true,
            user:user,
            message: "User logged in successfully."
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error logging in."
        });
    }
};

// Logout function
const logout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).send({
        success: true,
        message: "User logged out successfully. Redirect to login page."
    });
};

const send_all_user_data = async (req, res) => {
    try {
      const usersWithModules = await prisma.user.findMany({
        select: {
          title: true,
          first_name: true,
          middle_name: true,
          last_name: true,
          gender: true,
          dob: true,
          email: true,
          mobile: true,
          username: true,
          date_of_joining: true,
          employee_id: true,
          designation: true,
          teams: true,
          status: true,
          department: true,
          user_type: true,
          role: true,
          reporting_to: true,
          modulesTouser: {
            select: {
              modules: {
                select: {
                  module_name: true, // Selecting the 'module_name' from the module table
                }
              }
            }
          }
        },
      });
  
      // Send response with user data and module names
      res.status(200).send({
        success: true,
        message: "All user data retrieved.",
        data: usersWithModules,
      });
    } catch (error) {
      console.error("Error fetching user data:", error); // Log the error for debugging
      res.status(500).send({
        success: false,
        message: "Error fetching user data",
      });
    }
  };
  
export { register, login, authenticateToken, logout,send_all_user_data };
