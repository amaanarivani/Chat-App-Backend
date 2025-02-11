import notificationModel from "../models/notificationModel";


export const addNotificationToken = async (req: any, res: any) => {
    let { user_id, token } = req.body;
    console.log(user_id, token, "--> add notificationTokenData");

    if (!user_id) {
        return res.status(400).json({ message: "Please provide user_id" })
    }

    try {
        const isExist = await notificationModel.findOne({ user_id })
        // console.log(isExist, "notificationDoc");
        if (isExist) {
            await notificationModel.findOneAndUpdate(
                { user_id }, {
                pushNotificationToken: token,
            }, { new: true })
            res.status(200).json({ message: "Notification token stored" })
        } else {
            await notificationModel.create({
                user_id,
                pushNotificationToken: token,
                createdAt: Date.now()
            })
            res.status(200).json({ message: "Notification token stored" })
        }
    } catch (error) {
        console.log(error, "backend error");
        res.status(500).json({ message: `${error} Something went wrong` });
    }
}