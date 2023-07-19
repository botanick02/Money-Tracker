import React, { FC, useEffect, useState } from 'react';

export interface Option {
  label: string;
  icon?: string;
  value: any;
}

interface SelectPropsType {
  selectHandler(option: Option): void;
  options: Option[];
  title?: string;
}

const Dropdown: FC<SelectPropsType> = ({ selectHandler, options, title }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(0);

  options = title ? [{ label: title, value: null }, ...options] : options;

  const setSelectedThenCloseDropdown = (index: number) => {
    setSelectedOptionId(index);
    selectHandler(options[index]);
    console.log(options[index])
    setIsOptionsOpen(false);
  };

  const mouseListener = (event: MouseEvent) => {
    const element = event.target as Element;
    if (
      !element.classList.contains('options') &&
      !element.classList.contains('select-button')
    ) {
      setIsOptionsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', mouseListener);
  }, []);

  const handleSelect = (option: Option) => {
    console.log(option.value); // Вывод выбранного значения в консоль
  };

  return (
    <div className={'select-wrapper'}>
      <button
        aria-haspopup={'listbox'}
        aria-expanded={isOptionsOpen}
        className={`select-button ${isOptionsOpen ? 'expanded' : ''} ${
          title == options[selectedOptionId].label ? 'title' : ''
        }`}
        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
      >
        {options[selectedOptionId].icon ? (
          <span>
            <div className={'dropdown-icon'}>
              <img src={options[selectedOptionId].icon} alt="https://picsum.photos/52" />
            </div>
            {options[selectedOptionId].label}
          </span>
        ) : (
          options[selectedOptionId].label
        )}
      </button>

      <ul
        className={`options ${isOptionsOpen ? 'show' : ''}`}
        role={'listbox'}
        aria-activedescendant={options[selectedOptionId].label}
        tabIndex={-1}
      >
        {options.map((option, index) =>
          option != options[selectedOptionId] && title != option.label ? (
            <li
              key={index}
              id={option.label}
              role={'option'}
              aria-selected={selectedOptionId == index}
              tabIndex={0}
              onClick={() => {
                setSelectedThenCloseDropdown(index);
                handleSelect(option); // Вызов функции для вывода значения в консоль
              }}
            >
              {option.icon ? (
                <span>
                  <div className={'dropdown-icon'}>
                    <img src={option.icon} alt="https://picsum.photos/52" />
                  </div>
                  {option.label}
                </span>
              ) : (
                option.label
              )}
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default Dropdown;
