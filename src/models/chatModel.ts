import mongoose from "mongoose";
import { chatModelType } from "../types/type";

const chatSchema = new mongoose.Schema({
    users: [String],
    chat_start_at: {
        type: Date
    },
    chat_end_at: {
        type: Date
    },
    socket_id: {
        type: String
    },
    chat_messages: [{
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        message: String,
        message_type: { type: Number, required: true },
        received: { type: Boolean, default: true },
        seen: { type: Boolean, default: false },
        status: { type: Number, default: 17 },
        created_at: Date,
        updated_at: Date,
        updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    }],
    created_at: { type: Date },
    updated_at: { type: Date },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

});

const chatModel = mongoose.model<chatModelType>("chat_model", chatSchema);
export default chatModel;