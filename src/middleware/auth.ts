import jwt from "jsonwebtoken";
// require('dotenv').config();

const auth = (req: any, res: any, next: any) => {
    console.log(req.session.token, "--> token check");
    try {
        // const secret = "amaan@trainifai#1234&"
        const secret = process.env.DB_AUTH_SECRET
        let newToken = ""
        console.log(req.session.token, "--oyuo");
        if (req.session.token) {
            newToken = req.session.token;
            console.log("auth", newToken);
        }
        if (newToken && secret) {
            let user: any = jwt.verify(newToken, secret);
            console.log("verify - " + user?.email);
            req.user = user;
            if (user) {
                next();
            } else {
                res.status(400).json({ message: "Unauthorized access login to continue" })
                return;
            }

        } else {
            res.status(400).json({ message: "Unauthorized access login to continue" })
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unauthorized access login to continue" })
    }
}

export default auth;