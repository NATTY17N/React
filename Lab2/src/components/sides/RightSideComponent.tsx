import React, { useEffect, useState, useCallback } from "react";
import { useDebounce } from "../../hooks/useDebounce.ts";
import IncrementButton from "../controls/IncrementButton.tsx";
import MyInput from "../controls/MyInput.tsx";
import PaymentButton from "../controls/PaymentButton.tsx";
import ManualPayment from "../ManualPayment.tsx";
import { useBalance } from "../../hooks/useBalance.ts";

const MAX_AMOUNT = 29999;
const MIN_AMOUNT = 10;

export function RightSideComponent() {
    const [inputValue, setInputValue] = useState<string>('');
    const [isInputValid, setIsInputValid] = useState<boolean>(true);
    const [needClearing, setNeedClearing] = useState<boolean>(false);
    const [needClearingManual, setNeedClearingManual] = useState<boolean>(false);

    const {updateBalance } = useBalance();
    const debouncedInput = useDebounce(inputValue, 300);

    const validateInput = useCallback((value: string) => {
        if (!value) return true;
        const numValue = parseInt(value);
        return numValue >= MIN_AMOUNT && numValue <= MAX_AMOUNT;
    }, []);

    const handleInputChange = useCallback((value: string) => {
        const isValid = validateInput(value);
        setIsInputValid(isValid);
        setInputValue(isValid ? value : "");
    }, [validateInput]);

    const updateInputValue = useCallback((value: number) => {
        setInputValue(prev => {
            const newValue = !prev ? value : parseInt(prev) + value;
            return Math.min(newValue, MAX_AMOUNT).toString();
        });
    }, []);

    const handlePayment = useCallback(() => {
        if (isInputValid && inputValue) {
            updateBalance(parseInt(inputValue));
            setInputValue('');
            setNeedClearing(prev => !prev);
            setNeedClearingManual(prev => !prev);
        }
    }, [isInputValid, inputValue, updateBalance]);

    useEffect(() => {
        handleInputChange(debouncedInput);
    }, [debouncedInput, handleInputChange]);

    return (
        <div className="w-1/2 bg-white rounded-r-3xl relative min-h-[620px] flex flex-col items-center justify-center">
            <AmountInput
                inputValue={inputValue}
                isInputValid={isInputValid}
                handleInputChange={handleInputChange}
                updateInputValue={updateInputValue}
            />
            <MyInput
                inputType="text"
                placeholder="Ваше ім'я (необов'язково)"
                maxInputLength={20}
                isNeedClearing={needClearing}
                toggleNeedClearing={() => setNeedClearing(prev => !prev)}
            />
            <MyInput
                inputType="text"
                placeholder="Коментар (необов'язково)"
                maxInputLength={35}
                isNeedClearing={needClearing}
                toggleNeedClearing={() => setNeedClearing(prev => !prev)}
            />
            <PaymentButton paymentType="mono" onPayment={handlePayment} />
            <PaymentButton paymentType="gPay" onPayment={handlePayment} />
            <ManualPayment
                needClearing={needClearingManual}
                toggleClearing={() => setNeedClearingManual(prev => !prev)}
                pay={handlePayment}
            />
        </div>
    );
}

interface AmountInputProps {
    inputValue: string;
    isInputValid: boolean;
    handleInputChange: (value: string) => void;
    updateInputValue: (value: number) => void;
}

const AmountInput: React.FC<AmountInputProps> = ({
                                                     inputValue,
                                                     isInputValid,
                                                     handleInputChange,
                                                     updateInputValue
                                                 }) => {
    const errorClass = isInputValid ? "" : "text-red-500";
    const placeholderErrorClass = isInputValid ? "" : "placeholder-red-500";

    const inputClasses = `opacity-[0.4] flex justify-center items-center font-extrabold text-5xl text-center py-5 px-0 transition-opacity ${errorClass}`;

    return (
        <div className="w-fit rounded-3xl mt-[42px] mb-8 h-max bg-gradient-to-r from-firstCardGradientCol to-secondCardGradientCol p-[3px]">
            <div className="min-w-[394px] min-h-[163px] p-6 bg-white rounded-3xl flex flex-col justify-center">
                <div className="text-center font-semibold text-md leading-4 mt-0 flex justify-center items-center">
                    <span>Сума поповнення</span>
                    <img
                        src="https://send.monobank.ua/img/money.png"
                        alt="money"
                        className="w-4 ml-[0.5em] mb-[-3px]"
                    />
                </div>
                <div className={inputClasses}>
                    <div
                        style={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <input
                            type="number"
                            inputMode="numeric"
                            pattern="\d*"
                            value={inputValue}
                            className={`outline-none p-0 w-36 text-right placeholder-gray-950 appearance-none ${placeholderErrorClass}`}
                            style={{
                                width:
                                    inputValue.length > 0
                                        ? `${inputValue.length * 1.5 + 2}rem`
                                        : "2rem"
                            }}
                            placeholder={"0"}
                            onChange={(e) => handleInputChange(e.target.value)}
                        />
                    </div>
                    <div className="text-center">&nbsp;₴</div>
                </div>
                {!isInputValid && (
                    <span className="text-center text-sm -mt-4 mb-2">
            Сума повинна бути від 10 до 29999
          </span>
                )}
                <div className="flex items-center justify-evenly">
                    <IncrementButton value={100} handleIncrement={updateInputValue} />
                    <IncrementButton value={500} handleIncrement={updateInputValue} />
                    <IncrementButton value={1000} handleIncrement={updateInputValue} />
                </div>
            </div>
        </div>
    );
};

