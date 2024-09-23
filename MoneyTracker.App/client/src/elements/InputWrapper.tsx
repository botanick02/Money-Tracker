import React, {FC, ReactElement} from 'react';

type InputElement = ReactElement<HTMLInputElement, 'input'>

interface Props {
  className?: string,
  children?: InputElement
  error?: string
  value?: string | number
}

const InputWrapper: FC<Props> = ({className, children, error, value}) => {
  return (
    <div className={`input-field ${className}`}>
      {children}
      {
        (!!error && error.length > 0)
          ? <span>{error}</span>
          : <label className={value ? 'focused' : ''}>{children?.props.placeholder}</label>
      }
    </div>
  );
};

export default InputWrapper;