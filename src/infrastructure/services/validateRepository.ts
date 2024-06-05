import { IRequestValidator } from "../../usecase/interface/repository/IvalidareRepository";


interface ValidationResult {
  success: boolean;
  message?: string;
}

export class RequestValidator implements IRequestValidator {
  private validateEmail(email: string): ValidationResult {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Invalid email format",
      };
    }

    return { success: true };
  }

  validateRequiredFields(
    data: Record<string, any>,
    requiredFields: string[]
  ): ValidationResult {
    for (const field of requiredFields) {
      if (data[field] === undefined) {
        return {
          success: false,
          message: `Missing required parameter: ${field}`,
        };
      }

      if (field === "email") {
        const emailValidationResult = this.validateEmail(data[field]);
        if (!emailValidationResult.success) {
          return emailValidationResult;
        }
      }
    }

    return { success: true };
  }
}

export default RequestValidator;
