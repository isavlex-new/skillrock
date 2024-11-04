import User from '../models/user.mjs';
import Permission from '../models/permission.mjs';

const checkPermission = (requiredPermission) => {
    return async (req, res, next) => {
        try {
            // Retrieve user role from the session or token (assuming it's stored in req.user)
        /*    const { userId } = req.session; // or req.user if using token-based auth */
            const { userId } = req.user; 
           
            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            // Fetch the user and their roles
            const user = await User.findById(userId).populate('role');
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Fetch role and permissions
            const role = user.role;
            if (role.name !== 'admin') {
                const permissions = await Permission.find({ _id: { $in: role.permissions } });

                // Check if the required permission is present
                const hasPermission = permissions.some(p => p.name === requiredPermission);

                if (!hasPermission) {
                    return res.status(403).json({ error: 'Forbidden' });
                }
            }

            // Permission granted
            next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
};

export default checkPermission;
