import React from "react";

interface IncrementButtonProps {
    value: number;
    handleIncrement: (value: number) => void;
}

const IncrementButton: React.FC<IncrementButtonProps> = ({ value, handleIncrement }) => {
    const handleClick = () => {
        handleIncrement(value);
    };

    return (
        <button
            tabIndex={0}
            className="bg-white border border-controlsBorderCol rounded-2xl py-2 px-4 cursor-pointer select-none min-h-[40px] flex items-center justify-center hover:bg-gray-200"
            onClick={handleClick}
        >
            <div className="font-normal text-lg leading-6">
                +{value}&nbsp;₴
            </div>
        </button>
    );
}

export default IncrementButton;
