import mongoose from "mongoose";
import { UserType } from "../types/type";

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    friends: [String],
    avatar: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    code: {
        type: String
    },
    token: {
        type: String,
        default: ""
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
})

const userModel = mongoose.model<UserType>("user", userSchema);
export default userModel;