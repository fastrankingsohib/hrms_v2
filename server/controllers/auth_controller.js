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
            title: title,
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
            gender: gender,
            dob: dob,
            email: email,
            mobile: mobile,
            username: username,
            password: hashedPassword,
            date_of_joining: date_of_joining,
            employee_id: employee_id,
            designation: designation,

            status: status,
            department: department,
            user_type: user_type,
            role: role,
            reporting_to: reporting_to,
            created_by: created_by
        }
    });

    return user.id;
};

// Helper function to get the module IDs from an array of module names
const get_module_ids = async (module_names) => {
    const modules = await prisma.modules.findMany({
        where: {
            module_name: {
                in: module_names
            }
        },
        select: {
            id: true
        }
    });

    if (!modules.length) {
        throw new Error("Modules not found.");
    }

    return modules.map(module => module.id);
};

// Register function
const register = async (req, res) => {
    try {
        const { email, mobile, username, modules } = req.body;

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

        // Get the module IDs from the array of modules
        const module_names = modules.map(mod => mod.module_name);  // Assuming the form sends an array of module names
        const module_ids = await get_module_ids(module_names);

        // Assign multiple modules to the user
        for (let i = 0; i < module_ids.length; i++) {
            const module = modules[i];
            await prisma.modulesTouser.create({
                data: {
                    user: { connect: { id: user_id } },
                    modules: { connect: { id: module_ids[i] } },
                    c: module.c,
                    r: module.r,
                    u: module.u,
                    d: module.d
                }
            });
        }

        // Send success response
        return res.status(200).json({
            message: 'User registered and modules assigned successfully.'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};


// Login function
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { username: username }
        });

        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Invalid username or password."
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid username or password."
            });
        }

        // Generate JWT token
        const token = jwt.sign({ username }, JWT_SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });

        res.status(200).send({
            success: true,
            user: user,
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
                id: true,
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

const id_based_data = async (req, res) => {
    try {
        const user_id = req.params.id;
        const user = await prisma.user.findUnique({
            where: {
                id: Number(user_id), // Use the specific user ID here
            },
            select: {
                id: true, // Include the user ID
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

                status: true,
                department: true,
                user_type: true,
                role: true,
                reporting_to: true,
                created_by: true

            }
        });


        const modules_data = await prisma.modulesTouser.findMany({
            where: {
                user_id: Number(user_id), // Assuming user_id is the variable containing the user's ID
            },
            select: {
                module_id: true,
                user_id: true,
                c: true,
                d: true,
                r: true,
                u: true,
                modules: { // Selecting the related 'modules' data
                    select: {
                        module_name: true, // Selecting 'module_name' from the 'modules' table
                    }
                }
            }
        });
        res.status(200).send({
            success: true,
            message: "data fetched successfully",
            user_data: user,
            modules_data: modules_data
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error fetching user data",
        })

    }

}

const update_user = async (req) => {
    const user_id = parseInt(req.params.id); // Accessing user ID from URL parameters
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
        date_of_joining,
        employee_id,
        designation,

        status,
        department,
        user_type,
        role,
        reporting_to,
        created_by,
    } = req.body;

    // Validations
    if (!username || !email) {
        throw new Error("Username and email are required.");
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

    // Update user
    const user = await prisma.user.update({
        where: { id: user_id },
        data: {
            title,
            first_name,
            middle_name,
            last_name,
            gender,
            dob,
            email,
            mobile,
            username,
            date_of_joining,
            employee_id,
            designation,

            status,
            department,
            user_type,
            role,
            reporting_to,
            created_by
        },
    });

    return user.id;
};

// Update module assignment function
// Update module assignment function
const update_module_assignment = async (req) => {
    const userId = parseInt(req.params.id); // Accessing user ID from URL parameters
    const { module, c, r, u, d } = req.body;

    // Get the module ID
    const moduleId = await module_id(req);

    // Update the module assignment for the user
    await prisma.modulesTouser.update({
        where: {
            user_id_module_id: {
                user_id: userId,
                module_id: moduleId,
            },
        },
        data: {
            c: c,
            r: r,
            u: u,
            d: d,
        },
    });
};


// Update function
const update_user_data = async (req, res) => {
    try {
        // Update user details
        const user_id = await update_user(req);

        // Update module assignment
        await update_module_assignment(req);

        // Send success response
        return res.status(200).json({
            message: 'User updated and module assignment updated successfully.',
            user_id: user_id,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

const delete_user = async (req, res) => {
    try {
        const id = req.params.id
        await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(200).send({
            success: true,
            message: "User deleted successfully"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Some error occurred while deleting the User.",
        })
    }
}

export { register, login, authenticateToken, logout, send_all_user_data, id_based_data, update_user_data, delete_user };
