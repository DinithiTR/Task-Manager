import Task from "../models/Task.js";

// Create a new task
export const createTask = async (req, res) => {
    try {
        const { title, description, user_id, status } = req.body;

        // Check if required fields are provided
        if (!title || !description || !user_id) {
            return res.status(400).json({ message: "No title or description given" });
        }

        const newTask = new Task({
            title,
            description,
            user_id,
            status: status || "Pending",
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get a single task by ID
export const getTaskById = async (req, res) => {
    try {
        console.log("Requested task id: ", req.params.id)
        const task = await Task.findById(req.params.id);
        if (!task) {
            console.log("❌ Task not found in the database");
            return res.status(404).json({ message: "Task not found" });
        }
        console.log("✅ Task found:", task);
        res.json(task);
    } catch (error) {
        console.log("❌ Error retrieving task:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update a task
export const updateTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        if (!title && !description && !status) {
            return res.status(400).json({ message: "At least one field is required" });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a task by ID
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
