import React from 'react';
import "./ErrorAlert.scss";

export type ErrorAlertProps = {
    message?: string | null;
}

export function ErrorAlert(props: ErrorAlertProps): React.ReactElement | null {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        ref.current?.focus();
    }, [props.message])

    if (!props.message) {
        return null;
    }

    return <div className="error-alert-root focusable" tabIndex={-1} ref={ref}>
        <span className="error-alert-bold">Error! </span>
        {props.message}</div>
}
