import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "esportsarena334@gmail.com",
        pass: "xlkoblrkebrvfqhp",
    },
});
export const sendMailToUser = async (email: any, subject: any, text: any, html: any) => {
    await transporter.sendMail({
        from: '"TRAINIFAI"<esportsarena334@gmail.com>', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
    })
}