import React, { useEffect, useState, ChangeEvent } from "react";

interface CreditCardFormProps {
    toggleCardData: () => void;
    needClearing: boolean;
}

interface CardData {
    expirationMonth: string;
    expirationYear: string;
    cvc2: string;
}

const CreditCardForm: React.FC<CreditCardFormProps> = (props) => {
    const [isInputActive, setIsInputActive] = useState<{ [key: string]: boolean }>({
        expirationMonth: false,
        expirationYear: false,
        cvc2: false,
    });

    const [cardData, setCardData] = useState<CardData>({
        expirationMonth: '',
        expirationYear: '',
        cvc2: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'expirationMonth' && (parseInt(value) > 12 || parseInt(value) === 0)) {
            newValue = '';
        }

        setCardData((prevState) => ({
            ...prevState,
            [name]: newValue,
        }));
    };

    const handleFocus = (name: string) => {
        setIsInputActive((prevState) => ({
            ...prevState,
            [name]: true,
        }));
    };

    const handleBlur = (name: string) => {
        setIsInputActive((prevState) => ({
            ...prevState,
            [name]: false,
        }));
    };

    useEffect(() => {
        if (cardData.expirationMonth !== '' && cardData.expirationYear !== '' && cardData.cvc2.length === 3) {
            props.toggleCardData();
        }
    }, [cardData, props]);

    useEffect(() => {
        if (props.needClearing) {
            setCardData({
                expirationMonth: '',
                expirationYear: '',
                cvc2: '',
            });
        }
    }, [props.needClearing]);

    const renderInput = (name: string, label: string, maxLength: number) => {
        const inputValue = cardData[name as keyof CardData];
        const inputActive = isInputActive[name as keyof typeof isInputActive];
        const labelClasses = `cursor-default text-left text-[#757575] transition-all ease-linear relative ${inputActive || inputValue !== '' ? 'top-[-52px] text-sm' : 'top-[-38px]'} select-none pb-2`;

        return (
            <div className="flex w-[90px] min-h-[54px] pb-2">
                <div className="group">
                    <input
                        type="tel"
                        inputMode="decimal"
                        pattern="\d*"
                        autoComplete={name === 'cvc2' ? 'cc-csc' : `cc-exp-${name}`}
                        name={name}
                        value={inputValue}
                        onChange={handleChange}
                        onFocus={() => handleFocus(name)}
                        onBlur={() => handleBlur(name)}
                        maxLength={maxLength}
                        className="bg-none text-left text-black h-[41px] w-full text-lg rounded-none mt-3 box-border p-0 outline-none"
                    />
                    <label className={labelClasses}>{label}</label>
                </div>
                {name !== 'cvc2' && (
                    <span className="text-center opacity-[0.2] w-[1px] bg-dividingCol m-auto h-[40px] -left-4 top-0 mt-2"></span>
                )}
            </div>
        );
    };

    return (
        <div className="grid grid-cols-3 gap-2 max-w-[340px] w-full mx-auto mb-4 border-controlsBorderCol border border-solid rounded-2xl bg-transparent py-0 px-4 h-[56px]">
            {renderInput('expirationMonth', 'Month', 2)}
            {renderInput('expirationYear', 'Year', 2)}
            {renderInput('cvc2', 'CVC2', 3)}
        </div>
    );
};

export default CreditCardForm;
