import Role from '../models/role.mjs';
import Permission from '../models/permission.mjs';

export const createRole = async (req, res) => {
    try {
        const { name, permissions } = req.body;
        // Validate permissions
        const validPermissions = await Permission.find({ _id: { $in: permissions } });
        if (validPermissions.length !== permissions.length) {
            return res.status(400).json({ error: 'Invalid permissions' });
        }
        const role = new Role({ name, permissions });
        await role.save();
        res.json({ message: 'Role created successfully', role });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getRoles = async (req, res) => {
    try {
        const roles = await Role.find().populate('permissions');
        res.json(roles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateRole = async (req, res) => {
    try {
        const { roleId } = req.params;
        const { name, permissions } = req.body;
        // Validate permissions
        const validPermissions = await Permission.find({ _id: { $in: permissions } });
        if (validPermissions.length !== permissions.length) {
            return res.status(400).json({ error: 'Invalid permissions' });
        }
        const role = await Role.findByIdAndUpdate(roleId, { name, permissions }, { new: true });
        res.json({ message: 'Role updated successfully', role });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteRole = async (req, res) => {
    try {
        const { roleId } = req.params;
        await Role.findByIdAndDelete(roleId);
        res.json({ message: 'Role deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
