import express from "express";
import * as http from 'http';
import connectDatabase from "./database/database";
import userRouter from "./routes/route";
import cors from "cors";
import expressSession from "express-session";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";

connectDatabase();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('trust proxy', 1)
const server = http.createServer(app);
const PORT = 9000;
app.use(cors({
    credentials: true,
    // origin: '*'
    origin: ['http://localhost:3001', 'http://localhost:3000', 'http://localhost:9000']
}));
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
