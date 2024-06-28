import React, { useEffect, useState, ChangeEvent } from "react";

interface CreditCardInputProps {
    placeholder: string;
    toggleCardNum: () => void;
    needClearing: boolean;
}

const CreditCardInput: React.FC<CreditCardInputProps> = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        let { value } = event.target;

        // Remove non-numeric characters
        value = value.replace(/\D/g, '');

        // Add space every 4 characters
        value = value.replace(/(\d{4})/g, '$1 ');

        // Trim any leading or trailing spaces
        value = value.trim();

        setInputValue(value);
    };

    useEffect(() => {
        if (inputValue.length === 19) {
            props.toggleCardNum();
        }
    }, [inputValue, props]);

    useEffect(() => {
        if (props.needClearing) {
            setInputValue('');
        }
    }, [props.needClearing]);

    const containerClasses = `max-w-[340px] w-full mx-auto mb-4 border-controlsBorderCol border-[1px] border-solid rounded-2xl bg-transparent py-0 px-4 h-14 text-lg ${
        inputValue.length > 0 || isHovered || props.placeholder !== '' ? 'border-black border-2' : ''
    }`;

    const labelClasses = `cursor-default text-left text-[#757575] transition-all ease-linear relative top-[-38px] ${
        isHovered || inputValue !== '' ? 'top-[-52px] text-sm' : ''
    } select-none`;

    return (
        <div className={containerClasses}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>
            <input
                type="tel"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setIsHovered(true)}
                onBlur={() => setIsHovered(false)}
                inputMode="decimal"
                pattern="\d*"
                autoComplete="cc-number"
                maxLength={19}
                className="normal-case bg-none text-left border-0 text-black h-10 w-full text-lg rounded-none mt-3 p-0 box-border outline-none"
            />
            <label className={labelClasses}>
                {props.placeholder}
            </label>
        </div>
    );
};

export default CreditCardInput;
