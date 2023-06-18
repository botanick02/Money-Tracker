import React, {FC} from 'react';

interface Props{
    type?: "text" | "number" | "password" | "time" | "datetime-local" | "date"
    placeholder?: string
    className?: string,
    children?: React.ReactNode
}

const InputField: FC<Props> = ({className, type= "text", placeholder, children}) => {
    return (
        <div className={`input-field ${className}`}>
            <input type={type} placeholder={placeholder}/>
            {children}
        </div>
    );
};

export default InputField;