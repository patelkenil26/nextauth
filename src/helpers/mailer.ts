import User from "@/models/userModels";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {

        // TODO:configure mail for usage 

        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        console.log("MAIL", userId);
        console.log("EMAIL TYPE", emailType);
        console.log(typeof emailType)

        if (emailType === "VERIFY") {
            console.log("VERIFY SECTION")
            const updatedUser = await User.findByIdAndUpdate(userId, {$set:{ verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }});
            console.log("Updated user for VERIFY",updatedUser);
        } else if (emailType === "RESET") {
            console.log("RESET SECTION")
            await User.findByIdAndUpdate(userId,{
                $set: { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 }
            } )

        }
        console.log("out side of if else")
        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "f64e0e80d15084",
                pass: "18220d28bdf8d1"
            }
        });

        const mailOptions = {
            from: "kenil@kenil.ai",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your Email" : "Reset Your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "reset your password"} or copy and past the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message)
    }
}