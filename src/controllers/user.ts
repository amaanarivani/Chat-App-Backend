import userModel from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMailToUser } from "../../utils/sendMail";
import chatModel from "../models/chatModel";
import { DateTime } from "luxon";
import notificationModel from "../models/notificationModel";
import { sendNotifications } from "../../utils/sendNotification";
// import sendMailToUser from "../utils/sendMail";
// const sendMailToUser = require("../utils/sendMail");

export const Signup = async (req: any, res: any) => {
    let { name, email, password, created_at = Date.now() } = req.body;
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
    await sendMailToUser(email, "Signup succesfull", "Welcome", `
    <!DOCTYPE HTML
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <title></title>

    <style type="text/css">
        @media only screen and (min-width: 620px) {
            .u-row {
                width: 600px !important;
            }

            .u-row .u-col {
                vertical-align: top;
            }

            .u-row .u-col-100 {
                width: 600px !important;
            }
        }

        @media (max-width: 620px) {
            .u-row-container {
                max-width: 100% !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
            }

            .u-row .u-col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
            }

            .u-row {
                width: 100% !important;
            }

            .u-col {
                width: 100% !important;
            }

            .u-col>div {
                margin: 0 auto;
            }
        }

        body {
            margin: 0;
            padding: 0;
        }

        table,
        tr,
        td {
            vertical-align: top;
            border-collapse: collapse;
        }

        p {
            margin: 0;
        }

        .ie-container table,
        .mso-container table {
            table-layout: fixed;
        }

        * {
            line-height: inherit;
        }

        a[x-apple-data-detectors='true'] {
            color: inherit !important;
            text-decoration: none !important;
        }

        table,
        td {
            color: #000000;
        }

        #u_body a {
            color: #0000ee;
            text-decoration: underline;
        }
    </style>



    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
    <!--<![endif]-->

</head>

<body class="clean-body u_body"
    style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table id="u_body"
        style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%"
        cellpadding="0" cellspacing="0">
        <tbody>
            <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->



                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="height: 100%;width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <!-- <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="font-size: 14px; color: #afb0c7; line-height: 170%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 170%;"><span
                                                                        style="font-size: 14px; line-height: 23.8px;">View
                                                                        Email in Browser</span></p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table> -->

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>





                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #279EFF;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #003399;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="height: 100%;width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Cabin',sans-serif;"
                                                            align="left">

                                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                                border="0">
                                                                <tr>
                                                                    <td style="padding-right: 0px;padding-left: 0px;"
                                                                        align="center">

                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" class="bi bi-envelope-check-fill" viewBox="0 0 16 16">
  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 4.697v4.974A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-1.965.45l-.338-.207z"/>
  <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686"/>
</svg>

                                                                    </td>
                                                                </tr>
                                                            </table>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="font-size: 14px; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 140%;"><strong>T
                                                                        H A N K S&nbsp; &nbsp;F O R&nbsp; &nbsp;S I G N
                                                                        I N G&nbsp; &nbsp;U P !</strong></p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 31px;font-family:'Cabin',sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="font-size: 14px; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 140%;"><span
                                                                        style="font-size: 28px; line-height: 39.2px;"><strong><span
                                                                                style="line-height: 39.2px; font-size: 28px;">Verify Your Email Address</span></strong>
                                                                    </span>
                                                                </p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>





                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="height: 100%;width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 160%;"><span
                                                                        style="font-size: 22px; line-height: 35.2px;">Hey
                                                                        ${name},
                                                                    </span></p>
                                                                <p style="font-size: 14px; line-height: 160%;"><span
                                                                        style="font-size: 18px; line-height: 28.8px;">Thank you for choosing Convo! You're almost ready to get started. Please use given verification code to verify email address
                                                                    </span></p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;"
                                                            align="left">

                                                            <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                                            <div align="center">
                                                                <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46px; v-text-anchor:middle; width:234px;" arcsize="8.5%"  stroke="f" fillcolor="#ff6600"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
                                                                <p target="_blank" class="v-button"
                                                                    style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #279EFF; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                                                                    <span
                                                                        style="display:block;padding:14px 44px 13px;line-height:120%;"><span
                                                                            style="font-size: 16px; line-height: 19.2px;"><strong><span
                                                                                    style="line-height: 19.2px; font-size: 16px;">${code}</span></strong>
                                                                        </span>
                                                                    </span>
                                                                </p>
                                                                <!--[if mso]></center></v:roundrect><![endif]-->
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                                                <p style="line-height: 160%; font-size: 14px;"><span
                                                                        style="font-size: 18px; line-height: 28.8px;">Thanks,</span>
                                                                </p>
                                                                <p style="line-height: 160%; font-size: 14px;"><span
                                                                        style="font-size: 18px; line-height: 28.8px;">Convo</span>
                                                                </p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>





                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #e5eaf5;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #e5eaf5;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="height: 100%;width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:41px 55px 18px;font-family:'Cabin',sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="font-size: 14px; color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 160%;"><span
                                                                        style="font-size: 20px; line-height: 32px;"><strong>Get
                                                                            in touch</strong></span></p>

                                                                <p style="font-size: 14px; line-height: 160%;"><span
                                                                        style="font-size: 16px; line-height: 25.6px; color: #000000;">alamamaan334@gmail.com</span>
                                                                </p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 33px;font-family:'Cabin',sans-serif;"
                                                            align="left">

                                                            <div align="center">
                                                                <div style="display: table; max-width:244px;">
                                                                    <!--[if (mso)|(IE)]><table width="244" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:244px;"><tr><![endif]-->


                                                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                                                    <table align="center" border="0" cellspacing="0"
                                                                        cellpadding="0" width="32" height="32"
                                                                        style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                                                        <tbody>
                                                                            <tr style="vertical-align: top">
                                                                                <td align="center" valign="middle"
                                                                                    style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-facebook" viewBox="0 0 16 16">
  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
</svg>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <!--[if (mso)|(IE)]></td><![endif]-->



                                                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                                                    <table align="center" border="0" cellspacing="0"
                                                                        cellpadding="0" width="32" height="32"
                                                                        style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                                                        <tbody>
                                                                            <tr style="vertical-align: top">
                                                                                <td align="center" valign="middle"
                                                                                    style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="black" class="bi bi-instagram" viewBox="0 0 16 16">
  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
</svg>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <!--[if (mso)|(IE)]></td><![endif]-->

                                                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                                                    <table align="center" border="0" cellspacing="0"
                                                                        cellpadding="0" width="32" height="32"
                                                                        style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                                                        <tbody>
                                                                            <tr style="vertical-align: top">
                                                                                <td align="center" valign="middle"
                                                                                    style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                                            width="28" height="28"
                                                                                            fill="black"
                                                                                            class="bi bi-twitter-x"
                                                                                            viewBox="0 0 16 16">
                                                                                            <path
                                                                                                d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                                                                                        </svg>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <!--[if (mso)|(IE)]></td><![endif]-->






                                                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                                                </div>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>





                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #279EFF;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #003399;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="height: 100%;width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;"
                                                            align="left">

                                                            <div
                                                                style="font-size: 14px; color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 180%;"><span
                                                                        style="font-size: 16px; line-height: 28.8px;">Copyrights
                                                                        © Convo | All Rights Reserved</span></p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
            </tr>
        </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
</body>

</html>
    `)
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
    await sendMailToUser(email, "Verify your email", "Welcome", `
        <!DOCTYPE HTML
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
        <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
        <title></title>
    
        <style type="text/css">
            @media only screen and (min-width: 620px) {
                .u-row {
                    width: 600px !important;
                }
    
                .u-row .u-col {
                    vertical-align: top;
                }
    
                .u-row .u-col-100 {
                    width: 600px !important;
                }
            }
    
            @media (max-width: 620px) {
                .u-row-container {
                    max-width: 100% !important;
                    padding-left: 0px !important;
                    padding-right: 0px !important;
                }
    
                .u-row .u-col {
                    min-width: 320px !important;
                    max-width: 100% !important;
                    display: block !important;
                }
    
                .u-row {
                    width: 100% !important;
                }
    
                .u-col {
                    width: 100% !important;
                }
    
                .u-col>div {
                    margin: 0 auto;
                }
            }
    
            body {
                margin: 0;
                padding: 0;
            }
    
            table,
            tr,
            td {
                vertical-align: top;
                border-collapse: collapse;
            }
    
            p {
                margin: 0;
            }
    
            .ie-container table,
            .mso-container table {
                table-layout: fixed;
            }
    
            * {
                line-height: inherit;
            }
    
            a[x-apple-data-detectors='true'] {
                color: inherit !important;
                text-decoration: none !important;
            }
    
            table,
            td {
                color: #000000;
            }
    
            #u_body a {
                color: #0000ee;
                text-decoration: underline;
            }
        </style>
    
    
    
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
        <!--<![endif]-->
    
    </head>
    
    <body class="clean-body u_body"
        style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
        <!--[if IE]><div class="ie-container"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table id="u_body"
            style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%"
            cellpadding="0" cellspacing="0">
            <tbody>
                <tr style="vertical-align: top">
                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
    
    
    
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
    
                                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->
    
                                                <!-- <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="font-size: 14px; color: #afb0c7; line-height: 170%; text-align: center; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 170%;"><span
                                                                            style="font-size: 14px; line-height: 23.8px;">View
                                                                            Email in Browser</span></p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table> -->
    
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
    
    
    
    
    
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #279EFF;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #003399;"><![endif]-->
    
                                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->
    
                                                <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Cabin',sans-serif;"
                                                                align="left">
    
                                                                <table width="100%" cellpadding="0" cellspacing="0"
                                                                    border="0">
                                                                    <tr>
                                                                        <td style="padding-right: 0px;padding-left: 0px;"
                                                                            align="center">
    
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" class="bi bi-envelope-check-fill" viewBox="0 0 16 16">
      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 4.697v4.974A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-1.965.45l-.338-.207z"/>
      <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686"/>
    </svg>
    
                                                                        </td>
                                                                    </tr>
                                                                </table>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                                <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="font-size: 14px; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 140%;"><strong>T
                                                                            H A N K S&nbsp; &nbsp;F O R&nbsp; &nbsp;S I G N
                                                                            I N G&nbsp; &nbsp;U P !</strong></p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                                <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 31px;font-family:'Cabin',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="font-size: 14px; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 140%;"><span
                                                                            style="font-size: 28px; line-height: 39.2px;"><strong><span
                                                                                    style="line-height: 39.2px; font-size: 28px;">Verify Your Email Address</span></strong>
                                                                        </span>
                                                                    </p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
    
    
    
    
    
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->
    
                                                <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 160%;"><span
                                                                            style="font-size: 22px; line-height: 35.2px;">Hey
                                                                            ${result.name},
                                                                        </span></p>
                                                                    <p style="font-size: 14px; line-height: 160%;"><span
                                                                            style="font-size: 18px; line-height: 28.8px;">Thank you for choosing Convo! You're almost ready to get started. Please use given verification code to verify email address
                                                                        </span></p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                                <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;"
                                                                align="left">
    
                                                                <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                                                <div align="center">
                                                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46px; v-text-anchor:middle; width:234px;" arcsize="8.5%"  stroke="f" fillcolor="#ff6600"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
                                                                    <p target="_blank" class="v-button"
                                                                        style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #279EFF; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                                                                        <span
                                                                            style="display:block;padding:14px 44px 13px;line-height:120%;"><span
                                                                                style="font-size: 16px; line-height: 19.2px;"><strong><span
                                                                                        style="line-height: 19.2px; font-size: 16px;">${code}</span></strong>
                                                                            </span>
                                                                        </span>
                                                                    </p>
                                                                    <!--[if mso]></center></v:roundrect><![endif]-->
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                                <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                                                    <p style="line-height: 160%; font-size: 14px;"><span
                                                                            style="font-size: 18px; line-height: 28.8px;">Thanks,</span>
                                                                    </p>
                                                                    <p style="line-height: 160%; font-size: 14px;"><span
                                                                            style="font-size: 18px; line-height: 28.8px;">Convo</span>
                                                                    </p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
    
    
    
    
    
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #e5eaf5;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #e5eaf5;"><![endif]-->
    
                                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->
    
                                                <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:41px 55px 18px;font-family:'Cabin',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="font-size: 14px; color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 160%;"><span
                                                                            style="font-size: 20px; line-height: 32px;"><strong>Get
                                                                                in touch</strong></span></p>
    
                                                                    <p style="font-size: 14px; line-height: 160%;"><span
                                                                            style="font-size: 16px; line-height: 25.6px; color: #000000;">alamamaan334@gmail.com</span>
                                                                    </p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                                <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 33px;font-family:'Cabin',sans-serif;"
                                                                align="left">
    
                                                                <div align="center">
                                                                    <div style="display: table; max-width:244px;">
                                                                        <!--[if (mso)|(IE)]><table width="244" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:244px;"><tr><![endif]-->
    
    
                                                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                                                        <table align="center" border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="center" valign="middle"
                                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-facebook" viewBox="0 0 16 16">
      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
    </svg>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if (mso)|(IE)]></td><![endif]-->
    
    
    
                                                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                                                        <table align="center" border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="center" valign="middle"
                                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="black" class="bi bi-instagram" viewBox="0 0 16 16">
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
    </svg>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if (mso)|(IE)]></td><![endif]-->
    
                                                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                                                        <table align="center" border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="center" valign="middle"
                                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                                                width="28" height="28"
                                                                                                fill="black"
                                                                                                class="bi bi-twitter-x"
                                                                                                viewBox="0 0 16 16">
                                                                                                <path
                                                                                                    d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                                                                                            </svg>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if (mso)|(IE)]></td><![endif]-->
    
    
    
    
    
    
                                                                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                                                    </div>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
    
    
    
    
    
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #279EFF;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #003399;"><![endif]-->
    
                                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->
    
                                                <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="font-size: 14px; color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 180%;"><span
                                                                            style="font-size: 16px; line-height: 28.8px;">Copyrights
                                                                            © Convo | All Rights Reserved</span></p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
    
    
    
                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    </td>
                </tr>
            </tbody>
        </table>
        <!--[if mso]></div><![endif]-->
        <!--[if IE]></div><![endif]-->
    </body>
    
    </html>
        `)
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
    await sendMailToUser(email, "Reset your password", "Welcome", `
        <!DOCTYPE HTML
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
        <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
        <title></title>
    
        <style type="text/css">
            @media only screen and (min-width: 620px) {
                .u-row {
                    width: 600px !important;
                }
    
                .u-row .u-col {
                    vertical-align: top;
                }
    
                .u-row .u-col-100 {
                    width: 600px !important;
                }
            }
    
            @media (max-width: 620px) {
                .u-row-container {
                    max-width: 100% !important;
                    padding-left: 0px !important;
                    padding-right: 0px !important;
                }
    
                .u-row .u-col {
                    min-width: 320px !important;
                    max-width: 100% !important;
                    display: block !important;
                }
    
                .u-row {
                    width: 100% !important;
                }
    
                .u-col {
                    width: 100% !important;
                }
    
                .u-col>div {
                    margin: 0 auto;
                }
            }
    
            body {
                margin: 0;
                padding: 0;
            }
    
            table,
            tr,
            td {
                vertical-align: top;
                border-collapse: collapse;
            }
    
            p {
                margin: 0;
            }
    
            .ie-container table,
            .mso-container table {
                table-layout: fixed;
            }
    
            * {
                line-height: inherit;
            }
    
            a[x-apple-data-detectors='true'] {
                color: inherit !important;
                text-decoration: none !important;
            }
    
            table,
            td {
                color: #000000;
            }
    
            #u_body a {
                color: #0000ee;
                text-decoration: underline;
            }
        </style>
    
    
    
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
        <!--<![endif]-->
    
    </head>
    
    <body class="clean-body u_body"
        style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
        <!--[if IE]><div class="ie-container"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table id="u_body"
            style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%"
            cellpadding="0" cellspacing="0">
            <tbody>
                <tr style="vertical-align: top">
                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
    
    
    
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
    
                                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->
    
                                                <!-- <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="font-size: 14px; color: #afb0c7; line-height: 170%; text-align: center; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 170%;"><span
                                                                            style="font-size: 14px; line-height: 23.8px;">View
                                                                            Email in Browser</span></p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table> -->
    
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
    
    
    
    
    
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #279EFF;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #003399;"><![endif]-->
    
                                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->
    
                                                <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Cabin',sans-serif;"
                                                                align="left">
    
                                                                <table width="100%" cellpadding="0" cellspacing="0"
                                                                    border="0">
                                                                    <tr>
                                                                        <td style="padding-right: 0px;padding-left: 0px;"
                                                                            align="center">
    
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" class="bi bi-envelope-check-fill" viewBox="0 0 16 16">
      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 4.697v4.974A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-1.965.45l-.338-.207z"/>
      <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686"/>
    </svg>
    
                                                                        </td>
                                                                    </tr>
                                                                </table>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                                <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="font-size: 14px; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 140%;"><strong>T
                                                                            H A N K S&nbsp; &nbsp;F O R&nbsp; &nbsp;S I G N
                                                                            I N G&nbsp; &nbsp;U P !</strong></p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                                <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 31px;font-family:'Cabin',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="font-size: 14px; color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 140%;"><span
                                                                            style="font-size: 28px; line-height: 39.2px;"><strong><span
                                                                                    style="line-height: 39.2px; font-size: 28px;">Reset Your Password</span></strong>
                                                                        </span>
                                                                    </p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
    
    
    
    
    
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->
    
                                                <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 160%;"><span
                                                                            style="font-size: 22px; line-height: 35.2px;">Hey
                                                                            ${result.name},
                                                                        </span></p>
                                                                    <p style="font-size: 14px; line-height: 160%;"><span
                                                                            style="font-size: 18px; line-height: 28.8px;">Thank you for choosing Convo! You're almost ready to get started. Please use given verification code to reset your password
                                                                        </span></p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                                <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;"
                                                                align="left">
    
                                                                <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
                                                                <div align="center">
                                                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46px; v-text-anchor:middle; width:234px;" arcsize="8.5%"  stroke="f" fillcolor="#ff6600"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
                                                                    <p target="_blank" class="v-button"
                                                                        style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #279EFF; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                                                                        <span
                                                                            style="display:block;padding:14px 44px 13px;line-height:120%;"><span
                                                                                style="font-size: 16px; line-height: 19.2px;"><strong><span
                                                                                        style="line-height: 19.2px; font-size: 16px;">${code}</span></strong>
                                                                            </span>
                                                                        </span>
                                                                    </p>
                                                                    <!--[if mso]></center></v:roundrect><![endif]-->
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                                <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                                                    <p style="line-height: 160%; font-size: 14px;"><span
                                                                            style="font-size: 18px; line-height: 28.8px;">Thanks,</span>
                                                                    </p>
                                                                    <p style="line-height: 160%; font-size: 14px;"><span
                                                                            style="font-size: 18px; line-height: 28.8px;">Convo</span>
                                                                    </p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
    
    
    
    
    
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #e5eaf5;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #e5eaf5;"><![endif]-->
    
                                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->
    
                                                <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:41px 55px 18px;font-family:'Cabin',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="font-size: 14px; color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 160%;"><span
                                                                            style="font-size: 20px; line-height: 32px;"><strong>Get
                                                                                in touch</strong></span></p>
    
                                                                    <p style="font-size: 14px; line-height: 160%;"><span
                                                                            style="font-size: 16px; line-height: 25.6px; color: #000000;">alamamaan334@gmail.com</span>
                                                                    </p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                                <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 33px;font-family:'Cabin',sans-serif;"
                                                                align="left">
    
                                                                <div align="center">
                                                                    <div style="display: table; max-width:244px;">
                                                                        <!--[if (mso)|(IE)]><table width="244" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:244px;"><tr><![endif]-->
    
    
                                                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                                                        <table align="center" border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="center" valign="middle"
                                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" class="bi bi-facebook" viewBox="0 0 16 16">
      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
    </svg>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if (mso)|(IE)]></td><![endif]-->
    
    
    
                                                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                                                        <table align="center" border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="center" valign="middle"
                                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="black" class="bi bi-instagram" viewBox="0 0 16 16">
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
    </svg>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if (mso)|(IE)]></td><![endif]-->
    
                                                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                                                                        <table align="center" border="0" cellspacing="0"
                                                                            cellpadding="0" width="32" height="32"
                                                                            style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="center" valign="middle"
                                                                                        style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                                                width="28" height="28"
                                                                                                fill="black"
                                                                                                class="bi bi-twitter-x"
                                                                                                viewBox="0 0 16 16">
                                                                                                <path
                                                                                                    d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                                                                                            </svg>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if (mso)|(IE)]></td><![endif]-->
    
    
    
    
    
    
                                                                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                                                    </div>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
    
    
    
    
    
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row"
                                style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #279EFF;">
                                <div
                                    style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #003399;"><![endif]-->
    
                                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                    <div class="u-col u-col-100"
                                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <!--[if (!mso)&(!IE)]><!-->
                                            <div
                                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <!--<![endif]-->
    
                                                <table style="font-family:'Cabin',sans-serif;" role="presentation"
                                                    cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;"
                                                                align="left">
    
                                                                <div
                                                                    style="font-size: 14px; color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;">
                                                                    <p style="font-size: 14px; line-height: 180%;"><span
                                                                            style="font-size: 16px; line-height: 28.8px;">Copyrights
                                                                            © Convo | All Rights Reserved</span></p>
                                                                </div>
    
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
    
                                                <!--[if (!mso)&(!IE)]><!-->
                                            </div>
                                            <!--<![endif]-->
                                        </div>
                                    </div>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                </div>
                            </div>
                        </div>
    
    
    
                        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    </td>
                </tr>
            </tbody>
        </table>
        <!--[if mso]></div><![endif]-->
        <!--[if IE]></div><![endif]-->
    </body>
    
    </html>
        `)
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
            updated_at: Date.now()
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
                chat_start_at: Date.now(),
                chat_end_at: '',
                has_friends: true,
                socket_id: '',
                chat_messages: [
                    messageDoc
                ],
                created_at: Date.now(),
                updated_at: Date.now(),
            })
        }
        let token: any = await notificationModel.findOne({ user_id: friend_id }).populate(["user_id"]);
        let title = `Hey, ${friendDoc?.name}`;
        let body = `${userDoc?.name} has added you as a friend`;
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
                chat_start_at: Date.now(),
                chat_end_at: '',
                has_friends: false,
                socket_id: '',
                chat_messages: [
                    messageDoc
                ],
                created_at: Date.now(),
                updated_at: Date.now(),
            })
        }
        let token: any = await notificationModel.findOne({ user_id: friend_id }).populate(["user_id"]);
        let title = `Hey, ${friendDoc?.name}`;
        let body = `${userDoc?.name} has removed you as a friend`;
        await sendNotifications({ tokens: [token?.pushNotificationToken], title, body });
        res.status(200).json({ message: "Friend removed" })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" + error })
    }
}