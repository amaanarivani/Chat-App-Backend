import mongoose, { Document } from "mongoose";
interface DocumentResult<T> {
    _doc: T;
}

export interface UserType extends DocumentResult<UserType>, Document {
    name: string,
    email: string,
    password: string,
    avatar: string,
    gender: string,
    code: string,
    token: string,
    isLoggedIn: boolean,
    emailVerified: boolean,
    created_at: Date
    updated_at: Date
}

export interface chatModelType extends DocumentResult<chatModelType>, Document {
    users: []
    chat_start_at: string
    chat_end_at: string
    socket_id: string
    chat_messages: []
    created_at: Date
    updated_at: Date
    updated_by: mongoose.Schema.Types.ObjectId
}
export interface notificationModelType extends DocumentResult<notificationModelType>, Document {
    user_id: mongoose.Schema.Types.ObjectId
    pushNotificationToken: string
    notifications: []
    created_at: Date
}