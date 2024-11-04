import express from 'express';
import checkPermission from '../middleware/permissionMiddleware.mjs';
import { createModule, getModules, updateModule, deleteModule, getModuleById } from '../controllers/modulesController.mjs';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Modules
 *   description: Operations related to modules.
 */

/**
 * @swagger
 * /modules:
 *   post:
 *     summary: Create a new module
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Module details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Introduction to Programming"
 *               content:
 *                 type: string
 *                 example: "This module covers the basics of programming."
 *               course:
 *                 type: string
 *                 example: "605c6b8e8f8b3a0015b5c84c" # ObjectId of the course
 *             required:
 *               - title
 *               - content
 *               - course
 *     responses:
 *       '200':
 *         description: Module created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Module created successfully"
 *                 module:
 *                   type: object
 *                   $ref: '#/components/schemas/Module'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/', checkPermission('create_module'), createModule);

/**
 * @swagger
 * /modules:
 *   get:
 *     summary: Get all modules
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of all modules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Module'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/', getModules);


router.get('/:moduleId', getModuleById);

/**
 * @swagger
 * /modules/{moduleId}:
 *   put:
 *     summary: Update a module
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: moduleId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "605c6b8e8f8b3a0015b5c84c" # ObjectId of the module
 *     requestBody:
 *       description: Module details to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Advanced Programming"
 *               content:
 *                 type: string
 *                 example: "This module covers advanced programming concepts."
 *               course:
 *                 type: string
 *                 example: "605c6b8e8f8b3a0015b5c84c" # ObjectId of the course
 *             required:
 *               - title
 *               - content
 *               - course
 *     responses:
 *       '200':
 *         description: Module updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Module updated successfully"
 *                 module:
 *                   type: object
 *                   $ref: '#/components/schemas/Module'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put('/:moduleId', checkPermission('create_module'), updateModule);

/**
 * @swagger
 * /modules/{moduleId}:
 *   delete:
 *     summary: Delete a module
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: moduleId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "605c6b8e8f8b3a0015b5c84c" # ObjectId of the module
 *     responses:
 *       '200':
 *         description: Module deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Module deleted successfully"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete('/:moduleId', checkPermission('create_module'), deleteModule);

export default router;
