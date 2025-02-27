import userModel from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMailToUser } from "../../utils/sendMail";
import chatModel from "../models/chatModel";
import { DateTime } from "luxon";
import notificationModel from "../models/notificationModel";
import { sendNotifications } from "../../utils/sendNotification";
import { EmailTemplate } from "../view/email_template";
import { EmailTemplateResetPassword } from "../view/email_template_resetPass";
// import sendMailToUser from "../utils/sendMail";
// const sendMailToUser = require("../utils/sendMail");

export const Signup = async (req: any, res: any) => {
    let { name, email, password, created_at = DateTime.now().toUTC().toISO() } = req.body;
    // console.log(req.body, "--> email");

    const isExist = await userModel.findOne({ email })
    if (isExist) {
        res.status(400).json({ message: "User already exist with this email" })
        return;
    }
    let codee
    codee = Math.abs(Math.random() * 100000)
    //    let code = String(Math.trunc(codee))
    let code = codee.toFixed(0)

    if (code.length < 5) {
        let i = 2
        while (code.length < 5) {
            code = code + "" + i
            i++
        }
    }
    await sendMailToUser(email, "Signup succesfull", "Welcome", EmailTemplate(code, name))
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        // console.log(hashedPassword, "hashed password");

        await userModel.create({
            name,
            email,
            password: hashedPassword,
            code,
            created_at
        })
        res.status(200).json({ message: "Signup Successfull" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const Signin = async (req: any, res: any) => {
    let { email, password } = req.body;
    console.log(req.body, "--> signin data");

    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: "User doesn't exist" });

    }
    const isPasswordCorrect = await bcrypt.compare(password, user?.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Password is not correct" })
    }
    if (user.emailVerified != true) {
        return res.status(400).json({ message: "Email not verified" })
    }
    try {
        const secret = process.env.DB_AUTH_SECRET;
        // console.log(secret, "db secret");
        let token;
        if (secret) {
            token = jwt.sign({ email, user_id: user?._id }, secret);
            req.session.token = token;
        }
        const result = await userModel.findByIdAndUpdate(
            user?._id, {
            token,
            isLoggedIn: true
        }, { new: true }
        )
        // req.session.userData = result;
        res.status(200).json({ message: "Login Successfull", result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkAuth = async (req: any, res: any) => {
    try {
        res.status(200).json({ message: "Welcome you're loggedin" })
    } catch (error) {
        res.status(500).json({ message: "Unauthorized access login to continue" });
    }
}

export const signout = async (req: any, res: any) => {
    // const secret = "amaan@trainifai#1234&";
    const secret: any = process.env.DB_AUTH_SECRET
    console.log(req.session, "--> session before destroying");
    try {
        if (!req.session?.token) {
            return res.status(400).json({ message: "Already signout" })
        }
        let tokenData: any = jwt.verify(req.session.token, secret)
        let { email, user_id } = tokenData
        console.log(email, user_id);
        let loggedinstatus = await userModel.findOneAndUpdate(
            { email },
            {
                isLoggedIn: false
            }, { new: true }
        )
        let user = await userModel.findOne({ email })

        if (loggedinstatus) {

            req.session.destroy(() => { })
            res.status(200).json({ message: "SignOut Successfully ", userData: user })
        } else {
            res.status(400).json({ message: "Something went wrong !!" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getSingleUser = async (req: any, res: any) => {
    // let { id } = req.body
    console.log(req?.user?.user_id);
    try {
        let result: any = await userModel.findById(req?.user?.user_id)
        if (!result) {
            return res.status(400).json({ message: "User not found" })
        }
        res.status(200).json({ message: "single user fetch successfully", result })
    } catch (error: any) {
        return res.status(500).json({ message: "Something went wrong" + error.message })
    }
}

export const verifyEmail = async (req: any, res: any) => {
    let { email, code } = req.body;
    try {
        const result = await userModel.findOne({ email })
        if (!result) {
            return res.status(400).json({ message: "user does not exist" })
        }
        if (result.code == code) {
            await userModel.findOneAndUpdate(
                { email }, {
                emailVerified: true
            }, { new: true }
            )
            res.status(200).json({ message: "Email verified" })
        } else {
            res.status(400).json({ message: "Invalid otp" })
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" + error })
    }
};

export const verifyEmailLogin = async (req: any, res: any) => {
    let { email } = req.body;
    let result: any = await userModel.findOne({ email });
    let codee
    codee = Math.abs(Math.random() * 100000)
    //    let code = String(Math.trunc(codee))
    let code = codee.toFixed(0)

    if (code.length < 5) {
        let i = 2
        while (code.length < 5) {
            code = code + "" + i
            i++
        }
    }
    await sendMailToUser(email, "Verify your email", "Welcome", EmailTemplate(code, result?.name))
    try {
        await userModel.findOneAndUpdate(
            { email },
            {
                code
            })
        res.status(200).json({ message: "Otp sent" })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" + error })
    }

}

export const forgetPassword = async (req: any, res: any) => {
    let { email, password } = req.body;
    const result = await userModel.findOne({ email })
    if (!result) {
        return res.status(400).json({ message: "User does not exist" })
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        await userModel.findOneAndUpdate(
            { email }, {
            password: hashedPassword
        })
        res.status(200).json({ message: "Password changed" })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" + error })
    }
}

export const forgetPasswordOtp = async (req: any, res: any) => {
    let { email } = req.body;
    const result = await userModel.findOne({ email })
    if (!result) {
        return res.status(400).json({ message: "User does not exist" })
    }
    let codee
    codee = Math.abs(Math.random() * 100000)
    //    let code = String(Math.trunc(codee))
    let code = codee.toFixed(0)

    if (code.length < 5) {
        let i = 2
        while (code.length < 5) {
            code = code + "" + i
            i++
        }
    }
    await sendMailToUser(email, "Reset your password", "Welcome", EmailTemplateResetPassword(code, result?.name))
    try {
        await userModel.findOneAndUpdate(
            { email }, {
            code: code
        })
        res.status(200).json({ message: "Otp sent", code })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" + error })
    }
}

export const getAllUsers = async (req: any, res: any) => {
    try {
        const result = await userModel.find({}).select({ password: 0, code: 0, token: 0 })
        const resultCount = await userModel.find({}).countDocuments()
        res.status(200).json({ message: "User fetched", result, count: resultCount })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" + error })
    }
}

export const getAllSuggestedUsers = async (req: any, res: any) => {
    let { user_id } = req.body;

    try {
        if (!user_id) {
            return res.status(400).json({ message: "Invalid user id" });
        }

        // Fetch the user document
        const userDoc: any = await userModel.findById(user_id);
        if (!userDoc) {
            return res.status(404).json({ message: "User not found" });
        }

        // Get user's friends list and include the user itself to exclude
        let userFriends = userDoc.friends || [];
        userFriends.push(user_id);

        console.log(userFriends, "user friends ids");

        // Find suggested users excluding the user itself and their friends
        const result = await userModel.find({ _id: { $nin: userFriends } }).select({ password: 0, code: 0, token: 0 })

        res.status(200).json({ message: "Suggested users fetched", result });

    } catch (error: any) {
        console.error("Error fetching suggested users:", error);
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};



export const changePassword = async (req: any, res: any) => {
    let { oldPassword, newPassword, user_id } = req.body;
    try {
        const userDoc = await userModel.findById(user_id);
        if (!userDoc) {
            return res.status(400).json({ message: "User doesn't exist" })
        }
        const checkPassword = await bcrypt.compare(oldPassword, userDoc?.password);
        if (!checkPassword) {
            return res.status(400).json({ message: "Old password is incorrect" })
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);
        const result = await userModel.findByIdAndUpdate(
            user_id, {
            password: hashedNewPassword
        }, { new: true }
        )
        res.status(200).json({ message: "Password changed", result })
    } catch (error: any) {
        return res.status(500).json({ message: "Something went wrong" + error.message })
    }
}

export const updateUser = async (req: any, res: any) => {
    let { user_id, name, gender, avatar } = req.body;
    try {
        const userDoc = await userModel.findById(user_id);
        if (!userDoc) {
            return res.status(400).json({ message: "User doesn't exist" })
        }
        const result = await userModel.findByIdAndUpdate(
            user_id, {
            name,
            gender,
            avatar,
            updated_at: DateTime.now().toUTC().toISO()
        }, { new: true })
        res.status(200).json({ message: "User details updated", result })
    } catch (error: any) {
        return res.status(500).json({ message: "Something went wrong" + error.message })
    }
}


export const getCustomSingleUser = async (req: any, res: any) => {
    let { user_id } = req.body;
    if (!user_id) {
        return res.status(400).json({ message: "Invalid user id" })
    }
    try {
        const result = await userModel.findById(user_id)
        if (!result) {
            return res.status(400).json({ message: "User not found" })
        }
        res.status(200).json({ message: "Single user fetched", result })
    } catch (error: any) {
        return res.status(500).json({ message: "Something went wrong" + error.message })
    }
}


export const addFriends = async (req: any, res: any) => {
    let { user_id, friend_id } = req.body;
    if (!user_id || !friend_id) {
        return res.status(400).json({ message: "Invalid user id" })
    }
    try {
        const userDoc: any = await userModel.findById(user_id);
        const friendDoc = await userModel.findById(friend_id);
        if (!userDoc || !friendDoc) {
            return res.status(400).json({ message: "User or friend doesn't exist" })
        }
        for (let i = 0; i < userDoc.friends.length; i++) {
            if (userDoc?.friends[i] == friend_id) {
                return res.status(400).json({ message: "Already friends" })
            }
        }
        await userModel.findByIdAndUpdate(
            friend_id, {
            $push: { friends: user_id }
        }, { new: true }
        )
        const result = await userModel.findByIdAndUpdate(
            user_id, {
            $push: { friends: friend_id }
        }, { new: true }
        )
        let messageDoc = {
            user_id: user_id,
            message: `You are now friends`,
            message_type: 16,
            seen: false,
            status: 17,
            created_at: DateTime.now().toUTC().toISO(),
            updated_at: DateTime.now().toUTC().toISO(),
        }
        let chatSessionExist = await chatModel.findOne({ users: { $all: [user_id, friend_id] } })
        if (chatSessionExist) {
            await chatModel.findOneAndUpdate(
                { users: { $all: [user_id, friend_id] } },
                {
                    has_friends: true,
                    $push: {
                        chat_messages: messageDoc
                    }
                }
            )
        } else {
            await chatModel.create({
                users: [user_id, friend_id],
                chat_start_at: DateTime.now().toUTC().toISO(),
                chat_end_at: '',
                has_friends: true,
                socket_id: '',
                chat_messages: [
                    messageDoc
                ],
                created_at: DateTime.now().toUTC().toISO(),
                updated_at: DateTime.now().toUTC().toISO(),
            })
        }
        let token: any = await notificationModel.findOne({ user_id: friend_id }).populate(["user_id"]);
        let title = `Hey, ${friendDoc?.name}`;
        let body = `${userDoc?.name} has added you as a friend`;
        await notificationModel.findOneAndUpdate(
            { user_id: friend_id }, {
            $push: {
                notifications: {
                    title,
                    body,
                    createdAt: DateTime.now().toUTC().toISO()
                }
            }
        }
        )
        await sendNotifications({ tokens: [token?.pushNotificationToken], title, body });
        res.status(200).json({ message: "Friend added", result })
    } catch (error: any) {
        return res.status(500).json({ message: "Something went wrong" + error.message })
    }
}

export const getAllMyFriends = async (req: any, res: any) => {
    let { user_id } = req.body;
    try {
        const userDoc: any = await userModel.findById(user_id)
        if (!userDoc) {
            return res.status(400).json({ message: "User doesn't exist" })
        }
        let friendsIds;
        let result = [];
        for (let i = 0; i < userDoc.friends.length; i++) {
            friendsIds = userDoc.friends[i];
            console.log(friendsIds, "friends ids");
            let friendDoc = await userModel.findOne({ _id: friendsIds }).select({ password: 0, code: 0, token: 0 })
            result.push(friendDoc)
        }
        res.status(200).json({ message: "Friends fetched", result })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" + error })
    }
}

export const removeFriend = async (req: any, res: any) => {
    let { user_id, friend_id } = req.body;
    try {
        const userDoc = await userModel.findById(user_id);
        const friendDoc = await userModel.findById(friend_id);
        if (!userDoc || !friendDoc) {
            return res.status(400).json({ message: "User or friend doesn't exist" })
        }
        await userModel.findByIdAndUpdate(
            friend_id, {
            $pull: { friends: user_id }
        }, { new: true }
        )
        await userModel.findByIdAndUpdate(
            user_id, {
            $pull: { friends: friend_id }
        }, { new: true }
        )
        let messageDoc = {
            user_id: user_id,
            message: `You are no longer friends`,
            message_type: 16,
            seen: false,
            status: 17,
            created_at: DateTime.now().toUTC().toISO(),
            updated_at: DateTime.now().toUTC().toISO(),
        }
        let chatSessionExist = await chatModel.findOne({ users: { $all: [user_id, friend_id] } })
        if (chatSessionExist) {
            await chatModel.findOneAndUpdate(
                { users: { $all: [user_id, friend_id] } },
                {
                    has_friends: false,
                    $push: {
                        chat_messages: messageDoc
                    }
                }
            )
        } else {
            await chatModel.create({
                users: [user_id, friend_id],
                chat_start_at: DateTime.now().toUTC().toISO(),
                chat_end_at: '',
                has_friends: false,
                socket_id: '',
                chat_messages: [
                    messageDoc
                ],
                created_at: DateTime.now().toUTC().toISO(),
                updated_at: DateTime.now().toUTC().toISO(),
            })
        }
        let token: any = await notificationModel.findOne({ user_id: friend_id }).populate(["user_id"]);
        let title = `Hey, ${friendDoc?.name}`;
        let body = `${userDoc?.name} has removed you as a friend`;
        await notificationModel.findOneAndUpdate(
            { user_id: friend_id }, {
            $push: {
                notifications: {
                    title,
                    body,
                    createdAt: DateTime.now().toUTC().toISO()
                }
            }
        }
        )
        await sendNotifications({ tokens: [token?.pushNotificationToken], title, body });
        res.status(200).json({ message: "Friend removed" })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" + error })
    }
}