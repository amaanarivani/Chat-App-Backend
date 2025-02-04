import chatModel from "../models/chatModel";
import userModel from "../models/user";

export const sendMessages = async (req: any, res: any) => {
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
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({ message: "Invalid user id" });
    }

    try {
        // Fetch all chat sessions where the user is a participant
        const chats = await chatModel.find({ users: { $in: [user_id] } });

        // Process each chat session to include receiver data and last message
        const result = await Promise.all(chats.map(async (chat) => {
            // Find the other participant (receiver)
            const receiver_id = chat.users.find((userId: any) => userId.toString() !== user_id) || null;
            let receiver_data = null;

            if (receiver_id) {
                receiver_data = await userModel.findById(receiver_id).select("_id name email profilePicture");
            }

            // Extract the last message from the chat_messages array
            const lastMessage: any = chat.chat_messages.length > 0
                ? chat.chat_messages[chat.chat_messages.length - 1] // Get the last message
                : null;

            return {
                ...chat.toObject(),
                receiver: receiver_data,
                lastMessage: lastMessage ? {
                    _id: lastMessage._id,
                    sender_id: lastMessage.user_id,
                    message: lastMessage.message,
                    message_type: lastMessage.message_type,
                    received: lastMessage.received,
                    seen: lastMessage.seen,
                    status: lastMessage.status,
                    createdAt: lastMessage.created_at
                } : null, // If no messages exist, return null
            };
        }));

        console.log(result, "------chat_doc to send--------");

        res.status(200).json({ message: "Chats fetched", result });
    } catch (error: any) {
        return res.status(500).json({ message: "Something went wrong: " + error.message });
    }
};




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