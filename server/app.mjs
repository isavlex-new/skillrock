// Import required modules and files
import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session'
const app = express();
import connectDB from "./config/database.mjs";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';


// Import routes
import authRoutes from './routes/auth.mjs';
import userRoutes from './routes/users.mjs';
import roleRoutes from './routes/roles.mjs';
import permissionRoutes from './routes/permissions.mjs';
import courseRoutes from './routes/courses.mjs';
import moduleRoutes from './routes/modules.mjs';
import topicRoutes from './routes/topics.mjs';
import questionRoutes from './routes/questions.mjs';

// Load environment variables
import dotenv from 'dotenv';
import cors from 'cors';
import authenticateToken from "./middleware/authMiddleware.mjs";
import { swaggerOptions } from './config/swaggerOptions.mjs'
import { createDefaultPermissions } from "./seeds/seedPermissions.mjs";
import { createDefaultAdminRoles } from "./seeds/seedRoles.mjs";
import { createDefaultAdmins } from "./seeds/seedUsers.mjs";
import { createTopics } from './seeds/seedTopic.mjs';
import { seedQuestions } from './seeds/seedQuestions.mjs';
import cookieParser from 'cookie-parser';



dotenv.config({ path: `.env.${process.env.NODE_ENV}`});

const corsOptions = {
    origin: process.env.ADMIN_URI, // Allow only this origin
    methods: 'GET,POST,PUT,DELETE', // Allow these methods
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
};

// Connect to MongoDB
connectDB().then(async () => {
    await createDefaultPermissions()
    await createDefaultAdminRoles()
    await createDefaultAdmins()
    await createTopics()
    await seedQuestions()
});


const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors(corsOptions));
// Configure middleware
app.use(bodyParser.json());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

app.use(cookieParser());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/roles', authenticateToken, roleRoutes);
app.use('/api/permissions', authenticateToken, permissionRoutes);
app.use('/api/courses', authenticateToken, courseRoutes);
app.use('/api/modules', authenticateToken, moduleRoutes);
app.use('/api/topics', authenticateToken, topicRoutes);
app.use('/api/questions', authenticateToken, questionRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
