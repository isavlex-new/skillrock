import Permission from '../models/permission.mjs';
import Role from '../models/role.mjs';
import mongoose from "mongoose";

export const createPermission = async (req, res) => {
    try {
        const { name, description } = req.body;
        const permission = new Permission({ name, description });
        await permission.save();
        res.json({ message: 'Permission created successfully', permission });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPermissions = async (req, res) => {
    try {
        const permissions = await Permission.find();
        res.json(permissions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPermission = async (req, res) => {
    try {
        const { permissionId } = req.params;
        const permission = await Permission.findOne(new mongoose.Types.ObjectId(permissionId));
        res.json(permission);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updatePermission = async (req, res) => {
    try {
        const { permissionId } = req.params;
        const { name, description } = req.body;
        const permission = await Permission.findByIdAndUpdate(permissionId, { name, description }, { new: true });
        res.json({ message: 'Permission updated successfully', permission });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deletePermission = async (req, res) => {
    try {
        const { permissionId } = req.params;

        // Check if any role has this permission
        const rolesUsingPermission = await Role.find({ permissions: permissionId });

        if (rolesUsingPermission.length > 0) {
            return res.status(400).json({ error: 'Cannot delete permission as it is still in use by roles' });
        }

        // Proceed with deletion
        await Permission.findByIdAndDelete(permissionId);
        res.json({ message: 'Permission deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
