import express from "express";
import * as http from 'http';
import connectDatabase from "./database/database";
import userRouter from "./routes/route";
import cors from "cors";
import expressSession from "express-session";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import chatModel from "./models/chatModel";
import { DateTime } from "luxon";
import chatStatusModel from "./models/userChatStatus";
import notificationModel from "./models/notificationModel";
import { sendNotifications } from "../utils/sendNotification";
import userModel from "./models/user";

connectDatabase();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('trust proxy', 1)
const PORT = 9000;
app.use(cors({
    credentials: true,
    // origin: '*'
    origin: ['http://localhost:3001', 'http://localhost:3000', 'http://localhost:9000']
}));
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        // origin: "*",
        origin: ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:3001', "http://192.168.1.22:8082", "http://192.168.1.22:9000"],
        // origin: ['https://chatbot.iariv.com', 'https://chatbotapi.iariv.com','https://chatbotadmin.iariv.com'],
        methods: ["GET", "POST"],
    },
    path: "/api/chatapp",
});

// status 8 means user is online
// status -8 means user is offline

io.on("connection", (socket: any) => {
    socket.on("user_online", async (data: any) => {
        let date = DateTime.now().toUTC().toISO();
        let userCheck = await chatStatusModel.findOne({
            user_id: data.user_id,
        });
        if (userCheck) {
            let userStatus = await chatStatusModel.findOneAndUpdate({ user_id: data.user_id }, { status: 8, updated_at: date, socket_id: socket.id }, { new: true });
        } else {
            let userstatusdoc = await chatStatusModel.create({
                user_id: data.user_id,
                socket_id: socket.id,
                updated_at: date,
            });
        }
    });

    socket.on("join_chat_room", async (data: any) => {
        console.log(data, "join chat data");
        socket.join(data.chat_id);
        let date = DateTime.now().toUTC().toISO();
        await chatStatusModel.findOneAndUpdate({ socket_id: socket.id }, { $push: { joined_rooms: data?.sessionId?.toString() }, updated_at: date });
    });

    socket.on("user_message", async (data: any) => {
        console.log(data, "message data");
        try {
            let messageDoc = {
                user_id: data?.user_id,
                message: data?.message,
                message_type: 15,
                seen: false,
                status: 17,
                created_at: DateTime.now().toUTC().toISO(),
                updated_at: DateTime.now().toUTC().toISO(),
            }
            await chatModel.findByIdAndUpdate(
                data?.chat_id, {
                $push: {
                    chat_messages: messageDoc
                }
            })
            io.to(data?.chat_id.toString()).emit("live_message", { messageDoc });
            let userToken: any = await notificationModel.findOne({ user_id: data?.user_id }).populate(["user_id"]);
            let friendToken: any = await notificationModel.findOne({ user_id: data?.friend_id }).populate(["user_id"]);
            let friendDoc = await userModel.findById(data?.friend_id)
            let userDoc = await userModel.findById(data?.user_id)
            let title = `${userDoc?.name}`;
            let body = `${data?.message}`;
            // await notificationModel.findOneAndUpdate(
            //     { user_id: data?.friend_id }, {
            //     notifications: [{
            //         title,
            //         body,
            //         createdAt: DateTime.now().toUTC().toISO()
            //     }]
            // }
            // )
            await sendNotifications({ tokens: [friendToken?.pushNotificationToken], title, body });
        } catch (error) {

        }
    })


});


const SECRET: any = process.env.DB_AUTH_SECRET;
// console.log(SECRET, "db secret");
app.use(expressSession({ secret: SECRET, resave: false, saveUninitialized: false, cookie: { secure: false, httpOnly: true, maxAge: 365 * 24 * 60 * 60 * 1000 }, store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL, collectionName: "user_data" }) }))

app.use("/api", userRouter);

// Define a route for the root URL
app.get("/", (req, res) => {
    res.send("Response from Express server.");
});

server.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
});
