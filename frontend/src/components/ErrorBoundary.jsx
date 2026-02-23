import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaRedo } from 'react-icons/fa';
import ErrorInfoButton from './ErrorInfoButton';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      const errorReason = this.state.error?.message 
        ? `An unexpected error occurred: ${this.state.error.message}. This might be due to a network issue, invalid data, or a bug in the application. Please try refreshing the page or contact support if the problem persists.`
        : "An unexpected error occurred in the application. Please try refreshing the page or contact support if the problem persists.";

      return (
        <div className="min-h-screen bg-[#212121] flex items-center justify-center p-4">
          <div className="bg-[#2f2f2f] rounded-xl border border-[#424242] p-8 max-w-md text-center">
            <FaExclamationTriangle className="text-5xl text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
              Something Went Wrong
              <ErrorInfoButton reason={errorReason} size="md" />
            </h1>
            <p className="text-gray-400 mb-6">
              We're sorry, but something unexpected happened. Please try again.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-emerald-600 transition-colors"
              >
                <FaRedo /> Reload Page
              </button>
              <Link
                to="/"
                className="border border-[#424242] text-gray-300 px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-[#3a3a3a] transition-colors"
              >
                <FaHome /> Go to Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;


