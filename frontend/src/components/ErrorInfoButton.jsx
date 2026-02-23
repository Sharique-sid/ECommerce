import React, { useState, useRef, useEffect } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

/**
 * Reusable Error Info Button Component
 * Displays an "i" icon that shows error reason in a tooltip/modal on hover or click
 * 
 * @param {string} reason - The error reason/message to display
 * @param {string} variant - Display variant: 'button' (default) or 'inline'
 * @param {string} size - Size: 'sm', 'md' (default), or 'lg'
 */
export default function ErrorInfoButton({ 
  reason = null, 
  variant = 'button',
  size = 'md' 
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tooltipRef = useRef(null);
  const buttonRef = useRef(null);

  // Default message if no reason provided
  const defaultReason = "Additional information is not available for this error.";
  const displayReason = reason || defaultReason;

  // Size classes
  const sizeClasses = {
    sm: 'w-4 h-4 text-xs',
    md: 'w-5 h-5 text-sm',
    lg: 'w-6 h-6 text-base'
  };

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current && 
        !tooltipRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showTooltip]);

  // Handle button click (for mobile/touch devices)
  const handleClick = (e) => {
    e.stopPropagation();
    if (variant === 'inline') {
      setIsModalOpen(true);
    } else {
      setShowTooltip(!showTooltip);
    }
  };

  // Inline variant (for error messages within forms/text)
  if (variant === 'inline') {
    return (
      <>
        <button
          ref={buttonRef}
          type="button"
          onClick={handleClick}
          className={`inline-flex items-center justify-center ml-1 text-blue-400 hover:text-blue-300 transition-colors ${sizeClasses[size]}`}
          aria-label="Error information"
        >
          <FaInfoCircle />
        </button>

        {/* Modal for inline variant */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
            <div 
              className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-3">
                <FaInfoCircle className="text-blue-400 text-xl mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">Error Information</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{displayReason}</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors ml-2"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Button variant (default - for error pages)
  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`inline-flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300 transition-all ${sizeClasses[size]}`}
        aria-label="Error information"
      >
        <FaInfoCircle />
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div
          ref={tooltipRef}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-[#2f2f2f] border border-[#424242] rounded-lg shadow-xl z-50"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div className="flex items-start gap-2">
            <FaInfoCircle className="text-blue-400 text-sm mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-xs leading-relaxed">{displayReason}</p>
          </div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="w-2 h-2 bg-[#2f2f2f] border-r border-b border-[#424242] transform rotate-45"></div>
          </div>
        </div>
      )}
    </div>
  );
}


