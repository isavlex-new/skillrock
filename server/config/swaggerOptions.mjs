import fs from 'fs';
import path from 'path';

const getDirname = (importMetaUrl) => {
  const url = new URL(importMetaUrl);
  return path.dirname(url.pathname);
};

// Get the current directory
const __dirname = getDirname(import.meta.url);

const courseSchema = JSON.parse(fs.readFileSync('./swagger/schemas/Course.json'));
const userSchema = JSON.parse(fs.readFileSync('./swagger/schemas/User.json'));
const moduleSchema = JSON.parse(fs.readFileSync('./swagger/schemas/Module.json'));
const questionSchema = JSON.parse(fs.readFileSync('./swagger/schemas/Question.json'));
const topicSchema = JSON.parse(fs.readFileSync('./swagger/schemas/Topic.json'));
const roleSchema = JSON.parse(fs.readFileSync('./swagger/schemas/Role.json'));
const permissionSchema = JSON.parse(fs.readFileSync('./swagger/schemas/Permission.json'));

export  const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "SkillsRock API with Swagger",
      version: "0.1.0",
      description:
      "This is a simple CRUD API application for SkillsRock Academy",
    },
    components: {
      schemas: {
        Course: courseSchema,
        User: userSchema,
        Module: moduleSchema,
        Topic: topicSchema,
        Question: questionSchema,
        Role: roleSchema,
        Permission: permissionSchema,
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api`,
      },
    ],
  },
  apis: ["./routes/*.mjs"],
}
