import mongoose from "mongoose";
import { notificationModelType } from "../types/type";

const notificationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    pushNotificationToken: {
        type: String
    },
    notifications: [{
        title: String,
        body: String,
        destination: String,
        createdAt: Date
    }],
    createdAt: {
        type: Date
    }
});

const notificationModel = mongoose.model<notificationModelType>("notification", notificationSchema);
export default notificationModel;