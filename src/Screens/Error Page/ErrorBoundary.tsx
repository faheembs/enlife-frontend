import React, { Component, ReactNode, ErrorInfo } from "react";
import { Result } from "antd";
import AppButton from "../../Components/Button/AppButton";

interface ErrorBoundaryProps {
  children: ReactNode;
  navigateHome: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  //   componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
  //     console.error("Uncaught error:", error, errorInfo);
  //   }

  handleRetry = () => {
    this.setState({ hasError: false });
    this.props.navigateHome();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Result
            status="500"
            className="custom-result"
            title="Sorry, Something went wrong"
            extra={
              <AppButton
                text="Back to Home"
                bgColor="white"
                textStyle={{ color: "black" }}
                onClick={this.handleRetry}
              />
            }
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
