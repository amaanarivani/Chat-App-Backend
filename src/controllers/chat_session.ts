import chatModel from "../models/chatModel";
import userModel from "../models/user";

export const chatStart = async (req: any, res: any) => {
    let { initiate_user_id, client_user_id, message } = req.body;
    if (!initiate_user_id) {
        res.status(400).json({ message: "User doesn't exist" })
    }
    try {
        let exist = await chatModel.findOne({ users: { $all: [initiate_user_id, client_user_id] } })
        let result;
        if (message) {
            if (exist) {
                result = await chatModel.findByIdAndUpdate(
                    exist?._id, {
                    $push: {
                        chat_messages: {
                            user_id: initiate_user_id,
                            message,
                            message_type: 15,
                            seen: false,
                            status: 17,
                            created_at: Date.now(),
                            updated_at: Date.now()
                        }
                    }
                }
                )
            } else {
                result = await chatModel.create({
                    users: [initiate_user_id, client_user_id],
                    chat_start_at: Date.now(),
                    chat_end_at: '',
                    socket_id: '',
                    chat_messages: [{
                        user_id: initiate_user_id,
                        message,
                        message_type: 15,
                        seen: false,
                        status: 17,
                        created_at: Date.now(),
                        updated_at: Date.now()
                    }],
                    created_at: Date.now(),
                    updated_at: Date.now(),
                })
            }
        } else {
            return res.status(400).json({ message: "Please provide message" })
        }
        res.status(200).json({ message: "chat started", result })
    } catch (error: any) {
        return res.status(500).json({ message: "Something went wrong" + error.message })
    }
}


export const getAllChatSession = async (req: any, res: any) => {
    let { user_id } = req.body;
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user id" })
    }
    try {
        const result = await chatModel.find({ users: { $in: [user_id] } }).populate("users", "name email")
        res.status(200).json({ message: "Chats fetched", result })
    } catch (error: any) {
        return res.status(500).json({ message: "Something went wrong" + error.message })
    }
}

export const getAllChatMessages = async (req: any, res: any) => {
    let { user_id, client_user_id } = req.body;
    if (!user_id || !client_user_id) {
        return res.status(400).json({ message: "Invalid request" })
    }
    try {
        const result = await chatModel.findOne({ users: { $all: [user_id, client_user_id] } })
        if (!result) {
            return res.status(400).json({ message: "Chats doesn't exist" })
        }
        res.status(200).json({ message: "chats fetched", result })
    } catch (error: any) {
        return res.status(500).json({ message: "Something went wrong" + error.message })
    }
}