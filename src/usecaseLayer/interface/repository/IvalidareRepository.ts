
export interface ValidationResult {
    success: boolean;
    message?: string;
  }
  
  // RequestValidatorInterface.ts
  export interface IRequestValidator {
    validateRequiredFields(
      data: Record<string, any>,
      requiredFields: string[]
    ): ValidationResult;
  }
  