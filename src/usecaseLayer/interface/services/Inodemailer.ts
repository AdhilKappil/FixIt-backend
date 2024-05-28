interface INodemailer {
    generateOTP(email: string): string;
    sendEmailVerification(email: string, username: string): Promise<string>;
    sendEmailVerificationToStartWork(email: string, username: string): Promise<string>;
    sendMessageToEmail(email: string, name: string,status:string): Promise<string>;
    verifyEmail(enteredOTP: string, email: string): Promise<boolean>;
    verifyEmailToStartWork(enteredOTP: string, email: string): Promise<boolean>;
  }
  
  export default INodemailer;