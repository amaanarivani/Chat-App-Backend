import { DateTime } from "luxon";
import mongoose from "mongoose";


let date = DateTime.now().toUTC().toISO();


const chatSessionStatusSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    socket_id: { type: String },
    joined_rooms: [String],
    status: { type: Number, default: 8 },
    updated_at: { type: String, default: date },
    created_at: { type: String, default: DateTime.now().toUTC().toISO() },
})

const chatStatusModel = mongoose.model('user_chat_status', chatSessionStatusSchema);
export default chatStatusModel;
