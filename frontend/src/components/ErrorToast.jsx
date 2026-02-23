import React from 'react';
import { toast } from 'react-toastify';
import ErrorInfoButton from './ErrorInfoButton';
import { getErrorReason } from '../utils/errorUtils';

/**
 * Enhanced Toast notification with error info button
 * Wraps react-toastify toast with ErrorInfoButton integration
 */
export const errorToast = (message, error = null, options = {}) => {
  // Use reason from options if provided, otherwise extract from error
  const errorReason = options.reason || (error ? getErrorReason(error) : null);
  
  const toastContent = (
    <div className="flex items-center gap-2">
      <span>{message}</span>
      {errorReason && (
        <ErrorInfoButton reason={errorReason} variant="inline" size="sm" />
      )}
    </div>
  );

  // Remove reason from options before passing to toast
  const { reason, ...toastOptions } = options;

  return toast.error(toastContent, {
    ...toastOptions,
    position: toastOptions.position || 'bottom-right',
    autoClose: toastOptions.autoClose || 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export default errorToast;

