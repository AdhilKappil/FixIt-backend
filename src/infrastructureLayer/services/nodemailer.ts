import nodemailer from "nodemailer";
import INodemailer from "../../usecaseLayer/interface/services/Inodemailer";

class Nodemailer implements INodemailer {
  private otps: Map<string, string> = new Map();

  //to generate otp
  generateOTP(): string {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }

  //to send email for verification
  async sendEmailVerification(email: string, name: string): Promise<string> {
    try {
      console.log(email, name);
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: false,
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.PASSWORD,
        },
      });

      if (this.otps) {
        this.otps.clear();
      }
      const otp = this.generateOTP();
      this.otps.set(email, otp);
      console.log(this.otps);

      const mailOptions = {
        from: "testingjobee007@gmail.com",
        to: email,
        subject: "Email Verification",
        html: `
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2>Hello ${name}, Welcome to <strong>FixIt</strong>!</h2>
            <p>We are excited to have you on board. To get started, please verify your email address:</p>
          </div>
          <div style="width: 75%; margin: 0 auto; background-color: black; color: white; padding: 4px; font-size: 3rem; text-align: center; border-radius: 5px;">
            <strong>${otp}</strong>
          </div>
        </div>
      </body>
      `,
      };

      await transporter.sendMail(mailOptions);
      return "Hey please check your email";
    } catch (error) {
      throw new Error(
        `Unable to send email verification email to ${email}: ${error}`
      );
    }
  }

  async sendMessageToEmail(
    email: string,
    name: string,
    status: string
  ): Promise<string> {
    try {
      console.log(email, name);
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: false,
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.PASSWORD,
        },
      });

      const acceptMailOptions = {
        from: "testingjobee007@gmail.com",
        to: email,
        subject: "Response For Your Worker Join Request",
        html: `
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2>Application Accepted</h2>
          </div>
          <div style="margin-bottom: 20px;">
            <p>Dear ${name},</p>
            <p>Congratulations! Your application to join FixIt has been accepted.</p>
            <p>We are thrilled to welcome you to our platform. You have been selected based on your qualifications and experience, and we believe you will be a valuable addition to our team.</p>
            <p>Your journey with FixIt starts now. We look forward to working together and creating great experiences for our users.</p>
            <p>If you have any questions or need assistance, please do not hesitate to reach out to us.</p>
            <p>Welcome aboard!</p>
          </div>
          <div style="text-align: center; color: #666; font-size: 14px;">
            <p>Best regards,</p>
            <p>The FixIt Team</p>
          </div>
        </div>
      </body>
       `,
      };

      const rejectMailOptions = {
        from: "testingjobee007@gmail.com",
        to: email,
        subject: "Response For Your Worker Join Request",
        html: `
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2>Application Rejected</h2>
          </div>
          <div style="margin-bottom: 20px;">
            <p>Dear ${name},</p>
            <p>We regret to inform you that your application for joining FixIt has been rejected.</p>
            <p>After careful consideration, we have determined that your profile does not meet our current requirements. We appreciate your interest in joining our platform and encourage you to continue enhancing your skills and experience.</p>
            <p>If you have any questions or would like more information about our decision, please feel free to contact us at admin@gmail.com.</p>
            <p>Thank you for your understanding.</p>
          </div>
          <div style="text-align: center; color: #666; font-size: 14px;">
            <p>Best regards,</p>
            <p>The FixIt Team</p>
          </div>
        </div>
      </body>
      `,
      };

      if (status === "accept") {
        await transporter.sendMail(acceptMailOptions);
      } else {
        await transporter.sendMail(rejectMailOptions);
      }

      return "Success";
    } catch (error) {
      throw new Error(
        `Unable to send email verification email to ${email}: ${error}`
      );
    }
  }

  //to verfiy the email to check if it is crct or not
  async verifyEmail(enteredOTP: string, email: string): Promise<boolean> {
    try {
      const expectedOTP = this.otps.get(email);
      if (expectedOTP === enteredOTP) {
        this.otps.delete(email);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("Wrong otp");
    }
  }
}

export default Nodemailer;
