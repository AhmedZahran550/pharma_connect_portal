import { AxiosError } from "axios";
import i18n from "@/localization/i18n";
import ErrorCode from "./errorCodes";

/**
 * Backend error response structure
 */
export interface AppError {
  statusCode: number;
  errorCode: string;
  message: string;
  errors?: FieldError[];
  timestamp?: string;
  path?: string;
  requestId?: string;
}

export interface FieldError {
  property: string;
  code: string;
  message: string;
  value?: string;
}

/**
 * Get localized error message for a given error code
 * Falls back to the provided message if no translation is found
 */
export function getLocalizedErrorMessage(
  errorCode: string,
  fallbackMessage?: string
): string {
  const translationKey = `errors.${errorCode}`;
  const translated = i18n.t(translationKey);

  // If translation key is returned as-is, it means no translation was found
  if (translated === translationKey || !translated) {
    return fallbackMessage || i18n.t("errors.INTERNAL_SERVER_ERROR");
  }

  return translated;
}

/**
 * Get localized field validation error message
 */
export function getLocalizedFieldError(
  fieldName: string,
  errorCode: string,
  fallbackMessage?: string
): string {
  const translationKey = `validation.${errorCode}`;
  const translated = i18n.t(translationKey, { field: fieldName });

  if (translated === translationKey || !translated) {
    return fallbackMessage || `${fieldName} is invalid`;
  }

  return translated;
}

/**
 * Parse API error response and return user-friendly error object
 */
export function handleApiError(error: AxiosError<AppError>): {
  message: string;
  fieldErrors: Record<string, string>;
  errorCode: string;
  statusCode: number;
} {
  const response = error.response;

  // Default error response
  const result = {
    message: i18n.t("errors.INTERNAL_SERVER_ERROR"),
    fieldErrors: {} as Record<string, string>,
    errorCode: ErrorCode.INTERNAL_SERVER_ERROR as string,
    statusCode: 500,
  };

  if (!response) {
    // Network error
    result.message = i18n.t("errors.NETWORK_ERROR");
    result.errorCode = "NETWORK_ERROR";
    return result;
  }

  const data = response.data;
  result.statusCode = response.status;
  result.errorCode = data?.errorCode || getDefaultErrorCode(response.status);

  // Get localized message
  result.message = getLocalizedErrorMessage(result.errorCode, data?.message);

  // Process field-level errors
  if (data?.errors && Array.isArray(data.errors)) {
    data.errors.forEach((fieldError) => {
      result.fieldErrors[fieldError.property] = getLocalizedFieldError(
        fieldError.property,
        fieldError.code,
        fieldError.message
      );
    });
  }

  return result;
}

/**
 * Get default error code based on HTTP status
 */
function getDefaultErrorCode(status: number): string {
  switch (status) {
    case 400:
      return ErrorCode.BAD_REQUEST;
    case 401:
      return ErrorCode.UNAUTHORIZED;
    case 403:
      return ErrorCode.FORBIDDEN;
    case 404:
      return ErrorCode.NOT_FOUND;
    case 409:
      return ErrorCode.CONFLICT;
    case 429:
      return ErrorCode.MAX_TRIALS_EXCEEDED;
    default:
      return ErrorCode.INTERNAL_SERVER_ERROR;
  }
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(errorCode: string): boolean {
  return [
    ErrorCode.INVALID_TOKEN,
    ErrorCode.TOKEN_EXPIRED,
    ErrorCode.UNAUTHORIZED,
    ErrorCode.INVALID_CREDENTIALS,
    ErrorCode.INVALID_IDENTITY,
  ].includes(errorCode as ErrorCode);
}

/**
 * Check if error is a validation error
 */
export function isValidationError(errorCode: string): boolean {
  return errorCode === ErrorCode.BAD_REQUEST;
}

/**
 * Check if error is a not found error
 */
export function isNotFoundError(errorCode: string): boolean {
  return [
    ErrorCode.NOT_FOUND,
    ErrorCode.RESOURCE_NOT_FOUND,
    ErrorCode.USER_NOT_FOUND,
    ErrorCode.ORDER_NOT_FOUND,
    ErrorCode.ITEM_NOT_FOUND,
    ErrorCode.MEDICAL_PROFILE_NOT_FOUND,
    ErrorCode.SERVICE_REQUEST_NOT_FOUND,
    ErrorCode.CONSULTATION_NOT_FOUND,
    ErrorCode.EMPLOYEE_NOT_FOUND,
  ].includes(errorCode as ErrorCode);
}

/**
 * Format error for toast notification
 */
export function formatErrorForToast(error: AxiosError<AppError>): string {
  const { message, fieldErrors } = handleApiError(error);

  // If there are field errors, append first one to message
  const fieldErrorKeys = Object.keys(fieldErrors);
  if (fieldErrorKeys.length > 0) {
    return `${message}: ${fieldErrors[fieldErrorKeys[0]]}`;
  }

  return message;
}
