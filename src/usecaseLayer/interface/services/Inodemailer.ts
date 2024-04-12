interface INodemailer {
    generateOTP(email: string): string;
    sendEmailVerification(email: string, username: string): Promise<string>;
    verifyEmail(enteredOTP: string, email: string): Promise<boolean>;
  }
  
  export default INodemailer;