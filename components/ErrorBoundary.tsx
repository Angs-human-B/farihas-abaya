"use client";

import React from "react";

interface Props {
  name: string;
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  info?: React.ErrorInfo;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log with component name for easier identification
    console.error(`[Boundary:${this.props.name}]`, error, info);
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 m-4 border border-red-500 bg-red-50 text-red-700 rounded">
          <p className="font-semibold">{this.props.name} failed to render.</p>
          <pre className="whitespace-pre-wrap text-xs mt-2">
            {this.state.error?.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
