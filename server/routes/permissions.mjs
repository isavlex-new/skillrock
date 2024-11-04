import express from 'express';
import {
    createPermission,
    deletePermission, getPermission,
    getPermissions,
    updatePermission
} from "../controllers/permissionsController.mjs";
const router = express.Router();


/**
 * @swagger
 * /permissions:
 *   post:
 *     summary: Create a new permission
 *     tags: [Permissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the permission
 *                 example: "create-user"
 *               description:
 *                 type: string
 *                 description: Description of the permission
 *                 example: "Allows creating new users"
 *     responses:
 *       201:
 *         description: Permission created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Permission ID
 *                   example: "64abc1234def"
 *                 name:
 *                   type: string
 *                   example: "create-user"
 *                 description:
 *                   type: string
 *                   example: "Allows creating new users"
 *       500:
 *         description: Server error
 */
router.post('/', createPermission);

/**
 * @swagger
 * /permissions:
 *   get:
 *     summary: Get all permissions
 *     tags: [Permissions]
 *     responses:
 *       200:
 *         description: List of permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "64abc1234def"
 *                   name:
 *                     type: string
 *                     example: "create-user"
 *                   description:
 *                     type: string
 *                     example: "Allows creating new users"
 *       500:
 *         description: Server error
 */
router.get('/', getPermissions);

/**
 * @swagger
 * /permissions/{permissionId}:
 *   get:
 *     summary: Get a specific permission
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the permission
 *         example: "64abc1234def"
 *     responses:
 *       200:
 *         description: Permission retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64abc1234def"
 *                 name:
 *                   type: string
 *                   example: "create-user"
 *                 description:
 *                   type: string
 *                   example: "Allows creating new users"
 *       404:
 *         description: Permission not found
 *       500:
 *         description: Server error
 */
router.get('/:permissionId', getPermission);

/**
 * @swagger
 * /permissions/{permissionId}:
 *   put:
 *     summary: Update a specific permission
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the permission
 *         example: "64abc1234def"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the permission
 *                 example: "update-user"
 *               description:
 *                 type: string
 *                 description: Description of the permission
 *                 example: "Allows updating user information"
 *     responses:
 *       200:
 *         description: Permission updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "64abc1234def"
 *                 name:
 *                   type: string
 *                   example: "update-user"
 *                 description:
 *                   type: string
 *                   example: "Allows updating user information"
 *       404:
 *         description: Permission not found
 *       500:
 *         description: Server error
 */
router.put('/:permissionId', updatePermission);

/**
 * @swagger
 * /permissions/{permissionId}:
 *   delete:
 *     summary: Delete a specific permission
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the permission
 *         example: "64abc1234def"
 *     responses:
 *       200:
 *         description: Permission deleted successfully
 *       404:
 *         description: Permission not found
 *       500:
 *         description: Server error
 */
router.delete('/:permissionId', deletePermission);

export default router;
