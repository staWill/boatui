import React, { FC } from "react";

interface ErrorProps {
    message: string;
}

const ErrorComponent: FC<ErrorProps> = ({ message }) => {
    return (
        <div className="error">
            <p>Error: {message}</p>
        </div>
    );
}

export default ErrorComponent;
