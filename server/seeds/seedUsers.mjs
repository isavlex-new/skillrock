import bcrypt from 'bcrypt';
import User from '../models/user.mjs'; // Import the User model
import Role from '../models/role.mjs'; // Import the Role model

const saltRounds = 10; // Salt rounds for bcrypt hashing

// Default users to insert
const defaultUsers = [
    {
        first_name: 'Admin',
        last_name: 'Admin',
        username: 'admin@example.com',
        password: 'admin',
    },
];

// Function to create default users
export async function createDefaultAdmins() {
    try {
        const role = await Role.findOne({name: 'admin'})
        // Check if any users exist
        const userCount = await User.countDocuments({role: role});

        if (!userCount) {

            // Hash passwords for each default user
            for (const user of defaultUsers) {
                user.password = await bcrypt.hash(user.password, saltRounds);
                user.role = role
            }

            // Insert default users into the database
            await User.insertMany(defaultUsers);
            console.log('Default users created successfully.');
        } else {
            console.log('Users already exist, no default users were created.');
        }
    } catch (error) {
        console.error('Error creating default users:', error);
    }
}
