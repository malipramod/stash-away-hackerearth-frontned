import React from 'react';

interface OwnProps { }

interface OwnState {
    hasError: boolean;
    error: string;
    info: string;
}
export default class ErrorBoundary extends React.Component<OwnProps, OwnState> {
    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false,
            error: "",
            info: ""
        };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({
            hasError: true,
            error: error,
            info: errorInfo
        })
        console.log("Error in Application ", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div>
                <h1>Something went wrong.</h1>
                <span>Error: {this.state.error}</span>
                <span>Info: {this.state.info}</span>
            </div>
        }

        return this.props.children;
    }
}