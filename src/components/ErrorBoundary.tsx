import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { RefreshCw, Home } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center">
          <div className="max-w-md space-y-6">
            <h1 className="text-4xl font-black text-foreground">Something went wrong.</h1>
            <p className="text-foreground/60">
              An unexpected error occurred while rendering this page.
              {this.state.error && (
                <span className="block mt-2 font-mono text-xs text-red-500">
                  {this.state.error.message}
                </span>
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => window.location.reload()}
                variant="red"
                className="h-12 px-6 font-black uppercase tracking-widest text-xs"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Reload Page
              </Button>
              <Button asChild variant="black" className="h-12 px-6 font-black uppercase tracking-widest text-xs">
                <a href="/">
                  <Home className="mr-2 h-4 w-4" /> Go Home
                </a>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
