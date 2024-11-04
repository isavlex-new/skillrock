import fs from 'fs';
import path from 'path';
import mongooseToSwagger from 'mongoose-to-swagger';
import Course from '../models/course.mjs'; // Import your models
import User from '../models/user.mjs';
import Module from '../models/module.mjs';
import Question from '../models/question.mjs';
import Topic from '../models/topic.mjs';
import Role from '../models/role.mjs';
import Permission from '../models/permission.mjs';

// Directory to save generated Swagger schemas
const outputDir = path.resolve('./swagger/schemas');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// List your models here
const models = {
    Course,
    User,
    Module,
    Question,
    Topic,
    Role,
    Permission
};

// Generate and save Swagger schemas
Object.keys(models).forEach(modelName => {
    const swaggerSchema = mongooseToSwagger(models[modelName]);
    const schemaPath = path.resolve(outputDir, `${modelName}.json`);

    fs.writeFileSync(schemaPath, JSON.stringify(swaggerSchema, null, 2));
    console.log(`Generated Swagger schema for ${modelName} at ${schemaPath}`);
});
