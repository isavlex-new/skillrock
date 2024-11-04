import Permission from '../models/permission.mjs';

const defaultPermissions = [
    {
        name: 'ALL'
    },
    {
        name: 'CREATE_COURSE'
    },
    {
        name: 'UPDATE_COURSE'
    },
    {
        name: 'DELETE_COURSE'
    },
    {
        name: 'READ_COURSE'
    },
    {
        name: 'CREATE_MODULE'
    },
    {
        name: 'UPDATE_MODULE'
    },
    {
        name: 'DELETE_MODULE'
    },
    {
        name: 'READ_MODULE'
    },
    {
        name: 'CREATE_USER'
    },
    {
        name: 'UPDATE_USER'
    },
    {
        name: 'DELETE_USER'
    },
    {
        name: 'READ_USER'
    },
    {
        name: 'CREATE_PERMISSION'
    },
    {
        name: 'UPDATE_PERMISSION'
    },
    {
        name: 'DELETE_PERMISSION'
    },
    {
        name: 'READ_PERMISSION'
    },
    {
        name: 'CREATE_ROLE'
    },
    {
        name: 'UPDATE_ROLE'
    },
    {
        name: 'DELETE_ROLE'
    },
    {
        name: 'READ_ROLE'
    },
]

// Function to create default permissions
export async function createDefaultPermissions() {
    try {
        // Check if any roles exist
        const permissionsCount = await Permission.countDocuments();

        if (!permissionsCount) {
            // Insert default users into the database
            await Permission.insertMany(defaultPermissions);
            console.log('Default permissions created successfully.');
        } else {
            console.log('Permissions already exist, no default permissions were created.');
        }
    } catch (error) {
        console.error('Error creating default permissions:', error);
    }
}

