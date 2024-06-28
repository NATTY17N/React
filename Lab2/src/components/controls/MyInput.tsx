import React, {useEffect, useState} from "react";

interface MyInputProps {
    placeholder: string,
    inputType: string,
    maxInputLength: number,
    isNeedClearing: boolean,
    toggleNeedClearing: () => void
}

const MyInput: React.FC<MyInputProps> = (props) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);
    const divClasses: string = !isActive ?
        "max-w-[340px] w-full mx-auto mb-4 border-controlsBorderCol border-[1px] border-solid rounded-2xl bg-transparent py-0 px-4 h-14 text-lg"
        : "max-w-[340px] w-full mx-auto mb-4 border-black border-2 border-solid rounded-2xl bg-transparent py-0 px-4 h-14 text-lg";
    const labelClasses: string = `cursor-default text-left text-[#757575] transition-all ease-linear relative top-[-38px] ${
        (isHovered || inputValue !== '' || isActive) ? 'top-[-52px] text-sm' : ''
    } select-none`;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        if (props.isNeedClearing) {
            setInputValue('');
            props.toggleNeedClearing();
        }
    }, [props, props.isNeedClearing]);

    return (
        <div
            className={divClasses}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <input
                type={props.inputType}
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                maxLength={props.maxInputLength}
                className="normal-case bg-none text-left border-0 text-black h-10 w-full text-lg rounded-none mt-3 p-0 box-border outline-none"
            />
            <label
                className={labelClasses}
            >
                {props.placeholder}
            </label>
        </div>
    );
}

export default MyInput;
