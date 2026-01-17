import React, { useState, useRef, useEffect } from 'react';

const CustomSelect = ({ options, selectedValue, onChange, hasError }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [searchString, setSearchString] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const buttonRef = useRef(null);
    const listboxRef = useRef(null);
    const containerRef = useRef(null);

    // Find the index of the selected value
    const getSelectedIndex = () => {
        return options.findIndex(opt => opt.value === selectedValue);
    };

    const handleSelect = (value) => {
        onChange(value);
        setIsOpen(false);
        buttonRef.current?.focus();
    };

    const getDisplayValue = () => {
        if (!selectedValue) return 'Seleccione una provincia';
        const option = options.find(opt => opt.value === selectedValue);
        return option ? option.label : 'Seleccione una provincia';
    };

    const handleButtonClick = () => {
        if (isOpen) {
            setIsOpen(false);
            buttonRef.current?.focus();
        } else {
            setIsOpen(true);
            const selectedIndex = getSelectedIndex();
            setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
        }
    };

    const handleButtonKeyDown = (e) => {
        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                    const selectedIndex = getSelectedIndex();
                    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                    setActiveIndex(getSelectedIndex() >= 0 ? getSelectedIndex() : 0);
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                    setActiveIndex(getSelectedIndex() >= 0 ? getSelectedIndex() : 0);
                }
                break;
        }
    };

    const handleListboxKeyDown = (e) => {
        let newIndex = activeIndex;

        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                if (activeIndex >= 0 && activeIndex < options.length) {
                    handleSelect(options[activeIndex].value);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                buttonRef.current?.focus();
                break;
            case 'ArrowDown':
                e.preventDefault();
                newIndex = Math.min(activeIndex + 1, options.length - 1);
                setActiveIndex(newIndex);
                if (newIndex >= 0) {
                    onChange(options[newIndex].value);
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                newIndex = Math.max(activeIndex - 1, 0);
                setActiveIndex(newIndex);
                if (newIndex >= 0) {
                    onChange(options[newIndex].value);
                }
                break;
            case 'Home':
                e.preventDefault();
                setActiveIndex(0);
                onChange(options[0].value);
                break;
            case 'End':
                e.preventDefault();
                newIndex = options.length - 1;
                setActiveIndex(newIndex);
                onChange(options[newIndex].value);
                break;
            default:
                // Printable characters
                if (e.key.length === 1 && e.key.match(/\S/)) {
                    handlePrintableCharacter(e.key);
                }
                break;
        }
    };

    const handlePrintableCharacter = (char) => {
        // Clear existing timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // Update search string
        const newSearchString = searchString + char.toLowerCase();
        setSearchString(newSearchString);

        // Find matching option
        const matchIndex = options.findIndex(opt => 
            opt.label.toLowerCase().startsWith(newSearchString)
        );

        if (matchIndex >= 0) {
            setActiveIndex(matchIndex);
            onChange(options[matchIndex].value);
        }

        // Reset search string after delay
        const timeout = setTimeout(() => {
            setSearchString('');
        }, 500);
        setSearchTimeout(timeout);
    };

    const handleOptionClick = (value, index) => {
        setActiveIndex(index);
        handleSelect(value);
    };

    // Set focus on listbox when opened
    useEffect(() => {
        if (isOpen && listboxRef.current) {
            listboxRef.current.focus();
        }
    }, [isOpen]);

    // Handle click outside to close the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [isOpen]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchTimeout]);

    return (
        <div className="custom-select" id="provinciaSelect" ref={containerRef}>
            <button 
                ref={buttonRef}
                type="button"
                className={`select-trigger ${hasError ? 'error' : ''}`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-labelledby="provincia-label provincia-button"
                id="provincia-button"
                onClick={handleButtonClick}
                onKeyDown={handleButtonKeyDown}
            >
                <span className="select-value">{getDisplayValue()}</span>
                <span className={`select-arrow ${isOpen ? 'expanded' : ''}`} aria-hidden="true">▼</span>
            </button>
            <ul 
                ref={listboxRef}
                className={`select-options ${isOpen ? 'show' : ''}`}
                id="provincia-listbox"
                role="listbox"
                aria-labelledby="provincia-label"
                tabIndex="-1"
                aria-activedescendant={activeIndex >= 0 ? `option-${options[activeIndex]?.value}` : undefined}
                onKeyDown={handleListboxKeyDown}
            >
                {options.map((option, index) => (
                    <li
                        key={option.value}
                        id={`option-${option.value}`}
                        role="option"
                        className={`select-option ${selectedValue === option.value ? 'selected' : ''} ${activeIndex === index ? 'focused' : ''}`}
                        aria-selected={selectedValue === option.value}
                        onClick={() => handleOptionClick(option.value, index)}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomSelect;
