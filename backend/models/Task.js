import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
})

export default mongoose.model("Task", TaskSchema);