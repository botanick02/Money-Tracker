import React, {FC} from 'react';

interface Props{
    type?: "text" | "number" | "password" | "time" | "datetime-local" | "date"
    placeholder?: string
    className?: string,
    children?: React.ReactNode
}

const InputWrapper: FC<Props> = ({className, type= "text", placeholder, children}) => {
    return (
        <div className={`input-field ${className}`}>
            {children}
        </div>
    );
};

export default InputWrapper;