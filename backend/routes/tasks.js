import express from "express";
import {
    createTask,
    getTaskById,
    updateTask,
    deleteTask
} from "../controllers/taskController.js";

const router = express.Router();

// Create a new task
router.post("/", createTask);

// Get a single task by ID
router.get("/:id", getTaskById);

// Update a task
router.put("/:id", updateTask);

// Delete a task
router.delete("/:id", deleteTask);

export default router;
