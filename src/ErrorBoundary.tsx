import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children?: ReactNode;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, any> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <AppState
          status={500}
          title={getAppI18n().t("errors:500.title") || ""}
          subTitle={getAppI18n().t("errors:500.sub_title") || ""}
        />
      );
    }

    return this.props.children;
  }
}
