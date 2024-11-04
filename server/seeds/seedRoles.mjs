import Role from '../models/role.mjs'; // Import the Role model
import Permission from '../models/permission.mjs'; // Import the Permission model

const defaultAdminRoles = [
    {
        name: 'admin',
    }
]

// Function to create default roles
export async function createDefaultAdminRoles() {
    try {
        // Check if any roles exist
        const rolesCount = await Role.countDocuments();

        if (!rolesCount) {
            const permission = await Permission.findOne({name: 'ALL'})

            for (const role of defaultAdminRoles) {
                role.permissions = [permission]
            }

            // Insert default users into the database
            await Role.insertMany(defaultAdminRoles);
            console.log('Default roles created successfully.');
        } else {
            console.log('Roles already exist, no default roles were created.');
        }
    } catch (error) {
        console.error('Error creating default permissions:', error);
    }
}

