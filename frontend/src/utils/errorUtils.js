/**
 * Utility functions for error handling and extracting error reasons
 */

/**
 * Extract error reason from API error response
 * @param {Error} error - The error object
 * @returns {string} - The error reason message
 */
export function getErrorReason(error) {
  if (!error) {
    return null;
  }

  // Check for response data message
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  // Check for error message
  if (error.message) {
    // Map common error messages to user-friendly reasons
    if (error.message.includes('Network Error')) {
      return "Unable to connect to the server. Please check your internet connection and ensure the backend server is running.";
    }
    if (error.message.includes('timeout')) {
      return "Request timed out. The server took too long to respond. Please try again.";
    }
    return error.message;
  }

  // Check for status code based messages
  if (error.response?.status) {
    const status = error.response.status;
    switch (status) {
      case 400:
        return "Invalid request. Please check your input and try again.";
      case 401:
        return "You are not authenticated. Please log in and try again.";
      case 403:
        return "You don't have permission to perform this action. Contact an administrator if you believe this is an error.";
      case 404:
        return "The requested resource was not found. The endpoint or resource may have been moved or removed.";
      case 409:
        return "A conflict occurred. This usually means a duplicate entry already exists.";
      case 500:
        return "Internal server error. The server encountered an unexpected error. Please try again later.";
      case 502:
        return "Bad gateway. The server is temporarily unavailable. Please try again later.";
      case 503:
        return "Service unavailable. The server is temporarily down for maintenance. Please try again later.";
      default:
        return `Request failed with status code ${status}. Please try again.`;
    }
  }

  return null;
}

/**
 * Get role-based error reason for authorization errors
 * @param {string} userRole - Current user role
 * @param {string} requiredRole - Required role for the action
 * @param {string} action - The action being attempted
 * @returns {string} - Formatted error reason
 */
export function getAuthorizationErrorReason(userRole, requiredRole, action = "access this resource") {
  if (!userRole) {
    return `You must be logged in to ${action}. Please log in and try again.`;
  }

  if (requiredRole === 'ADMIN') {
    return `Only administrators can ${action}. Your current role is "${userRole}". Contact an administrator if you need access.`;
  }

  if (requiredRole === 'SELLER') {
    return `Only sellers can ${action}. Your current role is "${userRole}". Apply to become a seller if you want to ${action}.`;
  }

  return `You don't have the required "${requiredRole}" privileges to ${action}. Your current role is "${userRole}".`;
}

/**
 * Format validation error reason
 * @param {Object} errors - Validation errors object
 * @returns {string} - Formatted error reason
 */
export function getValidationErrorReason(errors) {
  if (!errors || typeof errors !== 'object') {
    return "Validation error occurred. Please check your input.";
  }

  const errorMessages = Object.values(errors).filter(msg => msg);
  if (errorMessages.length === 0) {
    return "Validation error occurred. Please check your input.";
  }

  if (errorMessages.length === 1) {
    return errorMessages[0];
  }

  return `Multiple validation errors: ${errorMessages.join('; ')}`;
}


